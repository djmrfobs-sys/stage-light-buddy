import { useI18n } from "@/lib/i18n";

const CustomResult = ({ onReset, onHome }: { onReset: () => void; onHome: () => void }) => {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 max-w-lg mx-auto text-center">
        <div className="glass-card rounded-xl p-8 md:p-12">
          <div className="text-5xl mb-6">🎭</div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            {t("custom.title1")} <span className="text-gradient-gold">{t("custom.title2")}</span> {t("custom.title3")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("custom.desc")}</p>
          <div className="flex flex-col gap-3">
            <a href="https://t.me/Angar_audiolight_bot" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground font-display font-semibold py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 text-center">
              {t("custom.telegram")}
            </a>
            <button onClick={onReset} className="bg-secondary text-secondary-foreground font-display font-semibold py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
              {t("custom.recalculate")}
            </button>
            <button onClick={onHome} className="bg-secondary text-secondary-foreground font-display font-semibold py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
              {t("custom.home")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomResult;
