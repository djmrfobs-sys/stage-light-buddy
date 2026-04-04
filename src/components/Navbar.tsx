import { useState, useEffect } from "react";
import { Menu, X, Phone, Image, Globe, MessageCircleHeart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useI18n, type Lang } from "@/lib/i18n";
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
import portfolio17 from "@/assets/portfolio-17.jpg";
import portfolio18 from "@/assets/portfolio-18.jpg";
import portfolio19 from "@/assets/portfolio-19.jpg";
import portfolio20 from "@/assets/portfolio-20.jpg";
import portfolio21 from "@/assets/portfolio-21.jpg";
import portfolio22 from "@/assets/portfolio-22.jpg";
import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";
import review4 from "@/assets/review-4.jpg";
import review5 from "@/assets/review-5.jpg";
import review6 from "@/assets/review-6.jpg";
import review7 from "@/assets/review-7.jpg";
import review8 from "@/assets/review-8.jpg";

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
  { src: portfolio17, alt: "Молодожёны в роскошном банкетном зале" },
  { src: portfolio18, alt: "Молодожёны в лучах света" },
  { src: portfolio19, alt: "Молодожёны в торжественном зале" },
  { src: portfolio20, alt: "Молодожёны на фоне фейерверка" },
  { src: portfolio21, alt: "Молодожёны с салютом и конфетти" },
  { src: portfolio22, alt: "Молодожёны на фоне вечернего салюта" },
];

const reviewImages = [
  { src: review1, alt: "Отзыв клиента 1" },
  { src: review2, alt: "Отзыв клиента 2" },
  { src: review3, alt: "Отзыв клиента 3" },
  { src: review4, alt: "Отзыв клиента 4" },
  { src: review5, alt: "Отзыв клиента 5" },
  { src: review6, alt: "Отзыв клиента 6" },
  { src: review7, alt: "Отзыв клиента 7" },
  { src: review8, alt: "Отзыв клиента 8" },
];

const sectionIds = ["top", "packages", "calculator", "effects", "faq"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { t, lang, setLang } = useI18n();

  const navLinks = [
    { label: t("nav.home"), href: "#top" },
    { label: t("nav.packages"), href: "#packages" },
    { label: t("nav.calculator"), href: "#calculator" },
    { label: t("nav.effects"), href: "#effects" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("top");
        return;
      }
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => {
    setLang(lang === "ru" ? "en" : "ru");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container px-4 flex items-center justify-between h-14">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display font-bold text-xl text-gradient-gold tracking-wider">
            АНГАР
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => {
              const sectionId = l.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={l.href}
                  onClick={() => handleClick(l.href)}
                  className={`text-sm transition-colors font-medium ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  {l.label}
                </button>
              );
            })}
            <button
              onClick={() => setShowPortfolio(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <Image className="w-3.5 h-3.5" />
              {t("nav.portfolio")}
            </button>
            <button
              onClick={() => setShowReviews(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircleHeart className="w-3.5 h-3.5" />
              {t("nav.reviews")}
            </button>
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              title={lang === "ru" ? "Switch to English" : "Переключить на русский"}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "ru" ? "EN" : "RU"}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {t("nav.call")}
              </button>
              {showPhone && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-3 space-y-2 z-50 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <a href="tel:+79182100584" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap">
                    <Phone className="w-3.5 h-3.5" />
                    8-918-210-05-84
                  </a>
                  <a href="tel:+79284321276" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap">
                    <Phone className="w-3.5 h-3.5" />
                    8-928-432-12-76
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === "ru" ? "EN" : "RU"}
            </button>
            <button onClick={() => setOpen(!open)} className="text-foreground">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 pb-4 space-y-3">
            {navLinks.map((l) => {
              const sectionId = l.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={l.href}
                  onClick={() => handleClick(l.href)}
                  className={`block w-full text-left text-sm transition-colors font-medium py-1.5 ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  {l.label}
                </button>
              );
            })}
            <button
              onClick={() => { setShowPortfolio(true); setOpen(false); }}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary w-full text-left py-1.5"
            >
              <Image className="w-3.5 h-3.5" />
              {t("nav.portfolio")}
            </button>
            <button
              onClick={() => { setShowReviews(true); setOpen(false); }}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary w-full text-left py-1.5"
            >
              <MessageCircleHeart className="w-3.5 h-3.5" />
              {t("nav.reviews")}
            </button>
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary pt-2 border-t border-border/50 w-full text-left"
            >
              <Phone className="w-3.5 h-3.5" />
              {showPhone ? "8-918-210-05-84" : t("nav.call")}
            </button>
          </div>
        )}
      </nav>

      {/* Portfolio Dialog */}
      <Dialog open={showPortfolio} onOpenChange={setShowPortfolio}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">{t("nav.portfolio")}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-4">
            {[...portfolioImages].sort(() => Math.random() - 0.5).map((img, i) => (
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

      {/* Reviews Dialog */}
      <Dialog open={showReviews} onOpenChange={setShowReviews}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">{t("nav.reviews")}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
              <p>
                Наш сценический свет создаётся не только для атмосферы праздника, но и для идеального кадра. Мы выстраиваем освещение так, чтобы молодожёны выглядели естественно, эмоции передавались живо, а площадка выглядела эффектно и объёмно. Без жёстких теней, без пересветов — только чистый, гармоничный свет.
              </p>
              <p>
                Поэтому фотографы и видеографы любят работать на площадках с нашим светом: кадры получаются живыми, атмосферными и по-настоящему киношными.
              </p>
            </div>
            <div className="columns-1 sm:columns-2 gap-4 space-y-4">
              {reviewImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className="rounded-lg w-full break-inside-avoid hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
