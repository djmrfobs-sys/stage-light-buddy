import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Что включено в стоимость пакета?",
    a: "В стоимость входит аренда светового оборудования на 6 часов. Оператор света, транспортировка и продление оплачиваются отдельно.",
  },
  {
    q: "Можно ли арендовать оборудование без оператора?",
    a: "Оборудование арендовывается только с оператором света для максимального эффекта, и он управляет светом в реальном времени, синхронизируя с программой мероприятия в live-режиме.",
  },
  {
    q: "За сколько дней нужно бронировать?",
    a: "Рекомендуем бронировать минимум за 7 дней до мероприятия. В сезон (май–сентябрь) — за 2–3 недели.",
  },
  {
    q: "Можно ли изменить пакет после бронирования?",
    a: "Да, вы можете апгрейднуть или изменить пакет не позднее чем за 3 дня до мероприятия.",
  },
  {
    q: "Работаете ли вы за пределами Москвы?",
    a: "Да, мы работаем по всей России. Стоимость транспортировки за пределы Москвы рассчитывается индивидуально.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30" id="faq">
      <div className="container px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-12">
          Частые <span className="text-gradient-gold">вопросы</span>
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-card rounded-xl px-6 border-border/50"
            >
              <AccordionTrigger className="text-left font-display font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
