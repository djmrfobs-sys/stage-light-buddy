import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STAGE_LIGHTING_TOPICS = [
  "Типы сценического освещения: прожекторы, LED-панели, лазеры",
  "Как правильно выставить свет для свадьбы",
  "Холодные фонтаны на мероприятиях: виды и особенности",
  "Тренды сценического света 2026 года",
  "Световое оформление корпоративных мероприятий",
  "Как свет создает атмосферу на концерте",
  "Разница между RGB и RGBW LED-приборами",
  "Профессиональный свет для фотозон",
  "Эффекты дыма и тумана в сочетании со светом",
  "Уличное освещение для мероприятий: что важно знать",
  "Moving head прожекторы: возможности и применение",
  "Архитектурная подсветка зданий для мероприятий",
  "Как подобрать свет под стиль мероприятия",
  "Безопасность при работе со сценическим светом",
  "Световые шоу: от идеи до реализации",
  "PAR-прожекторы: классика сценического освещения",
  "Как цветовая температура влияет на восприятие",
  "Декоративный свет для банкетных залов",
  "Пиротехнические эффекты на сцене: виды и безопасность",
  "Контроллеры DMX: управление светом на мероприятиях",
  "Световое оформление open-air фестивалей",
  "Свет для танцпола: что выбрать",
  "Стробоскопы и блиндеры: когда и как применять",
  "Гобо-проекторы: персонализация события через свет",
  "Ретро-гирлянды и винтажный свет для мероприятий",
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  if (!LOVABLE_API_KEY) {
    console.error('LOVABLE_API_KEY is not configured');
    return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN is not configured');
    return new Response(JSON.stringify({ error: 'TELEGRAM_BOT_TOKEN not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Check if posting is enabled
    const { data: settings } = await supabase
      .from('channel_settings')
      .select('posting_enabled, channel_username')
      .eq('id', 1)
      .single();

    if (!settings?.posting_enabled) {
      return new Response(JSON.stringify({ ok: true, skipped: 'posting disabled' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const channelId = settings.channel_username || '@angar_light';

    // Pick a random topic
    const topic = STAGE_LIGHTING_TOPICS[Math.floor(Math.random() * STAGE_LIGHTING_TOPICS.length)];

    // Step 1: Generate post text via AI
    console.log('Generating post text for topic:', topic);
    const textResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: `Ты — SMM-менеджер компании АНГАР, которая занимается арендой сценического освещения и спецэффектов для мероприятий в Краснодаре. 
Пиши посты для Telegram-канала. Стиль: профессиональный, но дружелюбный. 
Используй эмодзи умеренно. Длина поста: 150-300 слов. 
В конце поста добавь призыв к действию и контакт.
НЕ используй markdown-разметку (звёздочки, решётки). Пиши обычным текстом.
Контакт: @Angar_audiolight_bot`
          },
          {
            role: 'user',
            content: `Напиши интересный и полезный пост на тему: "${topic}"`
          }
        ],
      }),
    });

    if (!textResponse.ok) {
      const errText = await textResponse.text();
      console.error('AI text generation failed:', textResponse.status, errText);
      throw new Error(`AI text error [${textResponse.status}]: ${errText}`);
    }

    const textData = await textResponse.json();
    const postText = textData.choices?.[0]?.message?.content;
    if (!postText) throw new Error('No text generated');
    console.log('Generated text:', postText.substring(0, 100) + '...');

    // Step 2: Generate image via AI
    console.log('Generating image for topic:', topic);
    const imagePrompt = `Professional stage lighting setup for an event, ${topic}, dramatic lighting effects, high quality photo, cinematic, vibrant colors, professional event production`;
    
    const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3.1-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: imagePrompt
          }
        ],
        modalities: ['image', 'text'],
      }),
    });

    let imageBase64: string | null = null;
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      const imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      if (imageUrl && imageUrl.startsWith('data:image')) {
        // Extract base64 part
        imageBase64 = imageUrl.replace(/^data:image\/[a-z]+;base64,/, '');
        console.log('Image generated successfully');
      }
    } else {
      console.error('Image generation failed:', imageResponse.status);
    }

    // Step 3: Post to Telegram channel
    let telegramResult;
    if (imageBase64) {
      // Send photo with caption
      const formData = new FormData();
      formData.append('chat_id', channelId);
      formData.append('caption', postText);
      formData.append('parse_mode', 'HTML');
      
      // Convert base64 to blob
      const imageBytes = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0));
      const blob = new Blob([imageBytes], { type: 'image/png' });
      formData.append('photo', blob, 'post_image.png');

      const sendPhotoResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
        { method: 'POST', body: formData }
      );
      telegramResult = await sendPhotoResponse.json();
      
      if (!sendPhotoResponse.ok) {
        console.error('Telegram sendPhoto error:', JSON.stringify(telegramResult));
        // Fallback: send text only
        const fallbackResponse = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: channelId,
              text: postText,
              parse_mode: 'HTML',
            }),
          }
        );
        telegramResult = await fallbackResponse.json();
      }
    } else {
      // Send text only
      const sendResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: channelId,
            text: postText,
            parse_mode: 'HTML',
          }),
        }
      );
      telegramResult = await sendResponse.json();
    }

    // Step 4: Save post to database
    const postStatus = telegramResult?.ok ? 'posted' : 'failed';
    await supabase.from('channel_posts').insert({
      content: postText,
      image_base64: imageBase64 ? imageBase64.substring(0, 100) + '...' : null, // Don't store full image
      status: postStatus,
      posted_at: postStatus === 'posted' ? new Date().toISOString() : null,
    });

    console.log('Post result:', postStatus);
    return new Response(JSON.stringify({ ok: true, status: postStatus, topic }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating channel post:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
