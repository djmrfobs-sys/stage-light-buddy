import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const requestSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите телефон или Telegram").max(100),
  date: z.string().min(1, "Укажите дату"),
  address: z.string().trim().min(1, "Укажите адрес площадки").max(300),
  comment: z.string().max(1000).optional(),
});

const RequestForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    address: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = requestSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-request", {
        body: parsed.data,
      });

      if (error) {
        console.error("Error sending request:", error);
        toast({
          title: "Ошибка отправки",
          description: "Попробуйте ещё раз или напишите нам в Telegram.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      setForm({ name: "", contact: "", date: "", address: "", comment: "" });
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте ещё раз или напишите нам в Telegram.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <section className="py-16 md:py-24" id="request">
      <div className="container px-4 max-w-lg mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3">
          Оставить <span className="text-gradient-gold">заявку</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Заполните форму и мы свяжемся с вами для подтверждения деталей
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { key: "name", label: "Ваше имя", placeholder: "Иван", type: "text" },
            { key: "contact", label: "Телефон или Telegram", placeholder: "+7 (999) 123-45-67 или @username", type: "text" },
            { key: "date", label: "Дата мероприятия", placeholder: "", type: "date" },
            { key: "address", label: "Адрес площадки", placeholder: "Москва, ул. Пример, д. 1", type: "text" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => update(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={inputClass}
              />
              {errors[field.key] && (
                <p className="text-destructive text-sm mt-1">{errors[field.key]}</p>
              )}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1.5">Комментарий</label>
            <textarea
              value={form.comment}
              onChange={(e) => update("comment", e.target.value)}
              placeholder="Дополнительные пожелания..."
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-primary text-primary-foreground font-display font-semibold text-lg py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {sending ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RequestForm;
