export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
}

// All images use stable Unsplash photo IDs that reliably load
const IMG = {
  // Sneakers
  airmax: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  yeezy:  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
  nb:     "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
  jordan: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
  // Streetwear — genuinely different garments
 hoodie: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  cargo:  "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", // cargo/pants flat lay
  tee:    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", // white tee on model
  // Accessories
bag: "https://images.unsplash.com/photo-1584917865442-de89be144b87?w=600&q=80",
  bag2:   "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
};

export const products: Product[] = [
  {
    id: "1",
    name: "Air Max Pulse",
    brand: "Nike",
    price: 13999,
    originalPrice: 17999,
    rating: 4.8,
    reviews: 324,
    category: "Sneakers",
    colors: ["#FFFFFF", "#000000", "#7C5CFF"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    images: [IMG.airmax, IMG.yeezy, IMG.nb, IMG.jordan],
    description: "The Nike Air Max Pulse draws inspiration from the London music scene, bringing an underground touch to a street-ready silhouette. Rippled TPU details and exposed foam along the midsole give it a raw, avant-garde feel.",
    tags: ["bestseller", "new"],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    price: 24999,
    rating: 4.9,
    reviews: 512,
    category: "Sneakers",
    colors: ["#1a1a1a", "#F5F5DC", "#FF6B35"],
    sizes: ["7", "8", "8.5", "9", "10", "11"],
    images: [IMG.yeezy, IMG.airmax, IMG.nb, IMG.jordan],
    description: "Crafted with Primeknit+ and featuring the iconic Boost cushioning, the Yeezy 350 V2 remains the pinnacle of streetwear footwear. The sculpted profile and translucent stripe make it instantly recognizable.",
    tags: ["limited", "premium"],
    isFeatured: true,
    inStock: true,
  },
  {
    id: "3",
    name: "New Balance 990v6",
    brand: "New Balance",
    price: 18999,
    rating: 4.7,
    reviews: 189,
    category: "Sneakers",
    colors: ["#808080", "#FFFFFF", "#000000"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    images: [IMG.nb, IMG.airmax, IMG.yeezy, IMG.jordan],
    description: "The pinnacle of American craftsmanship. Made in USA with premium pigskin and mesh upper, the 990v6 combines decades of heritage with modern comfort technology for the discerning sneaker enthusiast.",
    tags: ["heritage", "premium"],
    isFeatured: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Jordan 1 Retro High OG",
    brand: "Jordan",
    price: 19999,
    originalPrice: 22999,
    rating: 4.9,
    reviews: 876,
    category: "Sneakers",
    colors: ["#CC0000", "#FFFFFF", "#000000"],
    sizes: ["8", "8.5", "9", "9.5", "10", "11"],
    images: [IMG.jordan, IMG.airmax, IMG.yeezy, IMG.nb],
    description: "The shoe that started a revolution. The Air Jordan 1 High OG carries the legacy of Michael Jordan's rookie season, with premium leather construction and the iconic Wings logo that changed sneaker culture forever.",
    tags: ["iconic", "limited"],
    isFeatured: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Fear of God Essentials Hoodie",
    brand: "FOG",
    price: 11999,
    rating: 4.6,
    reviews: 234,
    category: "Streetwear",
    colors: ["#F5F5DC", "#1a1a1a", "#808080"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [IMG.hoodie, IMG.cargo, IMG.tee, IMG.hoodie],
    description: "Jerry Lorenzo's vision of American sportswear elevated to luxury. The Essentials Hoodie features boxy silhouette, rubber logo patch, and heavyweight cotton fleece that drapes with intention.",
    tags: ["essentials", "premium"],
    isNew: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Off-White Cargo Pants",
    brand: "Off-White",
    price: 34999,
    rating: 4.5,
    reviews: 67,
    category: "Streetwear",
    colors: ["#000000", "#FFFFFF", "#556B2F"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [IMG.cargo, IMG.hoodie, IMG.tee, IMG.cargo],
    description: "Virgil Abloh's deconstructive approach to workwear. Industrial belt loops, signature zip-tie tag, and quotation mark branding recontextualize the utility cargo into high fashion statement.",
    tags: ["luxury", "designer"],
    inStock: true,
  },
  {
    id: "7",
    name: "Supreme Box Logo Tee",
    brand: "Supreme",
    price: 8999,
    originalPrice: 12999,
    rating: 4.4,
    reviews: 445,
    category: "Streetwear",
    colors: ["#CC0000", "#FFFFFF", "#000000", "#7C5CFF"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [IMG.tee, IMG.hoodie, IMG.cargo, IMG.tee],
    description: "The original streetwear staple. The Supreme Box Logo tee transcends fashion cycles — a Futura-set wordmark on heavyweight cotton that's been coveted since 1994.",
    tags: ["iconic", "drop"],
    inStock: true,
  },
  {
    id: "8",
    name: "Louis Vuitton Keepall",
    brand: "Louis Vuitton",
    price: 189999,
    rating: 5.0,
    reviews: 23,
    category: "Accessories",
    colors: ["#C4A882", "#000000"],
    sizes: ["45", "55", "60"],
    images: [IMG.bag, IMG.bag2, IMG.bag, IMG.bag2],
    description: "The ultimate travel companion since 1930. Hand-crafted from coated canvas with polished brass hardware, the Keepall remains the definitive statement of luxury travel.",
    tags: ["luxury", "iconic"],
    inStock: true,
  },
];

export const categories = [
  { id: "sneakers", name: "Sneakers", count: 124, image: IMG.airmax, description: "Premium footwear" },
  { id: "streetwear", name: "Streetwear", count: 89, image: IMG.cargo, description: "Urban culture" },
  { id: "accessories", name: "Accessories", count: 56, image: IMG.bag, description: "Complete the look" },
  { id: "limited", name: "Limited Drops", count: 12, image: IMG.jordan, description: "Exclusive releases" },
];

export const testimonials = [
  { id: "1", name: "Arjun Mehta", handle: "@arjunm", avatar: "", text: "AURA is the only place I trust for authentic drops. Wore my Yeezy 350s straight out of the box.", rating: 5, product: "Yeezy Boost 350 V2" },
  { id: "2", name: "Priya Sharma", handle: "@priyastyled", avatar: "", text: "The curation is impeccable. Got my FOG hoodie in 2 days — premium service matches the premium product.", rating: 5, product: "FOG Essentials Hoodie" },
  { id: "3", name: "Karan Bose", handle: "@karanbose", avatar: "", text: "Finally a sneaker store that understands design as well as it understands product.", rating: 5, product: "Jordan 1 Retro High OG" },
];