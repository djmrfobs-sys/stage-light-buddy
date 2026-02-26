import { formatPrice, BASE_HOURS, EXTRA_HOUR_COST } from "@/lib/packages";
import type { CalcResult } from "./CalculatorForm";

const ResultSection = ({
  result,
  onReset,
  onRequest,
}: {
  result: CalcResult;
  onReset: () => void;
  onRequest: () => void;
}) => {
  const { pkg, breakdown } = result;

  return (
    <section className="py-16 md:py-24" id="result">
      <div className="container px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-10">
          Ваш пакет: <span className="text-gradient-gold">{pkg.name}</span>
        </h2>

        <div className="glass-card rounded-xl overflow-hidden mb-8">
          <img
            src={pkg.image}
            alt={`Комплект ${pkg.name}`}
            className="w-full aspect-video object-cover"
          />
        </div>

        <div className="glass-card rounded-xl p-6 md:p-8 space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Пакет {pkg.name} (базовая стоимость)</span>
            <span className="font-display font-semibold text-lg">{formatPrice(breakdown.packageCost)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-muted-foreground">Оператор света</span>
              <p className="text-xs text-muted-foreground/70">Работа в лайв-режиме, {BASE_HOURS} часов</p>
            </div>
            <span className="font-display font-semibold text-lg">{formatPrice(breakdown.operatorCost)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Транспортировка</span>
            <span className="font-display font-semibold text-lg">{formatPrice(breakdown.transportCost)}</span>
          </div>
          {breakdown.extraHours > 0 && (
            <div className="flex justify-between items-center">
              <div>
                <span className="text-muted-foreground">Продление</span>
                <p className="text-xs text-muted-foreground/70">
                  +{breakdown.extraHours} ч. × {formatPrice(EXTRA_HOUR_COST)}
                </p>
              </div>
              <span className="font-display font-semibold text-lg">{formatPrice(breakdown.extraHoursCost)}</span>
            </div>
          )}
          <div className="border-t border-border/50 pt-4 flex justify-between items-center">
            <span className="font-display font-bold text-lg">Итого</span>
            <span className="font-display font-bold text-2xl text-gradient-gold">
              {formatPrice(breakdown.total)}
            </span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 mb-8 border-primary/20">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">Обратите внимание:</span>{" "}
            оператор света и транспортировка оплачиваются отдельно и не входят в базовую стоимость пакета.
            При продлении мероприятия свыше {BASE_HOURS} часов — каждый дополнительный час стоит {formatPrice(EXTRA_HOUR_COST)}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRequest}
            className="flex-1 bg-primary text-primary-foreground font-display font-semibold py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-[1.02]"
          >
            Оставить заявку
          </button>
          <button
            onClick={onReset}
            className="flex-1 bg-secondary text-secondary-foreground font-display font-semibold py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
          >
            Рассчитать заново
          </button>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-secondary text-secondary-foreground font-display font-semibold py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 text-center"
          >
            Связаться в Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
