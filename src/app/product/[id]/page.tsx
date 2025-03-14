"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Minus, Plus, Share2, ChevronRight, Truck, ArrowLeft, Info, ShoppingBag, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ui/product-card';
import { getProductById, getFeaturedProducts } from '@/lib/data/products';
import { useCart } from '@/lib/context/cart-context';
import { cn } from '@/lib/utils';

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const product = getProductById(params.id);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const relatedProducts = getFeaturedProducts(4); // Get some related products

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="mb-8">
          <span className="inline-block bg-gray-100 p-6 rounded-full">
            <Info className="h-12 w-12 text-gray-400" />
          </span>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Товар не найден</h1>
        <p className="text-gray-600 mb-8">К сожалению, запрашиваемый товар не существует или был удален.</p>
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 text-white rounded-full"
        >
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Вернуться на главную</Link>
        </Button>
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  };

  const calculateDiscount = () => {
    if (product.oldPrice) {
      const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
      return `-${discount}%`;
    }
    return '';
  };

  const discount = calculateDiscount();

  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6 text-gray-500">
        <Link href="/" className="hover:text-green-600">Главная</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/category/${product.category}`} className="hover:text-green-600">
          {product.category === 'bread' ? 'Хлеб и выпечка' :
           product.category === 'dairy' ? 'Молочное и сыр' :
           product.category === 'cakes' ? 'Торты и пирожные' : 'Категория'}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Image */}
        <div className="lg:w-2/5">
          <div className="bg-white rounded-lg overflow-hidden border border-gray-100 relative">
            {discount && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 z-10">
                {discount}
              </Badge>
            )}
            {product.isNew && (
              <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 z-10">
                Новинка
              </Badge>
            )}
            <div className="aspect-square relative p-8">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Action buttons below image (mobile only) */}
          <div className="flex items-center justify-between mt-4 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full border-gray-200",
                isFavorite && "text-red-500 border-red-200 bg-red-50"
              )}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-3/5">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

          {/* Rating & SKU */}
          <div className="flex items-center gap-4 mb-4">
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                {product.reviewCount && (
                  <span className="text-sm text-gray-400">({product.reviewCount})</span>
                )}
              </div>
            )}
            <div className="text-sm text-gray-500">
              Артикул: {product.id.substring(0, 8)}
            </div>
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Бренд:</span>
              <Link href={`/brand/${product.brand}`} className="text-sm text-green-600 hover:underline">
                {product.brand}
              </Link>
            </div>
          )}

          {/* Weight & Features */}
          <div className="flex flex-wrap gap-4 mb-6">
            {product.weight && (
              <Badge variant="outline" className="rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100">
                {product.weight}
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-bold">{product.price.toFixed(2)} ₽</span>
            {product.oldPrice && (
              <span className="text-xl line-through text-gray-400">{product.oldPrice.toFixed(2)} ₽</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-gray-700 mb-6">{product.description}</p>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              className="gap-2 py-6 px-8 bg-green-600 hover:bg-green-700 text-white rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5" />
              В корзину
            </Button>

            {/* Action buttons (desktop only) */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full border-gray-200",
                  isFavorite && "text-red-500 border-red-200 bg-red-50"
                )}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3 mb-6">
            <Truck className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Доставка</p>
              <p className="text-sm text-gray-600">От 15 минут, бесплатно от 1000 ₽</p>
            </div>
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-2 text-green-600">
            <Check className="h-4 w-4" />
            <span className="text-sm">В наличии</span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="w-full border-b border-gray-200 pb-0">
          <TabsTrigger
            value="details"
            className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-600 rounded-none py-3"
          >
            Описание
          </TabsTrigger>
          <TabsTrigger
            value="nutrition"
            className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-600 rounded-none py-3"
          >
            Пищевая ценность
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-600 rounded-none py-3"
          >
            Отзывы {product.reviewCount ? `(${product.reviewCount})` : ''}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Описание</h3>
              <p className="text-gray-700">
                {product.description || 'Подробное описание товара отсутствует.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Состав</h3>
              <p className="text-gray-700">
                Состав: мука пшеничная высшего сорта, вода, соль, сахар, дрожжи.
                Может содержать следы орехов и кунжута.
              </p>

              <h3 className="font-semibold mt-6 mb-4">Условия хранения</h3>
              <p className="text-gray-700">
                Хранить при температуре не выше +25°С в сухом месте.
                Срок годности: 5 суток.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="pt-6">
          <h3 className="font-semibold mb-4">Пищевая ценность на 100 г</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Калории</p>
              <p className="font-semibold">235 ккал</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Белки</p>
              <p className="font-semibold">7.5 г</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Жиры</p>
              <p className="font-semibold">1.0 г</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Углеводы</p>
              <p className="font-semibold">46.7 г</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="pt-6">
          {product.reviewCount ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-full">
                  <Star className="h-6 w-6 fill-green-600 text-green-600" />
                </div>

                <div>
                  <p className="font-semibold text-xl">{product.rating}/5</p>
                  <p className="text-gray-500">{product.reviewCount} отзывов</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < (product.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="font-medium">Анна В.</p>
                    <p className="text-sm text-gray-500">12 марта 2024</p>
                  </div>
                  <p className="text-gray-700">Очень вкусный и свежий продукт! Доставили быстро, качество отличное.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < 5
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="font-medium">Михаил Д.</p>
                    <p className="text-sm text-gray-500">28 февраля 2024</p>
                  </div>
                  <p className="text-gray-700">Потрясающе! Всей семье понравилось. Обязательно будем заказывать еще.</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 rounded-full"
              >
                Показать все отзывы
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">У этого товара пока нет отзывов</p>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 rounded-full"
              >
                Оставить отзыв
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Похожие товары</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              id={relatedProduct.id}
              name={relatedProduct.name}
              price={relatedProduct.price}
              oldPrice={relatedProduct.oldPrice}
              image={relatedProduct.image}
              weight={relatedProduct.weight}
              rating={relatedProduct.rating}
              reviewCount={relatedProduct.reviewCount}
              brand={relatedProduct.brand}
              isNew={relatedProduct.isNew}
              discount={relatedProduct.discount}
            />
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Вы недавно смотрели</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.slice(0, 4).reverse().map((recentProduct) => (
            <ProductCard
              key={recentProduct.id}
              id={recentProduct.id}
              name={recentProduct.name}
              price={recentProduct.price}
              oldPrice={recentProduct.oldPrice}
              image={recentProduct.image}
              weight={recentProduct.weight}
              rating={recentProduct.rating}
              reviewCount={recentProduct.reviewCount}
              brand={recentProduct.brand}
              isNew={recentProduct.isNew}
              discount={recentProduct.discount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
