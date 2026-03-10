import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";

import effectFirework from "@/assets/effect-firework.jpg";
import effectConfetti from "@/assets/effect-confetti.jpg";
import effectFountains from "@/assets/effect-fountains.jpg";
import effectSpinners from "@/assets/effect-spinners.jpg";

const SpecialEffects = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { t } = useI18n();

  const effects = [
    {
      num: 1,
      title: t("effect.firework.title"),
      description: t("effect.firework.descShort"),
      image: effectFirework,
      imageAlt: "Daytime fan fireworks",
    },
    {
      num: 2,
      title: t("effect.confetti.title"),
      description: t("effect.confetti.desc"),
      image: effectConfetti,
      imageAlt: "Confetti at an event",
    },
    {
      num: 3,
      title: t("effect.fountains.title"),
      description: null, // special rendering
      image: effectFountains,
      imageAlt: "Cold fountain pathway",
    },
    {
      num: 4,
      title: t("effect.spinners.title"),
      description: t("effect.spinners.desc"),
      image: effectSpinners,
      imageAlt: "Cold fountain spinners",
    },
  ];

  const selected = selectedIdx !== null ? effects[selectedIdx] : null;

  return (
    <section className="py-16 md:py-24" id="effects">
      <div className="container px-4">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3 flex items-center justify-center gap-3">
          <Sparkles className="w-7 h-7 text-primary" />
          <span>
            {t("effects.title")}<span className="text-gradient-gold">{t("effects.title2")}</span>
          </span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          {t("effects.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {effects.map((e, i) => (
            <div
              key={e.num}
              className="glass-card rounded-xl p-6 hover:border-primary/40 transition-all duration-300 animate-fade-up cursor-pointer group"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelectedIdx(i)}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-display font-bold text-primary shrink-0">{e.num}</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">{e.title}</h3>
                  {e.description ? (
                    <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                  ) : (
                    <ul className="text-sm text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                      <li>{t("effect.fountain1")}</li>
                      <li>{t("effect.fountain2")}</li>
                      <li>{t("effect.fountain3")}</li>
                    </ul>
                  )}
                  <span className="text-xs text-primary/70 mt-2 inline-block group-hover:text-primary transition-colors">
                    {t("effect.clickToSee")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-10 space-y-3">
          <div className="glass-card rounded-xl p-5 flex gap-3 items-start">
            <span className="text-primary text-lg mt-0.5">✓</span>
            <p className="text-sm text-muted-foreground">{t("effects.note1")}</p>
          </div>
          <div className="glass-card rounded-xl p-5 flex gap-3 items-start">
            <span className="text-primary text-lg mt-0.5">✓</span>
            <p className="text-sm text-muted-foreground">
              {t("effects.note2p1")}{" "}
              <span className="text-gradient-gold font-semibold">{t("effects.note2highlight")}</span>{" "}
              {t("effects.note2p2")}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={() => setSelectedIdx(null)}>
        <DialogContent className="max-w-[90vw] md:max-w-2xl max-h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden">
          <DialogTitle className="sr-only">{selected?.title ?? ""}</DialogTitle>
          {selected && (
            <div className="flex flex-col">
              <img src={selected.image} alt={selected.imageAlt} className="w-full max-h-[60vh] object-cover" />
              <div className="p-5">
                <h3 className="font-display font-bold text-xl text-primary mb-1">{selected.title}</h3>
                {selected.description ? (
                  <p className="text-sm text-muted-foreground">{selected.description}</p>
                ) : (
                  <ul className="text-sm text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                    <li>{t("effect.fountain1")}</li>
                    <li>{t("effect.fountain2")}</li>
                    <li>{t("effect.fountain3")}</li>
                  </ul>
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
