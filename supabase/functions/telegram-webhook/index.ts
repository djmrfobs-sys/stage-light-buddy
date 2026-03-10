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

  try {
    const update = await req.json();
    console.log('Received Telegram update:', JSON.stringify(update));

    const message = update.message;
    if (!message) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const chatId = message.chat.id;
    const text = message.text || '';

    // Determine reply based on message
    let replyText: string;
    if (text === '/start') {
      replyText = WELCOME_MESSAGE;
    } else {
      replyText = DEFAULT_REPLY;
    }

    // Send reply via Telegram Bot API
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
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

    // Notify admin about new message (forward to admin chat)
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
