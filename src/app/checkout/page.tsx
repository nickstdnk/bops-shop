"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, CreditCard, Banknote, Truck, ShoppingBag, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
  });

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      router.push('/');
    }
  }, [items, router, isLoading]);

  // Populate form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      setError('Пожалуйста, заполните все обязательные поля');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call to process order
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Order successful
      setSuccess(true);
      clearCart();

      // Redirect to success page after a delay
      setTimeout(() => {
        router.push('/checkout/success');
      }, 2000);
    } catch (error) {
      setError('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isLoading) {
    return null; // Will redirect via the useEffect
  }

  if (success) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Спасибо за заказ!</h1>
          <p className="text-gray-600 mb-6">Ваш заказ успешно оформлен. Перенаправление на страницу подтверждения...</p>
          <Button asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:underline">
          Главная
        </Link>{' '}
        &rsaquo;{' '}
        <span className="text-gray-600">Оформление заказа</span>
      </div>

      <h1 className="text-2xl font-semibold mb-8">Оформление заказа</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Контактная информация</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">ФИО*</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Иванов Иван Иванович"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон*</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                <h2 className="text-lg font-semibold">Адрес доставки</h2>
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="address">Адрес*</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Город, улица, дом, квартира"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Код домофона, этаж, подъезд, как найти и т.д."
                  className="resize-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                <h2 className="text-lg font-semibold">Способ оплаты</h2>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-2">
                <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Банковской картой онлайн</Label>
                  <Image src="https://web-assets.same.dev/1663275258/3826626908.png" alt="Payment cards" width={100} height={24} />
                </div>

                <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">Наличными курьеру</Label>
                  <Banknote className="h-5 w-5 text-gray-400" />
                </div>
              </RadioGroup>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-20">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Ваш заказ</h2>

              <div className="max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex py-3 border-b border-gray-100 last:border-0">
                    <div className="w-12 h-12 bg-gray-50 rounded-md flex-shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">{item.quantity} × {item.price.toFixed(2)} руб.</p>
                        <p className="text-sm font-medium">{(item.price * item.quantity).toFixed(2)} руб.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Сумма</span>
                <span>{totalPrice.toFixed(2)} руб.</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Доставка</span>
                <span className="text-green-600">Бесплатно</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-100">
                <span>Итого</span>
                <span>{totalPrice.toFixed(2)} руб.</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <Truck className="w-4 h-4 mr-2 text-green-600" />
                <span>Доставка в течение 15-45 минут</span>
              </div>

              <Button
                className="w-full btn-primary py-6 text-lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Оформление заказа...' : 'Оформить заказ'}
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных и условиями публичной оферты
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
