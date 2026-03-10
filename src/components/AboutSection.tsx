import { useI18n } from "@/lib/i18n";

const AboutSection = () => {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24" id="about">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-6">
          {t("about.title")} <span className="text-gradient-gold">{t("about.title2")}</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
          {t("about.desc")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="glass-card rounded-xl p-6">
            <span className="text-3xl font-display font-bold text-primary">500+</span>
            <p className="text-muted-foreground text-sm mt-1">{t("about.events")}</p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <span className="text-3xl font-display font-bold text-primary">{t("about.years")}</span>
            <p className="text-muted-foreground text-sm mt-1">{t("about.experience")}</p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <span className="text-3xl font-display font-bold text-primary">100%</span>
            <p className="text-muted-foreground text-sm mt-1">{t("about.satisfaction")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
