export const packages = [
  {
    id: "standard",
    name: "Standard",
    price: 3300,
    recommended: false,
    description: "Pentru salonul care vrea să testeze sistemul.",
    dresses: "3 rochii",
    models: "1 model",
    location: "Studio profesional",
    photos: "60+",
    photoNote: "20 fotografii / rochie",
    reels: 10,
    heroes: "—",
    posts: 8,
    stories: 30,
    editorialName: "Mini editorial",
    pages: "8",
    copies: 1,
    production: "Până la aproximativ 4 ore de producție.",
    content: "Foto + carusele + close-ups",
  },
  {
    id: "plus",
    name: "Plus",
    price: 4000,
    recommended: true,
    description:
      "Pentru salonul care vrea mai multă varietate și o campanie cu atmosferă reală de wedding day.",
    dresses: "4 rochii",
    models: "1 model",
    location: "Locație premium*",
    photos: "80+",
    photoNote: "Fotografii finale retușate",
    reels: 15,
    heroes: "1 Hero Video principal",
    posts: 12,
    stories: 30,
    editorialName: "Editorial",
    pages: "12–16",
    copies: 3,
    production: "Până la aproximativ 6 ore de producție.",
    content: "Carusele + close-ups + dress spotlight",
  },
  {
    id: "premium",
    name: "Premium",
    price: 5500,
    recommended: false,
    description:
      "Pentru salonul care vrea o bibliotecă amplă de conținut și o campanie completă.",
    dresses: "5 rochii",
    models: "1–2 modele",
    location: "Locație premium",
    photos: "100+",
    photoNote: "Fotografii finale retușate",
    reels: 20,
    heroes: "2 Hero Videos",
    posts: 16,
    stories: 45,
    editorialName: "Editorial Signature",
    pages: "20",
    copies: 5,
    production: "Mai multe setup-uri în aceeași zi.",
    content: "Carusele + dress spotlight + close-ups + sales content",
  },
] as const;
export type Package = (typeof packages)[number];
export function formatPrice(price: number) {
  return new Intl.NumberFormat("ro-RO").format(price);
}
export const reelFormats = [
  [
    "Presenter",
    "Actor, consultant sau owner, direct către cameră. Hooks, explicații, FAQ și recomandări.",
  ],
  [
    "Model + rochie",
    "Walk, movement, veil moments și cadre hero. Rochia, în mișcare.",
  ],
  [
    "Detail",
    "Corset, dantelă, trenă, broderii și texturi. Tot ce merită văzut de aproape.",
  ],
  [
    "Educational",
    "Sfaturi pentru mirese și conținut care poziționează salonul ca expert.",
  ],
  ["Comparison", "Rochia A vs. B. Princess vs. mermaid. Satin vs. lace."],
  ["Trend", "Transitions, POV și formate actuale, create pentru social media."],
  [
    "Sales / CTA",
    "Colecții noi, disponibilitate și invitație la programarea unei probe.",
  ],
  [
    "BTS",
    "Makeup, hair, pregătirea modelului și atmosfera din ziua producției.",
  ],
] as const;
