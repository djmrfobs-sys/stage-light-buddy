import packMini from "@/assets/pack-mini.jpg";
import packMedium from "@/assets/pack-medium.jpg";
import packBig from "@/assets/pack-big.jpg";
import packMaxi from "@/assets/pack-maxi.jpg";

export interface Package {
  id: string;
  name: string;
  maxArea: number;
  maxGuests: number;
  price: number;
  image: string;
  description: string;
}

export const packages: Package[] = [
  {
    id: "mini",
    name: "MINI",
    maxArea: 130,
    maxGuests: 50,
    price: 38000,
    image: packMini,
    description: "Компактный комплект для небольших площадок",
  },
  {
    id: "medium",
    name: "MEDIUM",
    maxArea: 180,
    maxGuests: 80,
    price: 48000,
    image: packMedium,
    description: "Оптимальный комплект для средних мероприятий",
  },
  {
    id: "big",
    name: "BIG",
    maxArea: 220,
    maxGuests: 100,
    price: 70000,
    image: packBig,
    description: "Мощный комплект для крупных событий",
  },
  {
    id: "maxi",
    name: "MAXI",
    maxArea: 250,
    maxGuests: 140,
    price: 90000,
    image: packMaxi,
    description: "Максимальный комплект для масштабных шоу",
  },
];

export const OPERATOR_COST = 12000;
export const TRANSPORT_COST = 3000;
export const EXTRA_HOUR_COST = 5000;
export const BASE_HOURS = 6;

export const eventFormats = [
  "Свадьба",
  "Корпоратив",
  "День рождения",
  "Концерт",
  "Презентация",
  "Другое",
];

export function findPackage(area: number, guests: number): Package | null {
  for (const pkg of packages) {
    if (area <= pkg.maxArea && guests <= pkg.maxGuests) {
      return pkg;
    }
  }
  return null;
}

export function calculateTotal(pkg: Package, hours: number): {
  packageCost: number;
  operatorCost: number;
  transportCost: number;
  extraHoursCost: number;
  extraHours: number;
  total: number;
} {
  const extraHours = Math.max(0, hours - BASE_HOURS);
  const extraHoursCost = extraHours * EXTRA_HOUR_COST;
  const total = pkg.price + OPERATOR_COST + TRANSPORT_COST + extraHoursCost;
  return {
    packageCost: pkg.price,
    operatorCost: OPERATOR_COST,
    transportCost: TRANSPORT_COST,
    extraHoursCost,
    extraHours,
    total,
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU") + " ₽";
}
