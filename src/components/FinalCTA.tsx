import { useI18n } from "@/lib/i18n";

const FinalCTA = ({ onCalculate }: { onCalculate: () => void }) => {
  const { t } = useI18n();
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 text-center max-w-2xl mx-auto animate-fade-in" style={{ animationDuration: '0.8s' }}>
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.2s', animationDuration: '0.6s', animationFillMode: 'both' }}>
          {t("cta.title1")} <span className="text-gradient-gold">{t("cta.title2")}</span> {t("cta.title3")}
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.4s', animationDuration: '0.6s', animationFillMode: 'both' }}>{t("cta.desc")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s', animationDuration: '0.6s', animationFillMode: 'both' }}>
          <button onClick={onCalculate} className="bg-primary text-primary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-105">
            {t("cta.calculate")}
          </button>
          <a href="https://t.me/Angar_audiolight_bot" target="_blank" rel="noopener noreferrer" className="bg-secondary text-secondary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
            {t("cta.telegram")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
