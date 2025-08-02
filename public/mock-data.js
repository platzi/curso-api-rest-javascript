// Datos mockeados basados en la estructura real de la API de Platzi
// https://api.escuelajs.co/api/v1/

const MOCK_CATEGORIES = [
  {
    id: 10,
    name: "Clothes",
    slug: "clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg"
  },
  {
    id: 11,
    name: "Electronics", 
    slug: "electronics",
    image: "https://i.imgur.com/ZANVnHE.jpeg"
  },
  {
    id: 12,
    name: "Furniture",
    slug: "furniture", 
    image: "https://i.imgur.com/Qphac99.jpeg"
  },
  {
    id: 13,
    name: "Shoes",
    slug: "shoes",
    image: "https://i.imgur.com/qNOjJje.jpeg"
  }
];

const MOCK_PRODUCTS = [
  {
    id: 84,
    title: "Classic Red Jogger Sweatpants",
    slug: "classic-red-jogger-sweatpants", 
    price: 98,
    description: "Experience ultimate comfort with our red jogger sweatpants, perfect for both workout sessions and lounging around the house. Made with soft, durable fabric, these joggers feature a snug waistband, adjustable drawstring, and practical side pockets for functionality.",
    category: MOCK_CATEGORIES[0],
    images: ["https://i.imgur.com/9LFjwpI.jpeg"]
  },
  {
    id: 86,
    title: "Classic Blue Baseball Cap",
    slug: "classic-blue-baseball-cap",
    price: 86, 
    description: "Top off your casual look with our Classic Blue Baseball Cap, made from high-quality materials for lasting comfort. Featuring a timeless six-panel design with a pre-curved visor, this adjustable cap offers both style and practicality for everyday wear.",
    category: MOCK_CATEGORIES[0],
    images: ["https://i.imgur.com/wXuQ7bm.jpeg"]
  },
  {
    id: 87,
    title: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",  
    price: 129,
    description: "Immerse yourself in crystal-clear sound with these premium wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for all-day listening.",
    category: MOCK_CATEGORIES[1],
    images: ["https://i.imgur.com/ZANVnHE.jpeg"]
  },
  {
    id: 88,
    title: "Modern Office Chair",
    slug: "modern-office-chair",
    price: 245,
    description: "Upgrade your workspace with this ergonomic office chair designed for maximum comfort and productivity. Features lumbar support, adjustable height, and breathable mesh back for long working hours.",
    category: MOCK_CATEGORIES[2], 
    images: ["https://i.imgur.com/Qphac99.jpeg"]
  },
  {
    id: 89,
    title: "Running Sneakers Pro",
    slug: "running-sneakers-pro",
    price: 156,
    description: "Step up your running game with these professional-grade sneakers. Featuring advanced cushioning technology, breathable mesh upper, and durable rubber outsole for optimal performance on any terrain.",
    category: MOCK_CATEGORIES[3],
    images: ["https://i.imgur.com/qNOjJje.jpeg"]
  },
  {
    id: 90,
    title: "Smartphone 5G Ultra",
    slug: "smartphone-5g-ultra", 
    price: 899,
    description: "Experience the future with this cutting-edge 5G smartphone. Features a stunning 6.7-inch OLED display, professional-grade camera system, and lightning-fast processor for seamless performance.",
    category: MOCK_CATEGORIES[1],
    images: ["https://i.imgur.com/ZANVnHE.jpeg"]
  }
];

// Estados de UI para demonstrar diferentes casos
const UI_STATES = {
  IDLE: 'idle',
  LOADING: 'loading', 
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty'
};

// Mensajes mock para diferentes operaciones
const MOCK_MESSAGES = {
  create: {
    success: '✅ Producto creado exitosamente',
    error: '❌ Error al crear el producto'
  },
  update: {
    success: '✅ Producto actualizado exitosamente', 
    error: '❌ Error al actualizar el producto'
  },
  delete: {
    success: '✅ Producto eliminado exitosamente',
    error: '❌ Error al eliminar el producto'
  }
};