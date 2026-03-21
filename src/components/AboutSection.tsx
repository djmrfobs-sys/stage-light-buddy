import { useI18n } from "@/lib/i18n";

const AboutSection = ({ onCalculate }: { onCalculate: () => void }) => {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24" id="about">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">
          {t("calc.title1")} <span className="text-gradient-gold">{t("calc.title2")}</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-8">
          {t("hero.desc")}
        </p>
        <button
          onClick={onCalculate}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-105"
        >
          {t("hero.cta")}
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
