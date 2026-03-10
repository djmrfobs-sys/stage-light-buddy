import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const NewsletterSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useI18n();

  const handleSubscribe = () => {
    window.open("https://t.me/+oHYQF_GC30Y5ZWFi", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 max-w-lg mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
          {t("news.title1")} <span className="text-gradient-gold">{t("news.title2")}</span>
        </h2>
        <p className="text-muted-foreground mb-8 text-sm md:text-base">{t("news.subtitle")}</p>
        <div className="space-y-3">
          <Input placeholder={t("news.name")} value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50 border-border/50 h-12" />
          <Input type="email" placeholder={t("news.email")} value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary/50 border-border/50 h-12" />
          <Button onClick={handleSubscribe} disabled={!name.trim() || !email.trim()} className="w-full h-12 text-base font-display font-semibold glow-gold hover:glow-gold-strong transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <Send className="w-4 h-4 mr-2" />
            {t("news.subscribe")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
