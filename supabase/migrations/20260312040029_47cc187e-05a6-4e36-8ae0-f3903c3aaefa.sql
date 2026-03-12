-- Allow authenticated users to view all booked_dates (including cancelled)
CREATE POLICY "Authenticated can view all booked dates"
ON public.booked_dates FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update booked_dates status
CREATE POLICY "Authenticated can update booked dates"
ON public.booked_dates FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete booked_dates
CREATE POLICY "Authenticated can delete booked dates"
ON public.booked_dates FOR DELETE
TO authenticated
USING (true);