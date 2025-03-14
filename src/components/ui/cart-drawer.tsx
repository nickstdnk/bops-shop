"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useCart } from '@/lib/context/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, itemCount, isCartOpen, setIsCartOpen } = useCart();
  const initialFocusRef = useRef<HTMLDivElement>(null);

  // Handle Escape key to close the cart
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setIsCartOpen]);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:w-[400px] sm:max-w-md">
        <SheetHeader className="space-y-2 pr-6">
          <SheetTitle className="text-xl flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Корзина ({itemCount})
          </SheetTitle>
        </SheetHeader>

        <div className="py-4" ref={initialFocusRef}>
          {items.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex border-b border-gray-200 pb-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-md relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <Link href={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="text-sm font-medium hover:text-green-600">
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {item.weight && (
                      <p className="text-xs text-gray-500 mt-1">{item.weight}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-sm font-medium">
                        {(item.price * item.quantity).toFixed(2)} руб.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Корзина пуста</h3>
              <p className="text-gray-500 mb-6">Добавьте товары, чтобы оформить заказ</p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                Перейти к покупкам
              </Button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col mt-auto">
            <div className="border-t border-gray-200 pt-4 pb-6">
              <div className="flex justify-between text-base mb-2">
                <span>Итого:</span>
                <span className="font-semibold">{totalPrice.toFixed(2)} руб.</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Стоимость доставки рассчитывается при оформлении заказа</p>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                <Button className="w-full btn-primary">Оформить заказ</Button>
              </Link>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setIsCartOpen(false)}
              >
                Продолжить покупки
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
