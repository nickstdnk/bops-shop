import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/ui/product-card';
import { getProductsByCategory } from '@/lib/data/products';

export default function BreadShowcasePage() {
  const breadProducts = getProductsByCategory('bread');

  // Group products by subcategories
  const freshBread = breadProducts.slice(0, 5);
  const bakeryItems = breadProducts.slice(5, 10);
  const sandwichBread = breadProducts.slice(0, 3); // Reuse some items
  const specialtyBread = breadProducts.slice(3, 7); // Reuse some items

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:underline">
          Главная
        </Link>{' '}
        &rsaquo;{' '}
        <span className="text-gray-600">
          Хлеб, выпечка и сдоба
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Хлеб, выпечка и сдоба</h1>
        <p className="text-gray-600">Всегда свежий хлеб, ароматная выпечка и вкусная сдоба от лучших производителей</p>
      </div>

      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden mb-10">
        <div className="w-full h-[300px] relative">
          <Image
            src="https://web-assets.same.dev/795368997/3758921510.png"
            alt="Акция на хлебобулочные изделия"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h2 className="text-white text-3xl font-bold mb-2">Свежий хлеб каждый день</h2>
          <p className="text-white text-lg">Скидки до 30% на хлебобулочные изделия</p>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="mb-10">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="#fresh-bread" className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-sm transition-all">
              <span className="text-sm font-medium text-center">Свежий хлеб</span>
            </Link>
            <Link href="#bakery" className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-sm transition-all">
              <span className="text-sm font-medium text-center">Выпечка</span>
            </Link>
            <Link href="#sandwich-bread" className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-sm transition-all">
              <span className="text-sm font-medium text-center">Хлеб для сэндвичей</span>
            </Link>
            <Link href="#specialty-bread" className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-sm transition-all">
              <span className="text-sm font-medium text-center">Специальный хлеб</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Fresh Bread Section */}
      <section id="fresh-bread" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Свежий хлеб</h2>
          <Link href="/category/bread?type=fresh" className="text-green-600 hover:underline">
            Показать все
          </Link>
        </div>
        <div className="product-grid">
          {freshBread.map((product) => (
            <ProductCard
              key={`fresh-${product.id}`}
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
      </section>

      {/* Bakery Section */}
      <section id="bakery" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Выпечка</h2>
          <Link href="/category/bread?type=bakery" className="text-green-600 hover:underline">
            Показать все
          </Link>
        </div>
        <div className="product-grid">
          {bakeryItems.map((product) => (
            <ProductCard
              key={`bakery-${product.id}`}
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
      </section>

      {/* Sandwich Bread Section */}
      <section id="sandwich-bread" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Хлеб для сэндвичей</h2>
          <Link href="/category/bread?type=sandwich" className="text-green-600 hover:underline">
            Показать все
          </Link>
        </div>
        <div className="product-grid">
          {sandwichBread.map((product) => (
            <ProductCard
              key={`sandwich-${product.id}`}
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
      </section>

      {/* Specialty Bread Section */}
      <section id="specialty-bread" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Специальный хлеб</h2>
          <Link href="/category/bread?type=specialty" className="text-green-600 hover:underline">
            Показать все
          </Link>
        </div>
        <div className="product-grid">
          {specialtyBread.map((product) => (
            <ProductCard
              key={`specialty-${product.id}`}
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
      </section>

      {/* Baking Tips */}
      <section className="mb-12">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Полезные советы по хранению хлеба</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Как дольше сохранить хлеб свежим?</h3>
              <p className="text-gray-600">
                Храните хлеб в бумажном пакете в прохладном месте. Не используйте пластиковые пакеты,
                так как они задерживают влагу и способствуют развитию плесени. Для длительного хранения
                хлеб можно заморозить, предварительно нарезав его на ломтики.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Как освежить черствый хлеб?</h3>
              <p className="text-gray-600">
                Сбрызните черствый хлеб водой и подогрейте в духовке при температуре 180°C в течение 5-10 минут.
                Также можно использовать микроволновую печь: положите хлеб на влажное бумажное полотенце
                и разогрейте на средней мощности в течение 10-15 секунд.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
