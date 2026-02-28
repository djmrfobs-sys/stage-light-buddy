import { useState } from "react";
import { Menu, X, Phone, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";
import portfolio9 from "@/assets/portfolio-9.jpg";
import portfolio10 from "@/assets/portfolio-10.jpg";
import portfolio11 from "@/assets/portfolio-11.jpg";
import portfolio12 from "@/assets/portfolio-12.jpg";
import portfolio13 from "@/assets/portfolio-13.jpg";
import portfolio14 from "@/assets/portfolio-14.jpg";
import portfolio15 from "@/assets/portfolio-15.jpg";
import portfolio16 from "@/assets/portfolio-16.jpg";

const portfolioImages = [
  { src: portfolio1, alt: "Латиноамериканский танец на сцене" },
  { src: portfolio2, alt: "Народный танец с световыми эффектами" },
  { src: portfolio4, alt: "Групповое выступление на сцене" },
  { src: portfolio6, alt: "Свадебный фейерверк для пары" },
  { src: portfolio7, alt: "Групповое шоу на сцене" },
  { src: portfolio8, alt: "Танцы на вечеринке" },
  { src: portfolio9, alt: "Фейерверк-вертушки для молодожёнов" },
  { src: portfolio10, alt: "Световое и звуковое оборудование" },
  { src: portfolio11, alt: "Оформление банкетного зала" },
  { src: portfolio12, alt: "Силуэты танцоров в синем свете" },
  { src: portfolio13, alt: "Световое оформление зала с люстрой" },
  { src: portfolio14, alt: "Первый танец молодожёнов" },
  { src: portfolio15, alt: "Танец в облаках с конфетти" },
  { src: portfolio16, alt: "Свадебная вечеринка с гостями" },
];

const navLinks = [
  { label: "Пакеты", href: "#packages" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Спецэффекты", href: "#effects" },
  { label: "FAQ", href: "#faq" },
  { label: "О нас", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container px-4 flex items-center justify-between h-14">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display font-bold text-xl text-gradient-gold tracking-wider">
            ANGAR
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => setShowPortfolio(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <Image className="w-3.5 h-3.5" />
              Портфолио
            </button>
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {showPhone ? "8-918-210-05-84" : "Позвонить"}
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 pb-4 space-y-3">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors font-medium py-1.5"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setShowPortfolio(true); setOpen(false); }}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary w-full text-left py-1.5"
            >
              <Image className="w-3.5 h-3.5" />
              Портфолио
            </button>
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary pt-2 border-t border-border/50 w-full text-left"
            >
              <Phone className="w-3.5 h-3.5" />
              {showPhone ? "8-918-210-05-84" : "Позвонить"}
            </button>
          </div>
        )}
      </nav>

      {/* Portfolio Dialog */}
      <Dialog open={showPortfolio} onOpenChange={setShowPortfolio}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">Портфолио</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-4">
            {portfolioImages.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="rounded-lg object-cover w-full aspect-[4/3] hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
