import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Check if posting is enabled
    const { data: settings } = await supabase
      .from('channel_settings')
      .select('posting_enabled')
      .eq('id', 1)
      .single();

    if (!settings?.posting_enabled) {
      return new Response(JSON.stringify({ ok: true, skipped: 'posting disabled' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get current hour and minute (Moscow time UTC+3)
    const now = new Date();
    const moscowOffset = 3 * 60; // UTC+3
    const moscowTime = new Date(now.getTime() + moscowOffset * 60 * 1000);
    const currentHour = moscowTime.getUTCHours();
    const currentMinute = moscowTime.getUTCMinutes();

    console.log(`Current Moscow time: ${currentHour}:${String(currentMinute).padStart(2, '0')}`);

    // Check if there's a schedule matching current time
    const { data: matchingSchedules } = await supabase
      .from('post_schedule')
      .select('*')
      .eq('hour', currentHour)
      .eq('minute', currentMinute)
      .eq('enabled', true);

    if (!matchingSchedules || matchingSchedules.length === 0) {
      return new Response(JSON.stringify({ ok: true, skipped: 'no matching schedule' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Found matching schedule, triggering post generation...');

    // Trigger generate-channel-post
    const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-channel-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') || ''}`,
      },
    });

    const result = await response.json();
    console.log('Generate post result:', JSON.stringify(result));

    return new Response(JSON.stringify({ ok: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in check-post-schedule:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
