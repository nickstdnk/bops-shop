import { ProductCard } from "@/components/ui/product-card";
import { CategoryCard } from "@/components/ui/category-card";
import { PromoBanner } from "@/components/ui/promo-banner";
import { getFeaturedProducts, getNewProducts, getDiscountProducts } from "@/lib/data/products";
import { getFeaturedCategories } from "@/lib/data/categories";
import { getMainPromo, getSecondaryPromos } from "@/lib/data/promos";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts(8);
  const discountProducts = getDiscountProducts(8);
  const categories = getFeaturedCategories(6); // Limiting to 6 categories to match grid
  const mainPromo = getMainPromo();
  const secondaryPromos = getSecondaryPromos();

  return (
    <div className="container-custom py-8">
      {/* Main Promo Banner */}
      <div className="mb-10">
        <PromoBanner
          image={mainPromo.image}
          title={mainPromo.title}
          subtitle={mainPromo.subtitle}
          className="h-[400px]"
        />
      </div>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Категории</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              image={category.image}
              name={category.name}
              slug={category.slug}
            />
          ))}
        </div>
      </section>

      {/* Secondary Promos */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secondaryPromos.map((promo, index) => (
            <PromoBanner
              key={index}
              image={promo.image}
              title={promo.title}
              subtitle={promo.subtitle}
              className="h-[200px]"
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Популярные товары</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
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
      </section>

      {/* New Products */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Новинки</h2>
        <div className="product-grid">
          {newProducts.map((product) => (
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
      </section>

      {/* Discount Products */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Акции</h2>
        <div className="product-grid">
          {discountProducts.map((product) => (
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
      </section>
    </div>
  );
}
