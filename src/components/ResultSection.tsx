import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { formatPrice, BASE_HOURS, EXTRA_HOUR_COST } from "@/lib/packages";
import { useI18n } from "@/lib/i18n";
import type { CalcResult } from "./CalculatorForm";

const ResultSection = ({
  result,
  onReset,
  onRequest,
  onHome,
  onEffectsChange,
}: {
  result: CalcResult;
  onReset: () => void;
  onRequest: () => void;
  onHome: () => void;
  onEffectsChange?: (effects: string[]) => void;
}) => {
  const { pkg, breakdown } = result;
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const { t } = useI18n();

  const specialEffectsOptions = [
    {
      id: "fireworks",
      title: t("effect.firework.title"),
      description: t("effect.firework.desc"),
      priceLabel: t("effect.priceFirework"),
      note: t("effect.noteManager"),
    },
    {
      id: "fountains",
      title: t("effect.fountains.title"),
      description: t("effect.fountains.desc"),
      priceLabel: t("effect.priceFountain"),
      note: t("effect.noteManager"),
    },
  ];

  const toggleEffect = (id: string) => {
    setSelectedEffects((prev) => {
      const next = prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id];
      onEffectsChange?.(next);
      return next;
    });
  };

  return (
    <section className="py-16 md:py-24" id="result">
      <div className="container px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-10">
          {t("result.yourPackage")} <span className="text-gradient-gold">{pkg.name}</span>
        </h2>

        <div className="glass-card rounded-xl overflow-hidden mb-8 bg-secondary/30">
          <img src={pkg.image} alt={`${pkg.name}`} className="w-full object-contain max-h-[500px] mx-auto" />
        </div>

        <div className="glass-card rounded-xl p-6 md:p-8 space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t("pkg.package")} {pkg.name} ({t("result.baseCost")})</span>
            <span className="font-display font-semibold text-lg">{formatPrice(breakdown.packageCost)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-muted-foreground">{t("result.operator")}</span>
              <p className="text-xs text-muted-foreground/70">{t("result.operatorNote")}, {BASE_HOURS} {t("result.hours")}</p>
            </div>
            <span className="font-display font-semibold text-lg">{formatPrice(breakdown.operatorCost)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t("result.transport")}</span>
            <span className="font-display font-semibold text-lg">{formatPrice(breakdown.transportCost)}</span>
          </div>
          {breakdown.extraHours > 0 && (
            <div className="flex justify-between items-center">
              <div>
                <span className="text-muted-foreground">{t("result.extension")}</span>
                <p className="text-xs text-muted-foreground/70">
                  +{breakdown.extraHours} {t("result.hours")} × {formatPrice(EXTRA_HOUR_COST)}
                </p>
              </div>
              <span className="font-display font-semibold text-lg">{formatPrice(breakdown.extraHoursCost)}</span>
            </div>
          )}
          <div className="border-t border-border/50 pt-4 flex justify-between items-center">
            <span className="font-display font-bold text-lg">{t("result.total")}</span>
            <span className="font-display font-bold text-2xl text-gradient-gold">{formatPrice(breakdown.total)}</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 md:p-8 mb-6 border-primary/20">
          <h3 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {t("result.addEffects")}
          </h3>
          <p className="text-sm text-muted-foreground mb-5">{t("result.addEffectsDesc")}</p>
          <div className="space-y-3">
            {specialEffectsOptions.map((effect) => {
              const isSelected = selectedEffects.includes(effect.id);
              return (
                <button
                  key={effect.id}
                  onClick={() => toggleEffect(effect.id)}
                  className={`w-full text-left rounded-lg p-4 border transition-all duration-300 ${
                    isSelected ? "border-primary bg-primary/10" : "border-border/50 bg-secondary/30 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="font-display font-semibold text-foreground">{effect.title}</span>
                      <p className="text-sm text-muted-foreground mt-0.5">{effect.description}</p>
                      <p className="text-sm font-semibold text-primary mt-1">{effect.priceLabel}</p>
                      {effect.note && <p className="text-xs text-muted-foreground/70 mt-0.5 italic">{effect.note}</p>}
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {selectedEffects.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4">
              ✓ {t("result.effectsSelected")} {selectedEffects.length}. {t("result.effectsCostNote")}
            </p>
          )}
          <p className="text-xs text-muted-foreground/70 mt-4 italic border-l-2 border-primary/30 pl-3">
            {t("result.effectsManagerNote")}
          </p>
        </div>

        <div className="glass-card rounded-xl p-5 mb-8 border-primary/20">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">{t("result.notePrefix")}</span>{" "}
            {t("result.note")}{" "}
            {t("result.extraHourNote")} {BASE_HOURS} {t("result.extraHourNote2")} {formatPrice(EXTRA_HOUR_COST)}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onRequest} className="flex-1 bg-primary text-primary-foreground font-display font-semibold py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-[1.02]">
            {t("result.request")}
          </button>
          <button onClick={onReset} className="flex-1 bg-secondary text-secondary-foreground font-display font-semibold py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
            {t("result.recalculate")}
          </button>
          <button onClick={onHome} className="flex-1 bg-secondary text-secondary-foreground font-display font-semibold py-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
            {t("result.home")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
