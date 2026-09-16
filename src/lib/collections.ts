import chairImage from "@/assets/nil-chair.jpg";
import chairImageB from "@/assets/nil-chair-2.jpg";
import chairImageC from "@/assets/nil-chair-3.jpg";
import diningImage from "@/assets/nil-dining.jpg";
import diningImageB from "@/assets/nil-dining-2.jpg";
import diningImageC from "@/assets/nil-dining-3.jpg";
import sofaImage from "@/assets/nil-sofa.jpg";
import sofaImageB from "@/assets/nil-sofa-2.jpg";
import sofaImageC from "@/assets/nil-sofa-3.jpg";

export interface CollectionProduct {
  name: string;
  material: string;
  image: string;
}

export interface Collection {
  slug: string;
  number: string;
  title: string;
  note: string;
  description: string;
  hero: string;
  heroAlt: string;
  heroFocus: string;
  products: CollectionProduct[];
}

export const collections: Collection[] = [
  {
    slug: "oturma",
    number: "01",
    title: "Oturma",
    note: "Rahatlığın yalın formu",
    description:
      "Oturma koleksiyonu, günün her anında dokunulmak için tasarlanan derin otururlar ve yumuşak hatlarla salonun merkezine yerleşen sakin bir zarafet sunar.",
    hero: sofaImage,
    heroAlt: "Nil Mobilya oturma koleksiyonu — modern oturma grubu",
    heroFocus: "62% center",
    products: [
      { name: "Bulut Oturma Grubu", material: "Bouclé kumaş · Ceviz ayak", image: sofaImage },
      { name: "Modüler Köşe Takımı", material: "Yumuşak dokulu kumaş", image: sofaImageB },
      { name: "Kavissiz Kadife Sofa", material: "Kadife · Pirinç detay", image: sofaImageC },
    ],
  },
  {
    slug: "berjer",
    number: "02",
    title: "Berjer",
    note: "İmza niteliğinde detaylar",
    description:
      "Berjer koleksiyonu; köşeyi, okuma ışığını ve sessiz anları düşünerek tasarlandı. Her parça, mekânda bağımsız bir obje gibi durur.",
    hero: chairImage,
    heroAlt: "Nil Mobilya berjer koleksiyonu — okuma köşesi berjeri",
    heroFocus: "55% center",
    products: [
      { name: "Kadife Berjer", material: "Kadife döşeme · Ahşap ayak", image: chairImage },
      { name: "Okuma Köşesi Berjeri", material: "Kadife · Pirinç lamba uyumu", image: chairImageB },
      { name: "Heykelsi Bouclé Berjer", material: "Bouclé · Döner taban", image: chairImageC },
    ],
  },
  {
    slug: "yemek",
    number: "03",
    title: "Yemek",
    note: "Bir araya gelmenin zarafeti",
    description:
      "Yemek koleksiyonu; uzun sofralar ve paylaşılan anlar için dengeli oranlar, doğal ahşap ve incelikli döşemelerle üretilir.",
    hero: diningImage,
    heroAlt: "Nil Mobilya yemek koleksiyonu — ceviz yemek masası",
    heroFocus: "50% center",
    products: [
      { name: "Ceviz Yemek Masası", material: "Masif ceviz", image: diningImage },
      { name: "Zemin Ayaklı Yemek Takımı", material: "Ceviz · Döşemeli sandalyeler", image: diningImageB },
      { name: "Deri Kaplama Sandalye", material: "Deri · Ceviz iskelet", image: diningImageC },
    ],
  },
];

export function getCollection(slug: string | undefined): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}
