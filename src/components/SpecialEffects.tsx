import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import effectFirework from "@/assets/effect-firework.jpg";
import effectConfetti from "@/assets/effect-confetti.jpg";
import effectFountains from "@/assets/effect-fountains.jpg";
import effectSpinners from "@/assets/effect-spinners.jpg";

interface Effect {
  num: number;
  title: string;
  description: React.ReactNode;
  image: string;
  imageAlt: string;
}

const effects: Effect[] = [
  {
    num: 1,
    title: "Дневной веерный салют",
    description: "Веерный или прямой, от 25 до 100 залпов. Цвета есть на выбор.",
    image: effectFirework,
    imageAlt: "Пример дневного веерного салюта красного цвета",
  },
  {
    num: 2,
    title: "Конфетти",
    description: "от 8 000 ₽",
    image: effectConfetti,
    imageAlt: "Пример конфетти на мероприятии",
  },
  {
    num: 3,
    title: "Холодные фонтаны",
    description: (
      <ul className="text-sm text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
        <li>3 метра 30 секунд — 1 200 ₽</li>
        <li>3 метра 1 минута — 1 500 ₽</li>
        <li>5 метров 1 минута — 2 000 ₽</li>
      </ul>
    ),
    image: effectFountains,
    imageAlt: "Пример дорожки из холодных фонтанов",
  },
  {
    num: 4,
    title: "Вертушки из холодных фонтанов",
    description:
      "На одной вертушке помещается до 9 шт, количество определяется заказчиком",
    image: effectSpinners,
    imageAlt: "Пример вертушек из холодных фонтанов",
  },
];

const SpecialEffects = () => {
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);

  return (
    <section className="py-16 md:py-24" id="effects">
      <div className="container px-4">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3 flex items-center justify-center gap-3">
          <Sparkles className="w-7 h-7 text-primary" />
          <span>
            Спец<span className="text-gradient-gold">эффекты</span>
          </span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Дополнительные эффекты для незабываемого шоу
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {effects.map((e, i) => (
            <div
              key={e.num}
              className="glass-card rounded-xl p-6 hover:border-primary/40 transition-all duration-300 animate-fade-up cursor-pointer group"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelectedEffect(e)}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-display font-bold text-primary shrink-0">
                  {e.num}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {e.title}
                  </h3>
                  {typeof e.description === "string" ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      {e.description}
                    </p>
                  ) : (
                    e.description
                  )}
                  <span className="text-xs text-primary/70 mt-2 inline-block group-hover:text-primary transition-colors">
                    Нажмите, чтобы посмотреть пример →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-10 space-y-3">
          <div className="glass-card rounded-xl p-5 flex gap-3 items-start">
            <span className="text-primary text-lg mt-0.5">✓</span>
            <p className="text-sm text-muted-foreground">
              В своей работе учитываем пожелания от заказчика, подстраиваем
              художественный свет для работы фотографов и видеографов
            </p>
          </div>
          <div className="glass-card rounded-xl p-5 flex gap-3 items-start">
            <span className="text-primary text-lg mt-0.5">✓</span>
            <p className="text-sm text-muted-foreground">
              Используем современный, свой{" "}
              <span className="text-gradient-gold font-semibold">
                «УНИКАЛЬНЫЙ СТИЛЬ»
              </span>{" "}
              оформления сценическим светом
            </p>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedEffect} onOpenChange={() => setSelectedEffect(null)}>
        <DialogContent className="max-w-[90vw] md:max-w-2xl max-h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedEffect?.title ?? "Пример спецэффекта"}
          </DialogTitle>
          {selectedEffect && (
            <div className="flex flex-col">
              <img
                src={selectedEffect.image}
                alt={selectedEffect.imageAlt}
                className="w-full max-h-[60vh] object-cover"
              />
              <div className="p-5">
                <h3 className="font-display font-bold text-xl text-primary mb-1">
                  {selectedEffect.title}
                </h3>
                {typeof selectedEffect.description === "string" ? (
                  <p className="text-sm text-muted-foreground">
                    {selectedEffect.description}
                  </p>
                ) : (
                  selectedEffect.description
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SpecialEffects;
