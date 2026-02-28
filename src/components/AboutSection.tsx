const AboutSection = () => {
  return (
    <section className="py-16 md:py-24" id="about">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-6">
          О <span className="text-gradient-gold">нас</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
          Мы — команда профессионалов в области сценического освещения. Создаём атмосферу
          для свадеб, корпоративов, концертов и любых мероприятий. Используем современное
          оборудование и уникальный авторский стиль, чтобы каждое событие стало незабываемым.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="glass-card rounded-xl p-6">
            <span className="text-3xl font-display font-bold text-primary">500+</span>
            <p className="text-muted-foreground text-sm mt-1">Мероприятий</p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <span className="text-3xl font-display font-bold text-primary">4 года</span>
            <p className="text-muted-foreground text-sm mt-1">Опыт работы</p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <span className="text-3xl font-display font-bold text-primary">100%</span>
            <p className="text-muted-foreground text-sm mt-1">Довольных клиентов</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
