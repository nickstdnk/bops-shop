"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Plus, MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/context/cart-context';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  weight?: string;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  isNew?: boolean;
  discount?: number;
  size?: 'default' | 'small';
}

export function ProductCard({
  id,
  name,
  price,
  oldPrice,
  image,
  weight,
  rating,
  reviewCount,
  brand,
  isNew,
  discount,
  size = 'default'
}: ProductCardProps) {
  const { addToCart, items, updateItemQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if product is already in cart
  const cartItem = items.find(item => item.id === id);

  const calculateDiscount = () => {
    if (discount) {
      return `-${discount}%`;
    }
    if (oldPrice) {
      const discountValue = Math.round(((oldPrice - price) / oldPrice) * 100);
      return `-${discountValue}%`;
    }
    return '';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateItemQuantity(id, cartItem.quantity + 1);
    }
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem && cartItem.quantity > 1) {
      updateItemQuantity(id, cartItem.quantity - 1);
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const discountText = calculateDiscount();
  const isSmall = size === 'small';

  return (
    <Link
      href={`/product/${id}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative">
          {(isNew || discountText) && (
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              {isNew && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  Новинка
                </Badge>
              )}
              {discountText && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  {discountText}
                </Badge>
              )}
            </div>
          )}

          {/* Favorite Button - Only show on hover or if favorite */}
          <button
            onClick={toggleFavorite}
            className={cn(
              "absolute top-2 right-2 z-10 rounded-full p-1.5 bg-white shadow-sm border border-gray-100 transition-opacity",
              (isHovered || isFavorite) ? "opacity-100" : "opacity-0",
              isFavorite && "text-red-500"
            )}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </button>

          <div className={cn(
            "relative aspect-square bg-gray-50 p-4 transition-transform duration-300 overflow-hidden",
            isHovered && "scale-[1.03]"
          )}>
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 flex-1 flex flex-col">
          <div className="flex-1">
            {brand && (
              <p className="text-xs text-gray-500 mb-1">{brand}</p>
            )}

            <h3 className="text-sm font-medium line-clamp-2 mb-1 group-hover:text-green-600 transition-colors">
              {name}
            </h3>

            {weight && (
              <p className="text-xs text-gray-500 mb-2">{weight}</p>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="font-semibold">{price.toFixed(2)} ₽</p>
                {oldPrice && (
                  <p className="text-xs text-gray-500 line-through">
                    {oldPrice.toFixed(2)} ₽
                  </p>
                )}
              </div>

              {!isSmall && rating && (
                <div className="flex items-center text-xs">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M7 1L9 5L13 5.5L10 8.5L11 13L7 11L3 13L4 8.5L1 5.5L5 5L7 1Z" fill="#FFD700" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Add to Cart / Quantity Controls */}
            {cartItem ? (
              <div className="flex justify-between items-center">
                <button
                  onClick={decrementQuantity}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
                <span className="font-medium">{cartItem.quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                className={cn(
                  "w-full bg-white text-green-600 border border-green-600 hover:bg-green-50 gap-2 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors"
                )}
                size="sm"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>В корзину</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
