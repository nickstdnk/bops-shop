// Define the Category interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

// Sample category data
const categories: Category[] = [
  {
    id: '1',
    name: 'Хлеб, выпечка',
    slug: 'bread',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Свежий хлеб, ароматная выпечка и вкусная сдоба'
  },
  {
    id: '2',
    name: 'Молочное и сыр',
    slug: 'dairy',
    image: 'https://images.unsplash.com/photo-1628689469838-524a4a973b8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Молоко, сыр, йогурты, творог и другие молочные продукты'
  },
  {
    id: '3',
    name: 'Торты и пирожные',
    slug: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80',
    description: 'Свежие торты, пирожные и десерты на любой вкус'
  },
  {
    id: '4',
    name: 'Мясо и птица',
    slug: 'meat',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Свежее мясо, птица и полуфабрикаты'
  },
  {
    id: '5',
    name: 'Фрукты и ягоды',
    slug: 'fruits',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Свежие фрукты, ягоды и сухофрукты'
  },
  {
    id: '6',
    name: 'Овощи, грибы и зелень',
    slug: 'vegetables',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80',
    description: 'Свежие овощи, зелень, грибы'
  },
  {
    id: '7',
    name: 'Вода и напитки',
    slug: 'drinks',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Вода, соки, газированные напитки, энергетики'
  },
  {
    id: '8',
    name: 'Сладкое и снеки',
    slug: 'sweets',
    image: 'https://images.unsplash.com/photo-1581798459939-741b7e239cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Конфеты, шоколад, чипсы, сухарики, орехи'
  }
];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}

export function getFeaturedCategories(count: number = 8): Category[] {
  return categories.slice(0, count);
}
