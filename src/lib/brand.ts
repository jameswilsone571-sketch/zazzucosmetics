export const brand = {
  name: "ZAZZU",
  fullName: "ZAZZU COSMETICS",
  tagline: "Beauty, unveiled soon.",
  handle: "@zazzucosmetics",
  founder: "Zara Ellis",
  email: "hello@zazzucosmetics.com.au",
  country: "Australia",
  currency: "AUD",
  launchWindowDays: 30,
} as const;

export const palette = [
  { name: "Off-white", hex: "#FAF6F2", text: "dark" },
  { name: "Warm nude", hex: "#E8D5C4", text: "dark" },
  { name: "Blush", hex: "#D8A7A0", text: "dark" },
  { name: "Champagne gold", hex: "#C9A66B", text: "dark" },
  { name: "Deep cocoa", hex: "#3B2A26", text: "light" },
] as const;

export type Shade = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Lips" | "Eyes" | "Face" | "Cheeks";
  price: number;
  compareAt?: number;
  finish: "Matte" | "Satin" | "Gloss" | "Shimmer";
  shadeFamily: string;
  skinType: string[];
  badge?: "New" | "Bestseller" | "Sold Out";
  image: string;
  secondImage: string;
  description: string;
  benefits: string[];
  shades: Shade[];
  rating: number;
  reviewCount: number;
};

const nudeShades: Shade[] = [
  { name: "01 Silk", hex: "#E7C7B5" },
  { name: "02 Rosewood", hex: "#C98C81" },
  { name: "03 Amara", hex: "#A85F58" },
  { name: "04 Cocoa", hex: "#70423C" },
  { name: "05 Berry Veil", hex: "#8E4552" },
];

const faceShades: Shade[] = [
  { name: "Fair 01", hex: "#F1D9C4" },
  { name: "Light 04", hex: "#DFB99B" },
  { name: "Medium 07", hex: "#B98462" },
  { name: "Tan 10", hex: "#8B5A3E" },
  { name: "Deep 14", hex: "#4F2E22" },
];

const eyeShades: Shade[] = [
  { name: "Champagne", hex: "#D9BE91" },
  { name: "Rose Taupe", hex: "#A87F76" },
  { name: "Bronze", hex: "#8B5D3F" },
  { name: "Cocoa", hex: "#4B332B" },
];

