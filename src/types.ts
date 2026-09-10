export interface OpeningHourDay {
  dayName: string;
  dayShort: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  openTime: string;
  closeTime: string;
  isClosed?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string; // e.g. 'paes', 'confeitaria', 'salgados', 'cafes', 'almoco', 'sobremesas'
  price: number;
  description: string;
  fullDescription?: string;
  ingredients?: string[];
  image: string;
  badge?: string; // e.g. 'Mais Pedido', 'Artesanal', 'Especial', 'Novidade'
  isPopular?: boolean;
  preparationTime?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  iconName: string;
  description?: string;
}

export interface StorePhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface RestaurantConfig {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  foundingYear: number;
  storyTitle: string;
  storyText: string[];
  storyHighlights: { title: string; desc: string }[];
  
  // Contacts
  whatsappNumber: string; // digits only e.g. '557734842040'
  whatsappFormatted: string; // e.g. '(77) 3484-2040'
  phoneNumber: string; // e.g. '(77) 3484-2040'
  phoneTelLink: string; // e.g. 'tel:+557734842040'
  instagramHandle: string; // e.g. '@panificadoracostinha'
  instagramUrl: string;
  
  // Location
  address: {
    street: string; // 'Praça da Bandeira, 90'
    neighborhood: string; // 'Centro'
    city: string; // 'Santana'
    state: string; // 'BA'
    zipCode: string; // '47700-000'
    fullFormatted: string;
    googleMapsUrl: string;
    googleMapsEmbedQuery: string;
  };
  
  // Hours
  openingHours: OpeningHourDay[];
  
  // Branding & Photos
  logoText: string;
  logoSubtext: string;
  heroBadge: string;
  heroImages: string[];
  storyImages: string[];
  storePhotos?: StorePhoto[];
  instagramPhotos: { image: string; likes: number; comments: number; caption?: string }[];
  
  // Categories & Menu
  categories: MenuCategory[];
  products: MenuItem[];
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
  notes?: string;
}
