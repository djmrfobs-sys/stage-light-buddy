import { useState } from "react";
import { Menu, X, Phone, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
            <p className="col-span-full text-center text-muted-foreground">
              Фотографии скоро появятся — отправьте их мне в чат!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
