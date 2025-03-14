"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, User, LogOut, ChevronDown, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { useLanguage } from '@/lib/context/language-context';
import { CartDrawer } from '@/components/ui/cart-drawer';
import { LoginModal } from '@/components/ui/login-modal';
import { RegisterModal } from '@/components/ui/register-modal';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Categories data
const categories = [
  {
    name: 'Новое и популярное',
    slug: 'new-and-popular',
    subcategories: [
      { name: 'Новинки', slug: 'new' },
      { name: 'Акции', slug: 'promo' },
      { name: 'Популярные товары', slug: 'popular' }
    ]
  },
  {
    name: 'Молочное и сыр',
    slug: 'dairy',
    subcategories: [
      { name: 'Молоко и сливки', slug: 'milk' },
      { name: 'Йогурты и десерты', slug: 'yogurt' },
      { name: 'Сыр', slug: 'cheese' },
      { name: 'Масло и маргарин', slug: 'butter' }
    ]
  },
  {
    name: 'Хлеб и выпечка',
    slug: 'bread',
    subcategories: [
      { name: 'Хлеб', slug: 'bread' },
      { name: 'Выпечка', slug: 'pastry' },
      { name: 'Хлебцы, сухари и сушки', slug: 'crackers' }
    ]
  },
  {
    name: 'Бакалея, мясо и рыба',
    slug: 'grocery-meat-fish',
    subcategories: [
      { name: 'Мясо и птица', slug: 'meat' },
      { name: 'Колбаса и сосиски', slug: 'sausages' },
      { name: 'Рыба и морепродукты', slug: 'seafood' },
      { name: 'Макароны, крупы и мука', slug: 'pasta-grains' }
    ]
  },
  {
    name: 'Готовая еда и выпечка',
    slug: 'ready-meals',
    subcategories: [
      { name: 'Готовые блюда', slug: 'meals' },
      { name: 'Стритфуд', slug: 'streetfood' },
      { name: 'Десерты и выпечка', slug: 'desserts' }
    ]
  },
  {
    name: 'Вода и напитки',
    slug: 'drinks',
    subcategories: [
      { name: 'Вода', slug: 'water' },
      { name: 'Соки и морсы', slug: 'juice' },
      { name: 'Кола и лимонады', slug: 'soda' },
      { name: 'Холодный чай и квас', slug: 'ice-tea' },
      { name: 'Энергетики, пиво и вино', slug: 'energy-drinks' }
    ]
  },
  {
    name: 'Мороженое и сладости',
    slug: 'sweets',
    subcategories: [
      { name: 'Мороженое', slug: 'ice-cream' },
      { name: 'Шоколад и конфеты', slug: 'chocolate' },
      { name: 'Торты и пирожные', slug: 'cakes' }
    ]
  },
  {
    name: 'Бытовая химия и уход',
    slug: 'household',
    subcategories: [
      { name: 'Бытовая химия', slug: 'cleaning' },
      { name: 'Уход за собой', slug: 'personal-care' },
      { name: 'Товары для дома', slug: 'home-goods' }
    ]
  }
];

export function Header() {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-gray-100 py-2 text-xs text-gray-600">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Москва</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Доставка от 15 минут</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-green-600">{t('about')}</Link>
            <Link href="/contacts" className="hover:text-green-600">{t('contacts')}</Link>
            <Link href="/delivery" className="hover:text-green-600">{t('delivery')}</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Logo size="medium" variant="default" />
              </Link>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 mx-6 relative">
              <form onSubmit={handleSearch} className="w-full">
                <Input
                  type="search"
                  placeholder={t('search')}
                  className="w-full h-10 pl-10 rounded-full border-gray-200 focus:border-green-500 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1 h-8 px-2 hover:bg-green-50 text-green-600"
                >
                  {t('find')}
                </Button>
              </form>
            </div>

            {/* Mobile Search Controls */}
            <div className="md:hidden px-4 py-3 border-t border-gray-100">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder={t('search')}
                    className="w-full h-10 pl-10 rounded-full border-gray-200 focus:border-green-500 focus:ring-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1 h-8 px-2 hover:bg-green-50 text-green-600"
                  >
                    {t('find')}
                  </Button>
                </div>
              </form>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-green-600 hover:bg-green-50">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{t('profile')}</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal text-sm text-gray-500 pt-0">
                      {user?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        Личный кабинет
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/orders">
                      <DropdownMenuItem className="cursor-pointer">
                        Мои заказы
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/favorites">
                      <DropdownMenuItem className="cursor-pointer">
                        Избранное
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-500 focus:text-red-500"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex text-gray-600 hover:text-green-600 hover:bg-green-50"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 hover:text-green-600 hover:bg-green-50"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>

              {isAuthenticated ? (
                <Button
                  className="hidden md:flex bg-green-600 hover:bg-green-700 text-white rounded-full"
                  onClick={() => setIsCartOpen(true)}
                >
                  {t('cart')}
                </Button>
              ) : (
                <Button
                  className="hidden md:flex bg-green-600 hover:bg-green-700 text-white rounded-full"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  {t('login')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="hidden md:block overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-gray-100 bg-white">
          <div className="container-custom py-2">
            <div className="flex gap-4">
              <Link href="/category/new" className="text-sm font-medium text-gray-700 hover:text-green-600">
                {t('new_items')}
              </Link>
              <Link href="/category/dairy" className="text-sm font-medium text-gray-700 hover:text-green-600">
                {t('dairy')}
              </Link>
              <Link href="/bread-showcase" className="text-sm font-medium text-green-600 hover:text-green-700">
                {t('bread')}
              </Link>
              <Link href="/category/groceries" className="text-sm font-medium text-gray-700 hover:text-green-600">
                {t('meat')}
              </Link>
              <Link href="/category/ready-meals" className="text-sm font-medium text-gray-700 hover:text-green-600">
                {t('ready_meals')}
              </Link>
              <Link href="/category/sweets" className="text-sm font-medium text-gray-700 hover:text-green-600">
                {t('sweets')}
              </Link>
              <Link href="/category/drinks" className="text-sm font-medium text-gray-700 hover:text-green-600">
                {t('drinks')}
              </Link>
              <Link href="/category/household" className="text-sm font-medium text-gray-700 hover:text-green-600">
                {t('household')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Authentication Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onLoginClick={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </>
  );
}
