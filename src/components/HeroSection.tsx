import heroImage from "@/assets/hero-lighting.jpg";

const HeroSection = ({ onCalculate }: { onCalculate: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      {/* Animated light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-beam light-beam-1" />
        <div className="light-beam light-beam-2" />
        <div className="light-beam light-beam-3" />
        <div className="light-beam light-beam-4" />
        <div className="light-beam light-beam-5" />
      </div>
      <div className="relative z-10 container text-center px-4 py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-2 animate-fade-up tracking-tight">
          <span className="text-gradient-gold">АНГАР</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium tracking-[0.2em] uppercase mb-8 animate-fade-up text-foreground/80" style={{ animationDelay: "0.05s" }}>
          AUDIOLIGHT
        </p>
        <p className="text-primary/80 font-display text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Профессиональное световое оборудование
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Подбор сценического света
          <br />
          <span className="text-gradient-gold">для мероприятий</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Рассчитайте стоимость аренды светового оборудования за 30 секунд.
          Готовые пакеты для площадок от 50 до 250 м².
        </p>
        <button
          onClick={onCalculate}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-105 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          Рассчитать стоимость
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
