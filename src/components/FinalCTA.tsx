const FinalCTA = ({ onCalculate }: { onCalculate: () => void }) => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">
          Готовы создать <span className="text-gradient-gold">незабываемое</span> событие?
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Рассчитайте стоимость за 30 секунд или свяжитесь с нами для консультации
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCalculate}
            className="bg-primary text-primary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-105"
          >
            Рассчитать стоимость
          </button>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-secondary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
