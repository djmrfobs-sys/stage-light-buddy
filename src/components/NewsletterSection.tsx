import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const NewsletterSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    window.open("https://t.me/+oHYQF_GC30Y5ZWFi", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 max-w-lg mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
          Подпишитесь на <span className="text-gradient-gold">рассылку</span>
        </h2>
        <p className="text-muted-foreground mb-8 text-sm md:text-base">
          Новости в сфере сценического света
        </p>
        <div className="space-y-3">
          <Input
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary/50 border-border/50 h-12"
          />
          <Input
            type="email"
            placeholder="Ваш e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary/50 border-border/50 h-12"
          />
          <Button
            onClick={handleSubscribe}
            className="w-full h-12 text-base font-display font-semibold glow-gold hover:glow-gold-strong transition-all duration-300"
          >
            <Send className="w-4 h-4 mr-2" />
            Подписаться
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
