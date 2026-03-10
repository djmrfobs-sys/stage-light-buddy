import { useState } from "react";
import { findPackage, calculateTotal, type Package } from "@/lib/packages";
import { useI18n } from "@/lib/i18n";

interface CalcResult {
  pkg: Package;
  breakdown: ReturnType<typeof calculateTotal>;
  hours: number;
}

const CalculatorForm = ({
  onResult,
  onCustom,
}: {
  onResult: (result: CalcResult) => void;
  onCustom: () => void;
}) => {
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState("");
  const [hours, setHours] = useState("6");
  const [format, setFormat] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useI18n();

  const eventFormats = [
    { value: "wedding", label: t("format.wedding") },
    { value: "corporate", label: t("format.corporate") },
    { value: "birthday", label: t("format.birthday") },
    { value: "concert", label: t("format.concert") },
    { value: "presentation", label: t("format.presentation") },
    { value: "other", label: t("format.other") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors: Record<string, string> = {};
    const areaNum = Number(area);
    const guestsNum = Number(guests);
    const hoursNum = Number(hours);

    if (!areaNum || areaNum < 10) fieldErrors.area = t("val.minArea");
    else if (areaNum > 1000) fieldErrors.area = t("val.maxArea");
    if (!guestsNum || guestsNum < 1) fieldErrors.guests = t("val.minGuests");
    else if (guestsNum > 1000) fieldErrors.guests = t("val.maxGuests");
    if (!hoursNum || hoursNum < 1) fieldErrors.hours = t("val.minHours");
    else if (hoursNum > 48) fieldErrors.hours = t("val.maxHours");
    if (!format) fieldErrors.format = t("val.format");

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const pkg = findPackage(areaNum, guestsNum);
    if (!pkg) {
      onCustom();
      return;
    }

    const breakdown = calculateTotal(pkg, hoursNum);
    onResult({ pkg, breakdown, hours: hoursNum });
  };

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  return (
    <section className="py-16 md:py-24" id="calculator">
      <div className="container px-4 max-w-lg mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3">
          <span className="text-gradient-gold">{t("calc.title1")}</span> {t("calc.title2")}
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          {t("calc.subtitle")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("calc.area")}</label>
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder={t("calc.areaPlaceholder")} className={inputClass} />
            {errors.area && <p className="text-destructive text-sm mt-1">{errors.area}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("calc.guests")}</label>
            <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder={t("calc.guestsPlaceholder")} className={inputClass} />
            {errors.guests && <p className="text-destructive text-sm mt-1">{errors.guests}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("calc.hours")}</label>
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="6" className={inputClass} />
            {errors.hours && <p className="text-destructive text-sm mt-1">{errors.hours}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("calc.format")}</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className={inputClass}>
              <option value="">{t("calc.formatPlaceholder")}</option>
              {eventFormats.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
            {errors.format && <p className="text-destructive text-sm mt-1">{errors.format}</p>}
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground font-display font-semibold text-lg py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-[1.02]">
            {t("calc.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CalculatorForm;
export type { CalcResult };
