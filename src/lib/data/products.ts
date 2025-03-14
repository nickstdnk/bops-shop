export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  weight?: string;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  isNew?: boolean;
  discount?: number;
  description?: string;
}

// Sample product data
const products: Product[] = [
  {
    id: '1',
    name: 'Хлеб Столичный',
    price: 55.90,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'bread',
    weight: '300 г',
    rating: 4.8,
    reviewCount: 124,
    brand: 'Хлебозавод №1',
    description: 'Классический столичный хлеб из пшеничной муки высшего сорта. Хрустящая корочка и мягкий мякиш.'
  },
  {
    id: '2',
    name: 'Батон нарезной классический',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'bread',
    weight: '350 г',
    rating: 4.6,
    reviewCount: 98,
    brand: 'Хлебозавод №1',
    description: 'Классический нарезной батон из пшеничной муки. Идеально подходит для бутербродов и тостов.'
  },
  {
    id: '3',
    name: 'Калач с изюмом',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1620921568790-c1cf8984624c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'bread',
    weight: '250 г',
    rating: 4.9,
    reviewCount: 56,
    brand: 'Gretta',
    isNew: true,
    description: 'Ароматный калач с добавлением отборного изюма. Отлично подходит к чаю или кофе.'
  },
  {
    id: '4',
    name: 'Хлеб American Sandwich белый',
    price: 129.90,
    oldPrice: 149.90,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'bread',
    weight: '470 г',
    rating: 4.5,
    reviewCount: 32,
    brand: 'Harry\'s',
    discount: 15,
    description: 'Мягкий белый хлеб для сэндвичей. Нарезанный, длительного хранения, идеален для тостов.'
  },
  {
    id: '5',
    name: 'Хлеб белый нарезной',
    price: 59.90,
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'bread',
    weight: '350 г',
    rating: 4.2,
    reviewCount: 87,
    brand: 'Хлебозавод №1',
    description: 'Классический белый хлеб из пшеничной муки высшего сорта в нарезке. Удобно для приготовления бутербродов.'
  },
  {
    id: '6',
    name: 'Хлеб Рижский',
    price: 79.90,
    image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'bread',
    weight: '300 г',
    rating: 4.7,
    reviewCount: 65,
    brand: 'Gretta',
    description: 'Традиционный ржаной хлеб по рижскому рецепту. Насыщенный вкус и аромат солода.'
  },
  {
    id: '7',
    name: 'Торт Красный бархат',
    price: 799.00,
    oldPrice: 899.00,
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1114&q=80',
    category: 'cakes',
    weight: '1 кг',
    rating: 4.9,
    reviewCount: 43,
    brand: 'Eat Me',
    discount: 10,
    description: 'Нежный красный бисквит с белым сливочным кремом. Украшен шоколадной крошкой.'
  },
  {
    id: '8',
    name: 'Торт Тирамису',
    price: 699.00,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1047&q=80',
    category: 'cakes',
    weight: '750 г',
    rating: 4.8,
    reviewCount: 57,
    brand: 'Eat Me',
    description: 'Классический итальянский десерт с нежным сыром маскарпоне, печеньем савоярди и кофейным пропитанием.'
  },
  {
    id: '9',
    name: 'Торт Шоколадный с вишней',
    price: 749.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80',
    category: 'cakes',
    weight: '850 г',
    rating: 4.7,
    reviewCount: 39,
    brand: 'Eat Me',
    description: 'Шоколадный бисквит с вишневым конфитюром и шоколадным кремом. Украшен шоколадной глазурью и свежей вишней.'
  },
  {
    id: '10',
    name: 'Печенье Eat Me овсяное с изюмом',
    price: 179.90,
    oldPrice: 219.90,
    image: 'https://images.unsplash.com/photo-1499636136210-6598fdd9d6ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    category: 'bakery',
    weight: '300 г',
    rating: 4.5,
    reviewCount: 28,
    brand: 'Eat Me',
    discount: 20,
    description: 'Хрустящее овсяное печенье с добавлением отборного изюма. Идеально к чаю или кофе.'
  },
  {
    id: '11',
    name: 'Торт Медовый с кремом',
    price: 649.00,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'cakes',
    weight: '800 г',
    rating: 4.6,
    reviewCount: 34,
    brand: 'Eat Me',
    description: 'Нежные медовые коржи с кремом из сливок и сгущенного молока. Классический рецепт.'
  },
  {
    id: '12',
    name: 'Торт Наполеон',
    price: 699.00,
    image: 'https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'cakes',
    weight: '900 г',
    rating: 4.8,
    reviewCount: 47,
    brand: 'Eat Me',
    description: 'Классический слоеный торт с нежным заварным кремом. Приготовлен по традиционному рецепту.'
  },
  {
    id: '13',
    name: 'Печенье Eat Me шоколадное',
    price: 199.90,
    image: 'https://images.unsplash.com/photo-1590080875852-ba44f83ff2db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    category: 'bakery',
    weight: '250 г',
    rating: 4.7,
    reviewCount: 31,
    brand: 'Eat Me',
    description: 'Шоколадное печенье с кусочками темного шоколада. Насыщенный шоколадный вкус и аромат.'
  },
  {
    id: '14',
    name: 'Молоко Фермерское 3.2%',
    price: 109.90,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    category: 'dairy',
    weight: '1 л',
    rating: 4.6,
    reviewCount: 75,
    brand: 'Ферма',
    description: 'Свежее фермерское молоко с натуральной жирностью 3.2%. Пастеризованное, без добавок.'
  },
  {
    id: '15',
    name: 'Сыр Российский 50%',
    price: 299.90,
    oldPrice: 349.90,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
    category: 'dairy',
    weight: '300 г',
    rating: 4.4,
    reviewCount: 53,
    brand: 'Сырный Дом',
    discount: 15,
    description: 'Классический российский сыр с умеренно выраженным сырным вкусом и ароматом. Жирность 50%.'
  }
];

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

// Get featured products (limited by count)
export function getFeaturedProducts(count: number = 8): Product[] {
  return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
}

// Get products with discount
export function getDiscountProducts(count: number = 6): Product[] {
  return products
    .filter(product => product.discount || product.oldPrice)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

// Get new products
export function getNewProducts(count: number = 6): Product[] {
  return products
    .filter(product => product.isNew)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

// Get all products
export function getAllProducts(): Product[] {
  return products;
}
