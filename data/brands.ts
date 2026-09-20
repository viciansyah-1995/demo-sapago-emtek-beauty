export type BrandId = "ffar" | "wondermist" | "majika";
export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  placeholder?: boolean;
  color: string;
};
export type Brand = {
  id: BrandId;
  name: string;
  logo: string;
  instagram: string;
  eyebrow: string;
  headline: string[];
  description: string;
  heroImage: string;
  heroCaption: string;
  cta: string;
  collectionTitle: string;
  finderTitle: string;
  finderDescription: string;
  storyTitle: string;
  storyText: string;
  greeting: string;
  prompts: string[];
  moods: { name: string; note: string; prompt: string; color: string }[];
  products: Product[];
  sections: ("collection" | "finder" | "story")[];
};
// DEMO DATA - replace with client catalogue. Campaign copy is illustrative.
// No prices, stock, ingredients, longevity or performance claims are provided.
export const brands: Record<BrandId, Brand> = {
  ffar: {
    id: "ffar",
    name: "FFAR",
    logo: "/assets/logos/ffar-logo.jpeg",
    instagram: "https://www.instagram.com/ffar.official/",
    eyebrow: "YOUR SCENT. YOUR PRESENCE.",
    headline: ["OWN YOUR", "PRESENCE."],
    description:
      "Dari rutinitas pagi sampai rencana malam. Temukan aroma untuk setiap sisi dirimu.",
    heroImage: "/assets/ffar/hero.webp",
    heroCaption: "THE FFAR EDIT",
    cta: "Explore collection",
    collectionTitle: "Your everyday signature.",
    finderTitle: "Made for your kind of day.",
    finderDescription: "Mulai dari aktivitasmu. Biar kami bantu menemukan pilihan yang sesuai.",
    storyTitle: "LEAVE AN\nIMPRESSION.",
    storyText:
      "Bukan tentang menjadi orang lain. Tentang menemukan sesuatu yang terasa seperti dirimu.",
    greeting: "Halo! Aku FFAR Assistant. Lagi cari parfum untuk daily, kerja, atau acara tertentu?",
    prompts: [
      "Cari parfum untuk daily activity",
      "Parfum untuk acara malam?",
      "Apa perbedaan aroma produk FFAR?",
      "Rekomendasikan parfum untuk hadiah",
      "Berapa lama wanginya bertahan?",
      "Ada promo apa sekarang?",
    ],
    moods: [
      {
        name: "On the daily",
        note: "Rutinitas, with character.",
        prompt: "Saya sering meeting dan aktivitas outdoor, parfum FFAR mana yang cocok?",
        color: "#b6c3d4",
      },
      {
        name: "After hours",
        note: "Untuk rencana malam.",
        prompt: "Parfum FFAR mana yang cocok untuk acara malam?",
        color: "#8793b0",
      },
      {
        name: "For someone",
        note: "A thoughtful gesture.",
        prompt: "Bantu pilih parfum FFAR untuk hadiah.",
        color: "#e0ded5",
      },
    ],
    products: [
      {
        id: "sigma-spirit",
        name: "Sigma Spirit",
        category: "Eau de Parfum",
        image: "/assets/ffar/product-01.webp",
        color: "#b8c0cc",
      },
    ],
    sections: ["collection", "story", "finder"],
  },
  wondermist: {
    id: "wondermist",
    name: "Wondermist",
    logo: "/assets/logos/wondermist-logo.jpg",
    instagram: "https://www.instagram.com/wondermisofficial/",
    eyebrow: "A MOMENT, JUST FOR YOU",
    headline: ["A little care.", "A moment for you."],
    description: "Temukan pilihan yang terasa seperti kamu. Sesederhana itu.",
    heroImage: "/assets/wondermist/hero.webp",
    heroCaption: "THE EVERYDAY EDIT",
    cta: "Explore products",
    collectionTitle: "Find your little favorite.",
    finderTitle: "Find the one that feels like you.",
    finderDescription: "Kenali rutinitasmu. Temukan produk yang ingin kamu eksplorasi.",
    storyTitle: "Your everyday,\na little more you.",
    storyText:
      "Ada ruang untuk hal-hal kecil yang membuat harimu terasa berbeda. Mulai dari pilihanmu sendiri.",
    greeting: "Hai! Aku Wondermist Assistant. Ada yang bisa aku bantu cari hari ini?",
    prompts: [
      "Produk mana yang cocok untuk aku?",
      "Bantu pilih skincare untuk rutinitas harianku.",
      "Produk ini cocok dipakai kapan?",
      "Bantu bandingkan dua produk",
      "Ada rekomendasi untuk hadiah?",
      "Ada promo saat ini?",
    ],
    moods: [
      {
        name: "Daily ritual",
        note: "A little time for yourself.",
        prompt: "Bantu pilih produk Wondermist untuk rutinitas harian.",
        color: "#ead6ea",
      },
      {
        name: "Meet the products",
        note: "Get to know your options.",
        prompt: "Apa perbedaan toner, essence, dan ampoule Wondermist?",
        color: "#efd8e3",
      },
      {
        name: "Find a gift",
        note: "Something thoughtful.",
        prompt: "Aku mencari hadiah produk Wondermist. Bisa bantu memilih?",
        color: "#dae4ee",
      },
    ],
    products: [
      {
        id: "wondermis-toner",
        name: "Wondermist Toner",
        category: "Toner",
        image: "/assets/wondermist/product-01.webp",
        color: "#f0d3e4",
      },
      {
        id: "bubble-burst",
        name: "Bubble Burst Brightening Essence",
        category: "Essence",
        image: "/assets/wondermist/product-02.webp",
        color: "#e6d9ed",
      },
      {
        id: "skin-glow-shot",
        name: "Skin Glow Shot STARENOL Ampoule",
        category: "Ampoule",
        image: "/assets/wondermist/product-03.webp",
        color: "#e7ddec",
      },
    ],
    sections: ["finder", "collection", "story"],
  },
  majika: {
    id: "majika",
    name: "Majika",
    logo: "/assets/logos/majika-logo.jpeg",
    instagram: "https://www.instagram.com/majika.official/",
    eyebrow: "A SCENT FOR EVERY VERSION OF YOU",
    headline: ["A little scent.", "A little magic."],
    description: "Hari ini mau jadi versi yang mana? Temukan aroma untuk mood kamu.",
    heroImage: "/assets/majika/hero.webp",
    heroCaption: "PICK A SCENT. CHANGE THE MOOD.",
    cta: "Find my scent",
    collectionTitle: "Meet your mood makers.",
    finderTitle: "Which Majika are you today?",
    finderDescription: "Tidak harus sama setiap hari. Pilih mood, lalu tanyakan rekomendasinya.",
    storyTitle: "Different day.\nDifferent you.",
    storyText:
      "Dari rencana spontan sampai waktu untuk diri sendiri. Ada banyak cara untuk jadi kamu.",
    greeting:
      "Hai! Aku Majika Assistant. Ceritain aroma atau mood yang kamu suka, nanti aku bantu cari yang cocok.",
    prompts: [
      "Majika mana yang cocok buat aku?",
      "Aku suka wangi floral.",
      "Parfum yang cocok untuk daily apa?",
      "Bandingkan Flower Power dan Summer Paradise",
      "Rekomendasi parfum untuk hadiah",
      "Aroma yang paling fresh yang mana?",
    ],
    moods: [
      {
        name: "In full bloom",
        note: "Romantic & floral",
        prompt: "Aku suka wangi floral dan feminin. Majika yang cocok buat aku apa?",
        color: "#edabc6",
      },
      {
        name: "Sunny side up",
        note: "Tropical & energetic",
        prompt: "Aku ingin parfum Majika untuk mood tropical dan energik.",
        color: "#d9e789",
      },
      {
        name: "Go with the flow",
        note: "Cool & calm",
        prompt: "Aku cari parfum Majika untuk mood cool dan calm.",
        color: "#a8c6e9",
      },
    ],
    products: [
      {
        id: "flower-power",
        name: "Flower Power",
        category: "Majika collection",
        image: "/assets/majika/product-01.webp",
        color: "#efb5d0",
      },
      {
        id: "summer-paradise",
        name: "Summer Paradise",
        category: "Majika collection",
        image: "/assets/majika/product-02.webp",
        color: "#d2dd96",
      },
      {
        id: "aqua-indigo",
        name: "Aqua Indigo",
        category: "Majika collection",
        image: "/assets/majika/product-03.webp",
        color: "#adc7e6",
      },
    ],
    sections: ["finder", "collection", "story"],
  },
};
export const brandIds = Object.keys(brands) as BrandId[];
export function isBrandId(value: unknown): value is BrandId {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(brands, value);
}