export const products: Product[] = [
  {
    id: "p01", slug: "the-velvet-matte-lipstick", name: "The Velvet Matte Lipstick",
    category: "Lips", price: 34, finish: "Matte", shadeFamily: "Nude & Rose", skinType: ["All"],
    badge: "Bestseller", image: "/images/lipstick-product.jpg", secondImage: "/images/swatch-strip.jpg",
    description: "A weightless, pigment-rich matte that glides on like silk and stays comfortable all day. Our signature bullet is shaped for a precise, soft-blurred finish.",
    benefits: ["12-hour comfortable wear", "Non-drying velvet finish", "Buildable, full-coverage pigment"],
    shades: nudeShades, rating: 4.9, reviewCount: 248,
  },
  {
    id: "p02", slug: "sheer-glow-lip-gloss", name: "Sheer Glow Lip Gloss",
    category: "Lips", price: 28, finish: "Gloss", shadeFamily: "Nude & Rose", skinType: ["All"],
    badge: "New", image: "/images/gloss-product.jpg", secondImage: "/images/hero-campaign.jpg",
    description: "A cushiony, non-sticky gloss with a glass-like shine and a subtle plumping effect. Wear alone or over your favourite lipstick.",
    benefits: ["High-shine glass finish", "Jojoba oil for softness", "No stickiness, no feathering"],
    shades: nudeShades, rating: 4.8, reviewCount: 132,
  },
  {
    id: "p03", slug: "silk-defining-lip-liner", name: "Silk Defining Lip Liner",
    category: "Lips", price: 22, finish: "Matte", shadeFamily: "Nude & Rose", skinType: ["All"],
    image: "/images/lipstick-product.jpg", secondImage: "/images/collection-flatlay.jpg",
    description: "A creamy, long-wear pencil that defines, shapes and prevents feathering — with enough slip to blend beautifully.",
    benefits: ["Smooth, creamy application", "Prevents lipstick feathering", "Sharpenable wood barrel"],
    shades: nudeShades, rating: 4.7, reviewCount: 89,
  },
  {
    id: "p04", slug: "lumiere-eye-palette", name: "The Lumière Eye Palette",
    category: "Eyes", price: 58, finish: "Shimmer", shadeFamily: "Neutral", skinType: ["All"],
    badge: "Bestseller", image: "/images/eye-palette.jpg", secondImage: "/images/hero-campaign.jpg",
    description: "Twelve wearable neutrals in buttery mattes, soft satins and champagne shimmers, curated for every skin tone and every occasion.",
    benefits: ["12 blendable shades", "Buttery, low-fallout formula", "Mirror and及应用 applicator included"],
    shades: eyeShades, rating: 4.9, reviewCount: 316,
  },
  {
    id: "p05", slug: "silk-satin-shadow", name: "Silk Satin Shadow",
    category: "Eyes", price: 24, finish: "Satin", shadeFamily: "Neutral", skinType: ["All"],
    image: "/images/eye-palette.jpg", secondImage: "/images/collection-flatlay.jpg",
    description: "A single wash of satin colour with a soft-focus finish. Build from a sheer veil to a luminous wash of colour.",
    benefits: ["Weightless satin texture", "Crease-resistant wear", "Buildable pigment"],
    shades: eyeShades, rating: 4.6, reviewCount: 74,
  },
  {
    id: "p06", slug: "soft-focus-powder-blush", name: "Soft Focus Powder Blush",
    category: "Cheeks", price: 36, finish: "Satin", shadeFamily: "Rose & Peach", skinType: ["All"],
    badge: "New", image: "/images/blush-product.jpg", secondImage: "/images/hero-campaign.jpg",
    description: "A finely milled blush that melts into skin for a natural, lit-from-within flush that lasts from morning to night.",
    benefits: ["Seamless, blur-effect finish", "Buildable healthy colour", "No patchiness or fallout"],
    shades: [
      { name: "Peach Silk", hex: "#E6A98F" }, { name: "Rose Petal", hex: "#D58C8A" },
      { name: "Warm Berry", hex: "#A95F6A" }, { name: "Nude Bloom", hex: "#C68E7B" },
    ], rating: 4.8, reviewCount: 157,
  },
  {
    id: "p07", slug: "liquid-glow-highlighter", name: "Liquid Glow Highlighter",
    category: "Cheeks", price: 32, finish: "Shimmer", shadeFamily: "Champagne", skinType: ["All"],
    image: "/images/blush-product.jpg", secondImage: "/images/swatch-strip.jpg",
    description: "A weightless liquid highlight that gives skin a lit, glassy sheen — never glitter, never greasy.",
    benefits: ["Natural glass-skin glow", "Lightweight, skin-like feel", "Layers beautifully over makeup"],
    shades: [
      { name: "Champagne", hex: "#D9BE91" }, { name: "Rose Gold", hex: "#D6A292" }, { name: "Bronze Light", hex: "#A97655" },
    ], rating: 4.7, reviewCount: 98,
  },
  {
    id: "p08", slug: "second-skin-foundation", name: "Second Skin Foundation",
    category: "Face", price: 52, finish: "Satin", shadeFamily: "Nude & Bronze", skinType: ["All", "Dry", "Oily", "Combination"],
    badge: "Bestseller", image: "/images/complexion-product.jpg", secondImage: "/images/swatch-strip.jpg",
    description: "A skin-like, medium-to-full coverage foundation with a natural satin finish and 24 flexible shades for real skin tones.",
    benefits: ["24 inclusive shades", "Medium-to-full buildable coverage", "Natural satin, never flat"],
    shades: faceShades, rating: 4.9, reviewCount: 402,
  },
  {
    id: "p09", slug: "veil-setting-spray", name: "Veil Setting Spray",
    category: "Face", price: 30, finish: "Matte", shadeFamily: "Universal", skinType: ["All", "Oily", "Combination"],
    image: "/images/complexion-product.jpg", secondImage: "/images/collection-flatlay.jpg",
    description: "A fine-mist setting spray that locks makeup in place while keeping skin comfortable and fresh-looking.",
    benefits: ["Micro-fine, even mist", "16-hour wear test", "Alcohol-free formula"],
    shades: [{ name: "Universal", hex: "#E8D5C4" }], rating: 4.6, reviewCount: 121,
  },
  {
    id: "p10", slug: "luminous-tinted-moisturiser", name: "Luminous Tinted Moisturiser",
    category: "Face", price: 42, finish: "Satin", shadeFamily: "Nude & Bronze", skinType: ["All", "Dry", "Normal"],
    image: "/images/complexion-product.jpg", secondImage: "/images/hero-campaign.jpg",
    description: "Your-skin-but-better in a bottle: light coverage, hydrating ingredients and a soft luminous finish for everyday ease.",
    benefits: ["Hydrating hyaluronic complex", "Sheer, natural coverage", "SPF 20 daily protection"],
    shades: faceShades, rating: 4.7, reviewCount: 186,
  },
  {
    id: "p11", slug: "rose-veil-lip-oil", name: "Rose Veil Lip Oil",
    category: "Lips", price: 30, finish: "Gloss", shadeFamily: "Rose & Berry", skinType: ["All"],
    badge: "New", image: "/images/gloss-product.jpg", secondImage: "/images/swatch-strip.jpg",
    description: "A nourishing lip oil with a hint of rose tint, leaving lips glossy, soft and never sticky.",
    benefits: ["Nourishing oil blend", "Subtle everyday tint", "Non-sticky, cushiony feel"],
    shades: nudeShades, rating: 4.8, reviewCount: 67,
  },
  {
    id: "p12", slug: "the-velvet-lip-trio", name: "The Velvet Lip Trio",
    category: "Lips", price: 78, compareAt: 102, finish: "Matte", shadeFamily: "Nude & Rose", skinType: ["All"],
    badge: "Bestseller", image: "/images/collection-flatlay.jpg", secondImage: "/images/lipstick-product.jpg",
    description: "Three of our most-loved velvet matte shades in a signature ZAZZU gift box. A placeholder kit for the launch collection.",
    benefits: ["Three full-size lipsticks", "Save $24 on the set", "Gift-ready signature packaging"],
    shades: nudeShades, rating: 5.0, reviewCount: 203,
  },
];

export const categoryTiles = [
  { name: "Lips", count: "6 shades", image: "/images/lipstick-product.jpg", coming: "Coming October" },
  { name: "Eyes", count: "4 essentials", image: "/images/eye-palette.jpg", coming: "Coming November" },
  { name: "Face", count: "24 shades", image: "/images/complexion-product.jpg", coming: "Coming November" },
  { name: "Cheeks", count: "8 shades", image: "/images/blush-product.jpg", coming: "Coming December" },
] as const;

export const ugcImages = [
  "/images/hero-campaign.jpg", "/images/collection-flatlay.jpg", "/images/swatch-strip.jpg",
  "/images/lipstick-product.jpg", "/images/blush-product.jpg", "/images/eye-palette.jpg",
];

export const money = (value: number) => `$${value.toFixed(2)}`;
