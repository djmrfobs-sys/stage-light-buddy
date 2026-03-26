import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WELCOME_MESSAGE = `👋 Здравствуйте! Добро пожаловать в АНГАР — аренда света и спецэффектов для мероприятий.

Чем могу помочь?
• 💡 Подобрать пакет освещения
• 🎆 Рассказать о спецэффектах
• 📅 Забронировать дату
• 💰 Рассчитать стоимость

Напишите ваш вопрос, и наш менеджер ответит в ближайшее время!`;

const DEFAULT_REPLY = `Спасибо за сообщение! 🙏

Наш менеджер свяжется с вами в ближайшее время.

А пока вы можете рассчитать стоимость аренды света на нашем сайте 👇`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN is not configured');
    return new Response(JSON.stringify({ error: 'Bot token not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  try {
    const update = await req.json();
    console.log('Received Telegram update:', JSON.stringify(update));

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    // Handle callback queries (button presses)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const callbackData = callbackQuery.data || '';
      const chatId = callbackQuery.message?.chat?.id;

      // Answer callback to remove loading state
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQuery.id }),
      });

      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        let bookingId: string | null = null;
        let newStatus: string | null = null;

        if (callbackData.startsWith('confirm_')) {
          bookingId = callbackData.replace('confirm_', '');
          newStatus = 'confirmed';
        } else if (callbackData.startsWith('cancel_')) {
          bookingId = callbackData.replace('cancel_', '');
          newStatus = 'cancelled';
        }

        if (bookingId && newStatus) {
          const { error: updateError } = await supabase
            .from('booked_dates')
            .update({ status: newStatus })
            .eq('id', bookingId);

          let responseText: string;
          if (updateError) {
            console.error('Error updating booking:', updateError);
            responseText = '❌ Ошибка при обновлении статуса бронирования.';
          } else {
            responseText = newStatus === 'confirmed'
              ? '✅ Бронирование подтверждено! Дата отмечена как забронированная на сайте.'
              : '❌ Бронирование отменено.';
          }

          // Update the original message to show the result
          if (callbackQuery.message?.message_id && chatId) {
            const originalText = callbackQuery.message.text || '';
            const statusLine = newStatus === 'confirmed'
              ? '\n\n✅ <b>ПОДТВЕРЖДЕНО</b>'
              : '\n\n❌ <b>ОТМЕНЕНО</b>';

            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                message_id: callbackQuery.message.message_id,
                text: originalText + statusLine,
                parse_mode: 'HTML',
              }),
            });
          }
        }
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle regular messages
    const message = update.message;
    if (!message) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const chatId = message.chat.id;
    const text = message.text || '';

    let replyText: string;
    if (text === '/start') {
      replyText = WELCOME_MESSAGE;
    } else {
      replyText = DEFAULT_REPLY;
    }

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📊 Рассчитать стоимость', url: 'https://id-preview--4102aa27-02d8-42bb-90f7-b4cdb6e4e2d5.lovable.app' }],
          ],
        },
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(`Telegram API error [${response.status}]:`, JSON.stringify(result));
    }

    // Notify admin about new message
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');
    if (TELEGRAM_CHAT_ID && text !== '/start') {
      const userName = message.from?.first_name || 'Аноним';
      const userUsername = message.from?.username ? `@${message.from.username}` : '';
      const adminNotification = `📩 Новое сообщение от ${userName} ${userUsername}:\n\n${text}`;

      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: adminNotification,
        }),
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
