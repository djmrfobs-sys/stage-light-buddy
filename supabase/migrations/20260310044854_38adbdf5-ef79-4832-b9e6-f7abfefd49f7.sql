
CREATE TABLE public.booked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  client_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow anyone to read booked dates (public calendar)
ALTER TABLE public.booked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view booked dates"
ON public.booked_dates
FOR SELECT
TO anon, authenticated
USING (status IN ('pending', 'confirmed'));

-- Allow service role to insert/update (via edge function)
CREATE POLICY "Service role can manage booked dates"
ON public.booked_dates
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
