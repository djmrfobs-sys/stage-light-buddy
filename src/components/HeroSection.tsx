import heroImage from "@/assets/hero-lighting.jpg";
import { useI18n } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useI18n();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-beam light-beam-1" />
        <div className="light-beam light-beam-2" />
        <div className="light-beam light-beam-3" />
        <div className="light-beam light-beam-4" />
        <div className="light-beam light-beam-5" />
        <div className="light-beam-warm light-beam-warm-1" />
        <div className="light-beam-warm light-beam-warm-2" />
        <div className="light-beam-warm light-beam-warm-3" />
        <div className="light-beam-warm light-beam-warm-4" />
      </div>
      <div className="relative z-10 container text-center px-4 py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-2 animate-fade-up tracking-tight">
          <span className="text-gradient-gold">АНГАР</span>
        </h1>
        <p className="text-primary/80 font-display text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {t("hero.subtitle")}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold leading-tight mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          {t("hero.title1")}
          <br />
          <span className="text-gradient-gold">{t("hero.title2")}</span>
        </h2>

        {/* О нас */}
        <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold mb-4">
            {t("about.title")} <span className="text-gradient-gold">{t("about.title2")}</span>
          </h3>
          <div className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 space-y-3">
            {t("about.desc").split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-5">
              <span className="text-2xl md:text-3xl font-display font-bold text-primary">500+</span>
              <p className="text-muted-foreground text-xs md:text-sm mt-1">{t("about.events")}</p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <span className="text-2xl md:text-3xl font-display font-bold text-primary">{t("about.years")}</span>
              <p className="text-muted-foreground text-xs md:text-sm mt-1">{t("about.experience")}</p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <span className="text-2xl md:text-3xl font-display font-bold text-primary">100%</span>
              <p className="text-muted-foreground text-xs md:text-sm mt-1">{t("about.satisfaction")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
