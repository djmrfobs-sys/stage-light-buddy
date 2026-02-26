import { useState } from "react";
import { eventFormats, findPackage, calculateTotal, type Package } from "@/lib/packages";
import { z } from "zod";

const calcSchema = z.object({
  area: z.number().min(10, "Минимум 10 м²").max(1000, "Максимум 1000 м²"),
  guests: z.number().min(1, "Минимум 1 гость").max(1000, "Максимум 1000 гостей"),
  hours: z.number().min(1, "Минимум 1 час").max(48, "Максимум 48 часов"),
  format: z.string().min(1, "Выберите формат"),
});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = calcSchema.safeParse({
      area: Number(area),
      guests: Number(guests),
      hours: Number(hours),
      format,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const pkg = findPackage(parsed.data.area, parsed.data.guests);
    if (!pkg) {
      onCustom();
      return;
    }

    const breakdown = calculateTotal(pkg, parsed.data.hours);
    onResult({ pkg, breakdown, hours: parsed.data.hours });
  };

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  return (
    <section className="py-16 md:py-24" id="calculator">
      <div className="container px-4 max-w-lg mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3">
          <span className="text-gradient-gold">Калькулятор</span> стоимости
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Заполните параметры и мы подберём оптимальный пакет
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Площадь помещения, м²
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Например, 150"
              className={inputClass}
            />
            {errors.area && (
              <p className="text-destructive text-sm mt-1">{errors.area}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Количество гостей
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Например, 80"
              className={inputClass}
            />
            {errors.guests && (
              <p className="text-destructive text-sm mt-1">{errors.guests}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Длительность, часов
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="6"
              className={inputClass}
            />
            {errors.hours && (
              <p className="text-destructive text-sm mt-1">{errors.hours}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Формат мероприятия
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className={inputClass}
            >
              <option value="">Выберите формат</option>
              {eventFormats.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            {errors.format && (
              <p className="text-destructive text-sm mt-1">{errors.format}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-display font-semibold text-lg py-4 rounded-lg glow-gold hover:glow-gold-strong transition-all duration-300 hover:scale-[1.02]"
          >
            Рассчитать стоимость
          </button>
        </form>
      </div>
    </section>
  );
};

export default CalculatorForm;
export type { CalcResult };
