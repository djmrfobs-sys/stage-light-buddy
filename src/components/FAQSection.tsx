import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";

const FAQSection = () => {
  const { t } = useI18n();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30" id="faq">
      <div className="container px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-12">
          {t("faq.title1")} <span className="text-gradient-gold">{t("faq.title2")}</span>
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card rounded-xl px-6 border-border/50">
              <AccordionTrigger className="text-left font-display font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
