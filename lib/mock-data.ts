import type {
  Product, Category, Coupon, ShippingMethod, Drop, Order, Review, ProductColor, Variant,
} from './types'

export const BRANDS = [
  'JORDAN', 'NIKE', 'NEW ERA',
]

export const CATEGORIES: Category[] = [
  { id: 'sneakers', name: 'Tenis', count: 1 },
  { id: 'streetwear', name: 'Ropa urbana', count: 1 },
  { id: 'caps', name: 'Gorras', count: 6 },
]

export const stripeImg = (label: string, h1: string, h2: string, accent?: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 750' preserveAspectRatio='xMidYMid slice'>
    <defs>
      <pattern id='p' width='14' height='14' patternUnits='userSpaceOnUse' patternTransform='rotate(35)'>
        <rect width='14' height='14' fill='${h1}'/>
        <rect width='7' height='14' fill='${h2}'/>
      </pattern>
    </defs>
    <rect width='600' height='750' fill='url(#p)'/>
    <rect x='40' y='620' width='${20 + label.length * 9}' height='32' fill='#0a0a0a'/>
    <text x='52' y='642' font-family='ui-monospace, Menlo, monospace' font-size='13' fill='${accent || '#ffffff'}' letter-spacing='1.5'>${label}</text>
  </svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

const SIZES_SNEAKER = ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12']
const SIZES_APPAREL = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const SIZES_CAP = ['Talla única']

const mkVariants = (sizes: string[], colors: ProductColor[], baseStock = 8): Variant[] => {
  const out: Variant[] = []
  sizes.forEach((s, i) => {
    colors.forEach((c) => {
      const stock = (i % 7 === 0) ? 0 : (i % 5 === 0 ? 2 : (i % 3 === 0 ? baseStock + 6 : baseStock))
      out.push({ size: s, color: c.name, colorHex: c.hex, stock, priceDelta: 0 })
    })
  })
  return out
}

type ProductSeed =
  Omit<Product, 'variants' | 'totalStock' | 'lowStock' | 'soldOut' | 'featured' | 'isNew' | 'limited' | 'privateDrop'>
  & Partial<Pick<Product, 'featured' | 'isNew' | 'limited' | 'privateDrop'>>

const SEED: ProductSeed[] = [
  {
    id: 'p17', sku: 'KL-AJ1L-OLV', name: 'Air Jordan 1 Low OG SP Travis Scott "Olive"', brand: 'JORDAN',
    category: 'sneakers', price: 1450, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: ['LIMITADO', 'VERIFICADO'], featured: true, limited: true,
    images: ['/images/products/aj1-low-travis.jpg', '/images/products/aj1-low-travis-alt.avif'],
    sizes: SIZES_SNEAKER, colors: [{ name: 'Oliva', hex: '#4a4a2e' }, { name: 'Vela', hex: '#ece5d8' }],
    rating: 4.9, reviews: 204,
    desc: 'Cuero y gamuza en oliva con swoosh invertido cosido al revés. Bolsillo oculto en la lengüeta y suela de goma envejecida de fábrica.',
  },
  {
    id: 'p18', sku: 'KL-FCB-CJ', name: 'Jersey FC Barcelona x Cactus Jack', brand: 'NIKE',
    category: 'streetwear', price: 320, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: ['LIMITADO', 'VERIFICADO'], featured: true, limited: true,
    images: ['/images/products/travis-x-barca.webp', '/images/products/travis-x-barca-2.webp'],
    sizes: SIZES_APPAREL, colors: [{ name: 'Blaugrana', hex: '#a50044' }, { name: 'Azul', hex: '#004d98' }],
    rating: 4.8, reviews: 96,
    desc: 'Jersey de partido en poliéster reciclado con tecnología Dri-FIT. Escudo bordado y marca Cactus Jack en el frente.',
  },
  {
    id: 'p19', sku: 'KL-NE-BULLS', name: 'Gorra Chicago Bulls 9FIFTY', brand: 'NEW ERA',
    category: 'caps', price: 45, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: [],
    images: ['/images/products/bulls-cap.webp'],
    sizes: SIZES_CAP, colors: [{ name: 'Negro', hex: '#0a0a0a' }],
    rating: 4.6, reviews: 87,
    desc: 'Snapback de 6 paneles en poliéster estructurado. Visera plana y logo del equipo bordado en alto relieve.',
  },
  {
    id: 'p20', sku: 'KL-NE-NYY', name: 'Gorra New York Yankees Corduroy 9FORTY', brand: 'NEW ERA',
    category: 'caps', price: 55, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: ['NUEVO'], isNew: true,
    images: ['/images/products/yankees-cap.webp'],
    sizes: SIZES_CAP, colors: [{ name: 'Camel', hex: '#c9a882' }],
    rating: 4.7, reviews: 54,
    desc: 'Pana de canal fino sobre corona sin estructura. Visera curva y cierre trasero de correa metálica.',
  },
  {
    id: 'p21', sku: 'KL-NE-LAL', name: 'Gorra Los Angeles Lakers 59FIFTY', brand: 'NEW ERA',
    category: 'caps', price: 50, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: [],
    images: ['/images/products/lakers-cap.webp'],
    sizes: SIZES_CAP, colors: [{ name: 'Negro', hex: '#0a0a0a' }, { name: 'Morado', hex: '#552583' }],
    rating: 4.5, reviews: 62,
    desc: 'Corte cerrado en lana mezclada con corona estructurada. Sudadera interior de poliéster y visera plana.',
  },
  {
    id: 'p22', sku: 'KL-NE-FCB', name: 'Gorra FC Barcelona 9FORTY', brand: 'NEW ERA',
    category: 'caps', price: 42, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: [],
    images: ['/images/products/barca-cap.webp'],
    sizes: SIZES_CAP, colors: [{ name: 'Piedra', hex: '#ddd8cc' }, { name: 'Marino', hex: '#1b2340' }],
    rating: 4.4, reviews: 38,
    desc: 'Sarga de algodón sin estructura con visera precurvada. Escudo del club bordado y correa ajustable con hebilla.',
  },
  {
    id: 'p23', sku: 'KL-NE-CFC', name: 'Gorra Chelsea FC 59FIFTY', brand: 'NEW ERA',
    category: 'caps', price: 48, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: [],
    images: ['/images/products/chelsea-cap.webp'],
    sizes: SIZES_CAP, colors: [{ name: 'Azul Royal', hex: '#034694' }],
    rating: 4.5, reviews: 41,
    desc: 'Corona estructurada de 6 paneles en poliéster. Visera plana, ojales bordados y escudo del club en relieve.',
  },
  {
    id: 'p24', sku: 'KL-NE-CFC-TR', name: 'Gorra Chelsea FC Trucker A-Frame', brand: 'NEW ERA',
    category: 'caps', price: 40, condition: 'NEW', auth: 'AUTHENTICATED',
    badges: ['POCO STOCK'],
    images: ['/images/products/chelsea-cap-2.jpeg'],
    sizes: SIZES_CAP, colors: [{ name: 'Negro', hex: '#0a0a0a' }],
    rating: 4.3, reviews: 19,
    desc: 'Frente A-Frame en sarga con paneles traseros de malla. Cierre snapback y parche del club aplicado al frente.',
  },
]

export const PRODUCTS: Product[] = SEED.map((p) => {
  const sizes = p.category === 'sneakers' ? SIZES_SNEAKER
    : (p.category === 'caps' || p.category === 'accessories') ? SIZES_CAP
      : SIZES_APPAREL
  const variants = mkVariants(sizes, p.colors)
  const totalStock = variants.reduce((s, v) => s + v.stock, 0)
  return {
    featured: false, isNew: false, limited: false, privateDrop: false,
    ...p,
    variants,
    totalStock,
    lowStock: variants.filter((v) => v.stock > 0 && v.stock <= 3).length,
    soldOut: totalStock === 0,
  }
})

export const COUPONS: Coupon[] = [
  { code: 'KLAB10', label: '10% de descuento', type: 'PERCENT', value: 10, active: true, uses: 142, max: 500 },
  { code: 'VAULT25', label: '$25 de descuento', type: 'FIXED', value: 25, active: true, uses: 33, max: 200 },
  { code: 'ENVIOGRATIS', label: 'Envío gratis', type: 'SHIPPING', value: 0, active: true, uses: 211, max: 1000 },
  { code: 'BOGO-LAB', label: '2x1 en accesorios', type: 'BOGO', value: 0, active: false, uses: 18, max: 100 },
]

export const SHIPPING: ShippingMethod[] = [
  { id: 'standard', name: 'Entrega estándar', fee: 8, eta: '5–8 días' },
  { id: 'express', name: 'Entrega exprés', fee: 22, eta: '2–3 días' },
  { id: 'national', name: 'Entrega nacional', fee: 14, eta: '3–5 días' },
  { id: 'pickup', name: 'Recoger en tienda', fee: 0, eta: 'Mismo día' },
]


export const ORDERS: Order[] = [
  { id: 'KL-24102', status: 'DELIVERED', date: '14 may 2026', total: 412, items: 2, tracking: 'DHL-882-114-002' },
  { id: 'KL-24138', status: 'SHIPPED', date: '22 may 2026', total: 240, items: 1, tracking: 'DHL-882-114-138' },
  { id: 'KL-24199', status: 'PREPARING', date: '26 may 2026', total: 595, items: 3, tracking: '—' },
]

export const REVIEWS: Review[] = [
  {
    id: 'review-1',
    productId: 'p17',
    productName: 'Air Jordan 1 Low OG SP Travis Scott "Olive"',
    userId: 'mock-user-1',
    userFirstName: 'MARCO',
    userLastName: 'V.',
    rating: 5,
    body: 'La calidad de construcción es increíble. El par más limpio que he recibido en años. La etiqueta del laboratorio confirmó el serial.',
    isVerifiedPurchase: true,
    createdAt: '2026-05-14T12:00:00Z',
  },
  {
    id: 'review-2',
    productId: 'p17',
    productName: 'Air Jordan 1 Low OG SP Travis Scott "Olive"',
    userId: 'mock-user-2',
    userFirstName: 'K.',
    userLastName: 'R.',
    rating: 5,
    body: 'Valió la espera. La caja venía sellada, el papel intacto. Talla fiel a US 9. El laboratorio sabe.',
    isVerifiedPurchase: true,
    createdAt: '2026-05-10T12:00:00Z',
  },
  {
    id: 'review-3',
    productId: 'p17',
    productName: 'Air Jordan 1 Low OG SP Travis Scott "Olive"',
    userId: 'mock-user-3',
    userFirstName: 'DANI',
    userLastName: 'L.',
    rating: 4,
    body: 'Gran par. El color salió un poco más oscuro de lo que esperaba en las fotos, pero me encantan.',
    isVerifiedPurchase: true,
    createdAt: '2026-04-28T12:00:00Z',
  },
]

export const DROPS: Drop[] = [
  {
    id: 'd01', title: 'Barça x Cactus Jack', date: '14 AGO · 18:00', rawDate: '2026-08-14T18:00:00',
    units: 120, type: 'PÚBLICO', img: '/hero/barca-cactus.png',
  },
  {
    id: 'd02', title: 'Air Jordan 1 Low OG SP Travis Scott', date: '28 AGO · 20:00', rawDate: '2026-08-28T20:00:00',
    units: 40, type: 'DROP PRIVADO', img: '/images/products/aj1-low-travis.jpg',
  },
  {
    id: 'd03', title: 'New Era Club Series', date: '5 SEP · 17:30', rawDate: '2026-09-05T17:30:00',
    units: 200, type: 'PÚBLICO', img: '/hero/gorras.png',
  },
  {
    id: 'd04', title: 'Yankees Corduroy Capsule', date: '10 JUL · 19:00', rawDate: '2026-07-10T19:00:00',
    units: 75, type: 'PÚBLICO', img: '/images/products/yankees-cap.webp',
  },
  {
    id: 'd05', title: 'Chelsea FC Vault', date: '21 JUN · 21:00', rawDate: '2026-06-21T21:00:00',
    units: 30, type: 'DROP PRIVADO', img: '/images/products/chelsea-cap.webp',
  },
]
