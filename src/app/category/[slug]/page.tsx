import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ui/product-card';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { getProductsByCategory } from '@/lib/data/products';
import { getCategoryBySlug } from '@/lib/data/categories';

export default function CategoryPage({
  params
}: {
  params: { slug: string }
}) {
  // Safe access to params
  const slug = params?.slug || '';
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  // Mock filter data
  const filterGroups = [
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
      id: 'weight',
      name: 'Вес',
      options: [
        { id: 'weight-1', name: 'до 250 г', count: 12 },
        { id: 'weight-2', name: '250-500 г', count: 8 },
        { id: 'weight-3', name: '500-1000 г', count: 6 },
        { id: 'weight-4', name: 'более 1 кг', count: 3 },
      ],
    },
    {
      id: 'availability',
      name: 'Наличие',
      options: [
        { id: 'availability-1', name: 'В наличии', count: 25 },
        { id: 'availability-2', name: 'Под заказ', count: 4 },
      ],
    },
  ];

  // Find min and max price in products
  const prices = products.map(product => product.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:underline">
          Главная
        </Link>{' '}
        &rsaquo;{' '}
        <span className="text-gray-600">
          {category.name}
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">{category.name}</h1>
        <p className="text-gray-600">Всего товаров: {products.length}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            filters={filterGroups}
          />
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4">
          {/* Sort Options */}
          <div className="mb-6 flex flex-wrap items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Сортировать по:</span>
              <select className="rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm">
                <option>Популярности</option>
                <option>Цене (по возрастанию)</option>
                <option>Цене (по убыванию)</option>
                <option>Рейтингу</option>
                <option>Новизне</option>
              </select>
            </div>

            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-sm text-gray-500">Показать:</span>
              <select className="ml-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm w-16">
                <option>20</option>
                <option>40</option>
                <option>60</option>
                <option>100</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
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
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">В данной категории пока нет товаров</p>
            </div>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-1">
                <button className="p-2 border border-gray-300 rounded-md disabled:opacity-50">
                  &laquo;
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md bg-green-600 text-white">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  3
                </button>
                <span className="px-3 py-2">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  10
                </button>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
