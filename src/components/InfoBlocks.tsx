import { Lightbulb, Truck, Headphones, Settings, Zap, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const InfoBlocks = () => {
  const { t } = useI18n();

  const included = [
    { icon: Lightbulb, title: t("info.led"), desc: t("info.ledDesc") },
    { icon: Settings, title: t("info.controller"), desc: t("info.controllerDesc") },
    { icon: Zap, title: t("info.fog"), desc: t("info.fogDesc") },
    { icon: Headphones, title: t("info.soundcheck"), desc: t("info.soundcheckDesc") },
  ];

  const benefits = [
    { icon: Shield, title: t("info.proEquip"), desc: t("info.proEquipDesc") },
    { icon: Truck, title: t("info.delivery"), desc: t("info.deliveryDesc") },
    { icon: Headphones, title: t("info.liveOp"), desc: t("info.liveOpDesc") },
    { icon: Lightbulb, title: t("info.custom"), desc: t("info.customDesc") },
  ];

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-12 animate-fade-in" style={{ animationDuration: '0.7s' }}>
            {t("info.benefits")} <span className="text-gradient-gold">{t("info.benefits2")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {benefits.map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-6 flex gap-4 items-start animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <item.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-12">
            {t("info.included")} <span className="text-gradient-gold">{t("info.included2")}</span> {t("info.included3")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {included.map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-6 text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoBlocks;
