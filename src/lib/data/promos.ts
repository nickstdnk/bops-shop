export interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
}

// Sample promo data
const promos: Promo[] = [
  {
    id: '1',
    title: 'Доставка продуктов за 15 минут',
    subtitle: 'Более 5000 товаров в каталоге',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/'
  },
  {
    id: '2',
    title: 'Скидки на выпечку до 35%',
    subtitle: 'Специальное предложение',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/category/bread'
  },
  {
    id: '3',
    title: 'Масленица: готовим блины',
    subtitle: 'Все ингредиенты со скидкой',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/category/grocery'
  },
  {
    id: '4',
    title: 'Бесплатная доставка на первый заказ',
    subtitle: 'При сумме заказа от 1000 руб.',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/category/new'
  }
];

export function getMainPromo(): Promo {
  return promos[0];
}

export function getSecondaryPromos(count: number = 3): Promo[] {
  return promos.slice(1, count + 1);
}
