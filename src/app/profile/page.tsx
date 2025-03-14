"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, User, MapPin, Package, Heart, LogOut } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, updateUserProfile, logout } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUpdating(true);

    try {
      const updated = await updateUserProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });

      if (updated) {
        setSuccess('Профиль успешно обновлен');
      } else {
        setError('Не удалось обновить профиль');
      }
    } catch (err) {
      setError('Произошла ошибка при обновлении профиля');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12">
          <div className="spinner"></div>
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
        <span className="text-gray-600">
          Личный кабинет
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="p-2">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent gap-1">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center justify-start p-3 h-auto data-[state=active]:bg-gray-100 data-[state=active]:shadow-none"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Мой профиль</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="orders"
                    className="flex items-center justify-start p-3 h-auto data-[state=active]:bg-gray-100 data-[state=active]:shadow-none"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    <span>Мои заказы</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="addresses"
                    className="flex items-center justify-start p-3 h-auto data-[state=active]:bg-gray-100 data-[state=active]:shadow-none"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Адреса доставки</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="favorites"
                    className="flex items-center justify-start p-3 h-auto data-[state=active]:bg-gray-100 data-[state=active]:shadow-none"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Избранное</span>
                  </TabsTrigger>
                </TabsList>

                <div className="border-t border-gray-200 mt-2 p-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 p-3 h-auto"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Выйти</span>
                  </Button>
                </div>

                <TabsContent value="profile" className="md:hidden">
                  <div className="bg-white rounded-lg border border-gray-200 mt-4 p-6">
                    <h2 className="text-xl font-semibold mb-6">Личные данные</h2>

                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="mb-4 border-green-200 bg-green-50 text-green-700">
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-name">ФИО</Label>
                        <Input
                          id="mobile-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Иванов Иван Иванович"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile-email">Email</Label>
                        <Input
                          id="mobile-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          disabled
                          placeholder="example@mail.ru"
                        />
                        <p className="text-xs text-gray-500">Эл. почту изменить нельзя</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile-phone">Телефон</Label>
                        <Input
                          id="mobile-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile-address">Адрес</Label>
                        <Input
                          id="mobile-address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Город, улица, дом, квартира"
                        />
                      </div>

                      <Button type="submit" className="w-full btn-primary" disabled={isUpdating}>
                        {isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="md:hidden">
                  <div className="bg-white rounded-lg border border-gray-200 mt-4 p-6">
                    <h2 className="text-xl font-semibold mb-6">История заказов</h2>
                    <div className="text-center py-8">
                      <p className="text-gray-500">У вас пока нет заказов</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="addresses" className="md:hidden">
                  <div className="bg-white rounded-lg border border-gray-200 mt-4 p-6">
                    <h2 className="text-xl font-semibold mb-6">Адреса доставки</h2>
                    <div className="text-center py-8">
                      <p className="text-gray-500">У вас пока нет сохраненных адресов</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="favorites" className="md:hidden">
                  <div className="bg-white rounded-lg border border-gray-200 mt-4 p-6">
                    <h2 className="text-xl font-semibold mb-6">Избранное</h2>
                    <div className="text-center py-8">
                      <p className="text-gray-500">У вас пока нет избранных товаров</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </nav>
          </div>
        </div>

        {/* Main Content - Desktop */}
        <div className="md:w-3/4 hidden md:block">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Личные данные</h2>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50 text-green-700">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">ФИО</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    placeholder="example@mail.ru"
                  />
                  <p className="text-xs text-gray-500">Эл. почту изменить нельзя</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Город, улица, дом, квартира"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="btn-primary" disabled={isUpdating}>
                  {isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
