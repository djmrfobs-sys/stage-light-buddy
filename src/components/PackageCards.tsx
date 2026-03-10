import { useState } from "react";
import { packages, formatPrice, type Package } from "@/lib/packages";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";

const descKeys: Record<string, "pkg.mini.desc" | "pkg.medium.desc" | "pkg.big.desc" | "pkg.maxi.desc"> = {
  mini: "pkg.mini.desc",
  medium: "pkg.medium.desc",
  big: "pkg.big.desc",
  maxi: "pkg.maxi.desc",
};

const eqKeys: Record<string, readonly [string, string, string]> = {
  mini: ["pkg.mini.eq1", "pkg.mini.eq2", "pkg.mini.eq3"],
  medium: ["pkg.medium.eq1", "pkg.medium.eq2", "pkg.medium.eq3"],
  big: ["pkg.big.eq1", "pkg.big.eq2", "pkg.big.eq3"],
  maxi: ["pkg.maxi.eq1", "pkg.maxi.eq2", "pkg.maxi.eq3"],
};

const PackageCards = ({ onSelect }: { onSelect?: (pkg: Package) => void }) => {
  const [zoomedPkg, setZoomedPkg] = useState<Package | null>(null);
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24" id="packages">
      <div className="container px-4">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3">
          {t("pkg.title1")} <span className="text-gradient-gold">{t("pkg.title2")}</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
          {t("pkg.subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className="glass-card rounded-xl overflow-hidden group hover:border-primary/40 transition-all duration-300 animate-fade-up flex flex-col"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="aspect-[4/3] overflow-hidden cursor-pointer relative"
                onClick={() => setZoomedPkg(pkg)}
              >
                <img
                  src={pkg.image}
                  alt={`${t("pkg.package")} ${pkg.name}`}
                  className="w-full h-full object-contain bg-black/50 group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-foreground text-sm font-medium bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    {t("pkg.details")}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-xl text-primary mb-1">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t(descKeys[pkg.id] as any)}
                </p>
                <div className="space-y-1 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("pkg.area")}</span>
                    <span className="font-medium">{t("pkg.area") === "Area" ? "up to" : "до"} {pkg.maxArea} {t("pkg.sqm")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("pkg.guests")}</span>
                    <span className="font-medium">{t("pkg.area") === "Area" ? "up to" : "до"} {pkg.maxGuests} {t("pkg.people")}</span>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-border/50">
                  <span className="font-display font-bold text-2xl text-gradient-gold">
                    {formatPrice(pkg.price)}
                  </span>
                  <p className="text-muted-foreground text-xs mt-1">
                    {t("pkg.note")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!zoomedPkg} onOpenChange={() => setZoomedPkg(null)}>
        <DialogContent className="max-w-[90vw] md:max-w-4xl max-h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden">
          <DialogTitle className="sr-only">
            {zoomedPkg ? `${t("pkg.package")} ${zoomedPkg.name}` : ""}
          </DialogTitle>
          {zoomedPkg && (
            <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
              <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-b md:bg-gradient-to-r from-primary/5 to-transparent order-2 md:order-1">
                <h3 className="font-display font-bold text-2xl text-primary mb-2">
                  {zoomedPkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  {t(descKeys[zoomedPkg.id] as any)}
                </p>
                <div className="space-y-3 mb-6">
                  {(eqKeys[zoomedPkg.id] || []).map((key, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-foreground/80">{t(key as any)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-muted-foreground text-sm">{t("pkg.area") === "Area" ? "up to" : "до"} {zoomedPkg.maxArea} {t("pkg.sqm")}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground text-sm">{t("pkg.area") === "Area" ? "up to" : "до"} {zoomedPkg.maxGuests} {t("pkg.guestsLabel")}</span>
                </div>
                <div className="pt-4 border-t border-border/30 mt-4">
                  <span className="font-display font-bold text-2xl text-gradient-gold">
                    {formatPrice(zoomedPkg.price)}
                  </span>
                  <p className="text-muted-foreground text-xs mt-1">
                    {t("pkg.note")}
                  </p>
                </div>
              </div>
              <div className="md:w-3/5 order-1 md:order-2">
                <img
                  src={zoomedPkg.image}
                  alt={`${t("pkg.package")} ${zoomedPkg.name}`}
                  className="w-full h-full max-h-[40vh] md:max-h-[85vh] object-contain bg-black/30"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PackageCards;
