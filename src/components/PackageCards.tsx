import { packages, formatPrice, type Package } from "@/lib/packages";

const PackageCards = ({ onSelect }: { onSelect?: (pkg: Package) => void }) => {
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
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={`Пакет ${pkg.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageCards;
