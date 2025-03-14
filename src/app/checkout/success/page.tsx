"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/cart-context';
import { Button } from '@/components/ui/button';
import { Check, ShoppingBag, ChevronRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { items } = useCart();

  // Redirect to home if directly accessing this page with no previous order
  useEffect(() => {
    if (items.length > 0) {
      router.push('/checkout');
    }
  }, [items, router]);

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Заказ успешно оформлен!</h1>
          <p className="text-xl text-gray-600 mb-2">Спасибо за ваш заказ</p>
          <p className="text-gray-500">Номер заказа: <span className="font-semibold">ORD-{Math.floor(100000 + Math.random() * 900000)}</span></p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Информация о заказе</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Адрес доставки</p>
              <p className="font-medium">ул. Примерная, д. 1, кв. 1</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ожидаемое время доставки</p>
              <p className="font-medium">15-45 минут</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Способ оплаты</p>
              <p className="font-medium">Банковской картой</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Статус оплаты</p>
              <p className="text-green-600 font-medium">Оплачено</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Сумма заказа</span>
              <span>1250.00 руб.</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Доставка</span>
              <span className="text-green-600">Бесплатно</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-100">
              <span>Итого</span>
              <span>1250.00 руб.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-primary">
            <Link href="/" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Продолжить покупки
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/orders" className="flex items-center">
              Мои заказы
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
