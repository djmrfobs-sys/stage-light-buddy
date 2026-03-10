import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ru as ruLocale } from "date-fns/locale";
import { CalendarIcon, Phone, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BookedDate {
  event_date: string;
  status: string;
}

const RequestForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [form, setForm] = useState({ name: "", contact: "", date: "", address: "", comment: "" });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const { t, lang } = useI18n();

  useEffect(() => {
    const fetchBookedDates = async () => {
      const { data } = await supabase
        .from("booked_dates")
        .select("event_date, status");
      if (data) setBookedDates(data);
    };
    fetchBookedDates();
  }, []);

  const confirmedDates = bookedDates
    .filter((d) => d.status === "confirmed")
    .map((d) => new Date(d.event_date + "T00:00:00"));

  const pendingDates = bookedDates
    .filter((d) => d.status === "pending")
    .map((d) => new Date(d.event_date + "T00:00:00"));

  const isDateBooked = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return bookedDates.some((d) => d.event_date === dateStr && d.status === "confirmed");
  };

  const isDatePending = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return bookedDates.some((d) => d.event_date === dateStr && d.status === "pending");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (isDateBooked(date) || isDatePending(date)) {
      setShowSolution(true);
      return;
    }

    setShowSolution(false);
    setSelectedDate(date);
    setForm((prev) => ({ ...prev, date: format(date, "yyyy-MM-dd") }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors: Record<string, string> = {};
    if (!form.name.trim()) fieldErrors.name = t("val.name");
    if (!form.contact.trim()) fieldErrors.contact = t("val.contact");
    if (!form.date) fieldErrors.date = t("val.date");
    if (!form.address.trim()) fieldErrors.address = t("val.address");

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSending(true);

    try {
      const { error } = await supabase.functions.invoke("send-request", { body: form });
      if (error) {
        toast({ title: t("request.error"), description: t("request.errorDesc"), variant: "destructive" });
        return;
      }
      toast({ title: t("request.success"), description: t("request.successDesc") });
      // Add date to local state immediately
      setBookedDates((prev) => [...prev, { event_date: form.date, status: "pending" }]);
      setForm({ name: "", contact: "", date: "", address: "", comment: "" });
      setSelectedDate(undefined);
      if (onSuccess) setTimeout(() => onSuccess(), 1500);
    } catch {
      toast({ title: t("request.error"), description: t("request.errorDesc"), variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";
  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const fields = [
    { key: "name", label: t("request.name"), placeholder: t("request.namePlaceholder"), type: "text" },
    { key: "contact", label: t("request.contact"), placeholder: t("request.contactPlaceholder"), type: "text" },
    { key: "address", label: t("request.address"), placeholder: t("request.addressPlaceholder"), type: "text" },
  ];

  const modifiers = {
    booked: confirmedDates,
    pending: pendingDates,
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: "hsl(0 84% 60%)",
      color: "white",
      borderRadius: "6px",
      opacity: 0.8,
    },
    pending: {
      backgroundColor: "hsl(45 93% 47%)",
      color: "white",
      borderRadius: "6px",
      opacity: 0.7,
    },
  };

  return (
    <section className="py-16 md:py-24" id="request">
      <div className="container px-4 max-w-lg mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3">
          {t("request.title1")} <span className="text-gradient-gold">{t("request.title2")}</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10">{t("request.subtitle")}</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-1.5">{field.label}</label>
              <input type={field.type} value={form[field.key as keyof typeof form]} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder} className={inputClass} />
              {errors[field.key] && <p className="text-destructive text-sm mt-1">{errors[field.key]}</p>}
            </div>
          ))}

          {/* Date picker with calendar */}
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("request.date")}</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    inputClass,
                    "flex items-center justify-between text-left",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate
                    ? format(selectedDate, "d MMMM yyyy", { locale: lang === "ru" ? ruLocale : undefined })
                    : t("cal.pickDate")}
                  <CalendarIcon className="w-4 h-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
                <div className="px-4 pb-3 flex flex-wrap gap-3 text-xs">
                  <span className="text-muted-foreground">{t("cal.legend")}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(0 84% 60%)" }} />
                    {t("cal.booked")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(45 93% 47%)" }} />
                    {t("cal.pending")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-secondary border border-border" />
                    {t("cal.free")}
                  </span>
                </div>
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}

            {showSolution && (
              <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-start justify-between">
                  <h4 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    💡 {t("cal.hasSolution")}
                  </h4>
                  <button type="button" onClick={() => setShowSolution(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{t("cal.solutionDesc")}</p>
                <a
                  href="tel:+79180765567"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-5 py-3 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-[1.02]"
                >
                  <Phone className="w-4 h-4" />
                  {t("cal.callColleague")} · 8-918-076-55-67
                </a>
                <p className="text-xs text-muted-foreground/80 italic border-l-2 border-primary/30 pl-3">
                  {t("cal.solutionNote")}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("request.comment")}</label>
            <textarea value={form.comment} onChange={(e) => update("comment", e.target.value)} placeholder={t("request.commentPlaceholder")} rows={3} className={inputClass + " resize-none"} />
          </div>
          <button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground font-display font-semibold text-lg py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            {sending ? t("request.sending") : t("request.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RequestForm;
