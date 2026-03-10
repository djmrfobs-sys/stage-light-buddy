import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";

const RequestForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [form, setForm] = useState({ name: "", contact: "", date: "", address: "", comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const { t } = useI18n();

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
      setForm({ name: "", contact: "", date: "", address: "", comment: "" });
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
    { key: "date", label: t("request.date"), placeholder: "", type: "date" },
    { key: "address", label: t("request.address"), placeholder: t("request.addressPlaceholder"), type: "text" },
  ];

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
