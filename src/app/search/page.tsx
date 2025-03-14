"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/product-card';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { getAllProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [products, setProducts] = useState<ReturnType<typeof getAllProducts>>([]);
  const [filteredProducts, setFilteredProducts] = useState<ReturnType<typeof getAllProducts>>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allProducts = getAllProducts();

  // Filter products based on search query
  useEffect(() => {
    if (!query) {
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(query.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
    );

    setProducts(filtered);
    setFilteredProducts(filtered);
  }, [query, allProducts]);

  // Mock filter data
  const filterGroups = [
    {
      id: 'category',
      name: 'Категория',
      options: [
        { id: 'category-bread', name: 'Хлеб и выпечка', count: 12 },
        { id: 'category-dairy', name: 'Молочные продукты', count: 8 },
        { id: 'category-meat', name: 'Мясо и птица', count: 5 },
        { id: 'category-fruits', name: 'Фрукты и овощи', count: 10 },
      ],
    },
    {
      id: 'brand',
      name: 'Бренд',
      options: [
        { id: 'brand-1', name: 'Gretta', count: 5 },
        { id: 'brand-2', name: 'Eat Me', count: 8 },
        { id: 'brand-3', name: 'Harry\'s', count: 3 },
        { id: 'brand-4', name: 'BakerStat', count: 2 },
      ],
    },
    {
      id: 'price',
      name: 'Цена',
      options: [
        { id: 'price-1', name: 'До 100 руб.', count: 15 },
        { id: 'price-2', name: '100-300 руб.', count: 20 },
        { id: 'price-3', name: '300-500 руб.', count: 10 },
        { id: 'price-4', name: 'Более 500 руб.', count: 5 },
      ],
    },
  ];

  // Find min and max price in products
  const prices = products.map(product => product.price);
  const minPrice = Math.floor(Math.min(...(prices.length ? prices : [0])));
  const maxPrice = Math.ceil(Math.max(...(prices.length ? prices : [100])));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setProducts(filtered);
    setFilteredProducts(filtered);
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:underline">
          Главная
        </Link>{' '}
        &rsaquo;{' '}
        <span className="text-gray-600">
          Поиск
        </span>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Input
            type="search"
            placeholder="Поиск товаров"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="h-12 pl-12 pr-4 text-lg border-gray-300"
          />
          <SearchIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          <Button
            type="submit"
            className="absolute right-1 top-1 h-10"
          >
            Найти
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          {query ? (
            <>Результаты поиска: <span className="text-green-600">«{query}»</span></>
          ) : (
            'Все товары'
          )}
        </h1>

        <Button
          variant="outline"
          className="md:hidden flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Фильтры
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">По запросу «{query}» ничего не найдено</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Попробуйте изменить запрос или просмотреть товары по категориям
          </p>
          <Button asChild className="btn-primary">
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className={`md:w-1/4 md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="md:hidden flex justify-between items-center mb-4">
              <h2 className="font-semibold">Фильтры</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterSidebar
              minPrice={minPrice}
              maxPrice={maxPrice}
              filters={filterGroups}
            />
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4">
            {/* Results Count */}
            <p className="text-gray-600 mb-4">Найдено товаров: {filteredProducts.length}</p>

            {/* Products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  weight={product.weight}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  brand={product.brand}
                  isNew={product.isNew}
                  discount={product.discount}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-8">
        <div className="text-center py-12">
          <p>Загрузка результатов поиска...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
