import { Lightbulb, Truck, Headphones, Settings, Zap, Shield } from "lucide-react";

const included = [
  { icon: Lightbulb, title: "LED-приборы", desc: "Wash, beam, spot — под любой формат" },
  { icon: Settings, title: "Пульт управления", desc: "DMX-контроллер для точной настройки" },
  { icon: Zap, title: "Генератор тумана", desc: "Для создания объёмных лучей" },
  { icon: Headphones, title: "Саундчек света", desc: "Настройка под музыку и сцену" },
];

const benefits = [
  { icon: Shield, title: "Профессиональное оборудование", desc: "Только проверенные бренды и надёжная техника" },
  { icon: Truck, title: "Доставка и монтаж", desc: "Привезём, установим и всё подключим" },
  { icon: Headphones, title: "Оператор в лайв-режиме", desc: "Живое управление светом под ход мероприятия" },
  { icon: Lightbulb, title: "Индивидуальная программа", desc: "Световой дизайн по вашему сценарию" },
];

const InfoBlocks = () => {
  return (
    <>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-12">
            Что <span className="text-gradient-gold">входит</span> в комплект
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {included.map((item, i) => (
              <div
                key={item.title}
                className="glass-card rounded-xl p-6 text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-12">
            Наши <span className="text-gradient-gold">преимущества</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {benefits.map((item, i) => (
              <div
                key={item.title}
                className="glass-card rounded-xl p-6 flex gap-4 items-start animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
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
    </>
  );
};

export default InfoBlocks;
