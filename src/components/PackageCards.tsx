import { useState } from "react";
import { packages, formatPrice, type Package } from "@/lib/packages";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const PackageCards = ({ onSelect }: { onSelect?: (pkg: Package) => void }) => {
  const [zoomedPkg, setZoomedPkg] = useState<Package | null>(null);

  return (
    <section className="py-16 md:py-24" id="packages">
      <div className="container px-4">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-3">
          Готовые <span className="text-gradient-gold">пакеты</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
          Все цены указаны за 6 часов работы оборудования
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
                  alt={`Пакет ${pkg.name}`}
                  className="w-full h-full object-contain bg-black/50 group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-foreground text-sm font-medium bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    Подробнее
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-xl text-primary mb-1">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {pkg.description}
                </p>
                <div className="space-y-1 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Площадь</span>
                    <span className="font-medium">до {pkg.maxArea} м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Гости</span>
                    <span className="font-medium">до {pkg.maxGuests} чел.</span>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-border/50">
                  <span className="font-display font-bold text-2xl text-gradient-gold">
                    {formatPrice(pkg.price)}
                  </span>
                  <p className="text-muted-foreground text-xs mt-1">
                    * В комплект не включена работа оператора
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
            {zoomedPkg ? `Пакет ${zoomedPkg.name}` : "Информация о пакете"}
          </DialogTitle>
          {zoomedPkg && (
            <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
              {/* Info panel */}
              <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-b md:bg-gradient-to-r from-primary/5 to-transparent order-2 md:order-1">
                <h3 className="font-display font-bold text-2xl text-primary mb-2">
                  {zoomedPkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  {zoomedPkg.description}
                </p>

                <div className="space-y-3 mb-6">
                  {zoomedPkg.equipment.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-muted-foreground text-sm">до {zoomedPkg.maxArea} м²</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground text-sm">до {zoomedPkg.maxGuests} гостей</span>
                </div>

                <div className="pt-4 border-t border-border/30 mt-4">
                  <span className="font-display font-bold text-2xl text-gradient-gold">
                    {formatPrice(zoomedPkg.price)}
                  </span>
                  <p className="text-muted-foreground text-xs mt-1">
                    * В комплект не включена работа оператора
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="md:w-3/5 order-1 md:order-2">
                <img
                  src={zoomedPkg.image}
                  alt={`Пакет ${zoomedPkg.name}`}
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
