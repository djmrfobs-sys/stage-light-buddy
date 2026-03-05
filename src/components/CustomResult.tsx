const CustomResult = ({ onReset }: { onReset: () => void }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 max-w-lg mx-auto text-center">
        <div className="glass-card rounded-xl p-8 md:p-12">
          <div className="text-5xl mb-6">🎭</div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Нужен <span className="text-gradient-gold">индивидуальный</span> расчёт
          </h2>
          <p className="text-muted-foreground mb-8">
            Ваши параметры выходят за рамки стандартных пакетов. Свяжитесь с нами для персонального расчёта стоимости.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://t.me/Angar_audiolight_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-display font-semibold py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 text-center"
            >
              Написать в Telegram
            </a>
            <button
              onClick={onReset}
              className="bg-secondary text-secondary-foreground font-display font-semibold py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
            >
              Рассчитать заново
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomResult;
