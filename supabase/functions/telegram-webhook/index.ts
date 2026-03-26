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

const SCHEDULE_HELP = `📅 <b>Управление расписанием постов</b>

Команды:
/schedule — текущее расписание
/addtime HH:MM — добавить время публикации
/removetime HH:MM — убрать время публикации
/pause — приостановить публикации
/resume — возобновить публикации
/postnow — опубликовать пост прямо сейчас`;

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
  const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

  try {
    const update = await req.json();
    console.log('Received Telegram update:', JSON.stringify(update));

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

    // Handle callback queries (button presses for booking confirm/cancel)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const callbackData = callbackQuery.data || '';
      const chatId = callbackQuery.message?.chat?.id;

      await fetch(`${telegramUrl}/answerCallbackQuery`, {
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

          if (updateError) {
            console.error('Error updating booking:', updateError);
          }

          if (callbackQuery.message?.message_id && chatId) {
            const originalText = callbackQuery.message.text || '';
            const statusLine = newStatus === 'confirmed'
              ? '\n\n✅ ПОДТВЕРЖДЕНО'
              : '\n\n❌ ОТМЕНЕНО';

            await fetch(`${telegramUrl}/editMessageText`, {
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
    const text = (message.text || '').trim();
    const isAdmin = TELEGRAM_CHAT_ID && String(chatId) === String(TELEGRAM_CHAT_ID);

    // --- Admin schedule commands ---
    if (isAdmin && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      if (text === '/schedule' || text === '/schedule@Angar_audiolight_bot') {
        const { data: schedules } = await supabase
          .from('post_schedule')
          .select('*')
          .order('hour', { ascending: true });
        
        const { data: settings } = await supabase
          .from('channel_settings')
          .select('posting_enabled')
          .eq('id', 1)
          .single();

        const status = settings?.posting_enabled ? '🟢 Активно' : '🔴 Приостановлено';
        let scheduleText = `📅 <b>Расписание постов</b>\nСтатус: ${status}\n\n`;

        if (schedules && schedules.length > 0) {
          scheduleText += schedules.map(s => {
            const time = `${String(s.hour).padStart(2, '0')}:${String(s.minute).padStart(2, '0')}`;
            const icon = s.enabled ? '✅' : '⏸';
            return `${icon} ${time}`;
          }).join('\n');
        } else {
          scheduleText += 'Нет запланированных времён.';
        }

        scheduleText += '\n\n' + SCHEDULE_HELP;

        await fetch(`${telegramUrl}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: scheduleText, parse_mode: 'HTML' }),
        });
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (text.startsWith('/addtime')) {
        const timeStr = text.replace('/addtime', '').trim();
        const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
        
        if (!match) {
          await fetch(`${telegramUrl}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: '❌ Формат: /addtime HH:MM\nПример: /addtime 12:30' }),
          });
        } else {
          const hour = parseInt(match[1]);
          const minute = parseInt(match[2]);
          
          if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            await fetch(`${telegramUrl}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: '❌ Неверное время. Часы: 0-23, минуты: 0-59' }),
            });
          } else {
            const { error } = await supabase.from('post_schedule').insert({ hour, minute });
            const timeFormatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            
            if (error?.code === '23505') {
              await fetch(`${telegramUrl}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: `⚠️ Время ${timeFormatted} уже есть в расписании` }),
              });
            } else if (error) {
              await fetch(`${telegramUrl}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: `❌ Ошибка: ${error.message}` }),
              });
            } else {
              await fetch(`${telegramUrl}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: `✅ Добавлено время публикации: ${timeFormatted}` }),
              });
            }
          }
        }
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (text.startsWith('/removetime')) {
        const timeStr = text.replace('/removetime', '').trim();
        const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
        
        if (!match) {
          await fetch(`${telegramUrl}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: '❌ Формат: /removetime HH:MM\nПример: /removetime 12:30' }),
          });
        } else {
          const hour = parseInt(match[1]);
          const minute = parseInt(match[2]);
          const { error, count } = await supabase
            .from('post_schedule')
            .delete()
            .eq('hour', hour)
            .eq('minute', minute);
          
          const timeFormatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          if (error) {
            await fetch(`${telegramUrl}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: `❌ Ошибка: ${error.message}` }),
            });
          } else {
            await fetch(`${telegramUrl}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: `✅ Время ${timeFormatted} удалено из расписания` }),
            });
          }
        }
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (text === '/pause' || text === '/pause@Angar_audiolight_bot') {
        await supabase.from('channel_settings').update({ posting_enabled: false, updated_at: new Date().toISOString() }).eq('id', 1);
        await fetch(`${telegramUrl}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: '⏸ Автопубликация приостановлена' }),
        });
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (text === '/resume' || text === '/resume@Angar_audiolight_bot') {
        await supabase.from('channel_settings').update({ posting_enabled: true, updated_at: new Date().toISOString() }).eq('id', 1);
        await fetch(`${telegramUrl}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: '▶️ Автопубликация возобновлена' }),
        });
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (text === '/postnow' || text === '/postnow@Angar_audiolight_bot') {
        await fetch(`${telegramUrl}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: '⏳ Генерирую пост... Это займёт 20-30 секунд.' }),
        });

        // Trigger generate-channel-post
        const postResponse = await fetch(`${SUPABASE_URL}/functions/v1/generate-channel-post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') || ''}`,
          },
        });
        const postResult = await postResponse.json();

        const resultText = postResult.ok
          ? `✅ Пост опубликован!\nТема: ${postResult.topic || 'случайная'}`
          : `❌ Ошибка: ${postResult.error || 'неизвестная ошибка'}`;

        await fetch(`${telegramUrl}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: resultText }),
        });
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // --- Regular user messages ---
    if (text === '/start') {
      await fetch(`${telegramUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: WELCOME_MESSAGE,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📊 Рассчитать стоимость', url: 'https://id-preview--4102aa27-02d8-42bb-90f7-b4cdb6e4e2d5.lovable.app' }],
            ],
          },
        }),
      });
    } else {
      await fetch(`${telegramUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: DEFAULT_REPLY,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📊 Рассчитать стоимость', url: 'https://id-preview--4102aa27-02d8-42bb-90f7-b4cdb6e4e2d5.lovable.app' }],
            ],
          },
        }),
      });

      // Notify admin
      if (TELEGRAM_CHAT_ID && !isAdmin) {
        const userName = message.from?.first_name || 'Аноним';
        const userUsername = message.from?.username ? `@${message.from.username}` : '';
        await fetch(`${telegramUrl}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `📩 Новое сообщение от ${userName} ${userUsername}:\n\n${text}`,
          }),
        });
      }
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
