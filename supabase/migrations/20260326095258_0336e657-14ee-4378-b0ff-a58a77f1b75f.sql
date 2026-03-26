
-- Table for storing posting schedule times
CREATE TABLE public.post_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hour int NOT NULL CHECK (hour >= 0 AND hour <= 23),
  minute int NOT NULL CHECK (minute >= 0 AND minute <= 59),
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(hour, minute)
);

ALTER TABLE public.post_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage post_schedule" ON public.post_schedule
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can view post_schedule" ON public.post_schedule
  FOR SELECT TO authenticated USING (true);

-- Table for storing generated/posted channel posts
CREATE TABLE public.channel_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  image_base64 text,
  status text NOT NULL DEFAULT 'pending',
  scheduled_for timestamptz,
  posted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.channel_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage channel_posts" ON public.channel_posts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can view channel_posts" ON public.channel_posts
  FOR SELECT TO authenticated USING (true);

-- Global settings table for pause/resume
CREATE TABLE public.channel_settings (
  id int PRIMARY KEY CHECK (id = 1),
  posting_enabled boolean NOT NULL DEFAULT true,
  channel_username text NOT NULL DEFAULT '@angar_light',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.channel_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage channel_settings" ON public.channel_settings
  FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO public.channel_settings (id, posting_enabled, channel_username) VALUES (1, true, '@angar_light');

-- Add default schedule: 10:00, 14:00, 19:00
INSERT INTO public.post_schedule (hour, minute) VALUES (10, 0), (14, 0), (19, 0);
