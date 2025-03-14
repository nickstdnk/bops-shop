"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'be';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  ru: {
    // Common
    'search': 'Поиск товаров',
    'find': 'Найти',
    'login': 'Войти',
    'logout': 'Выйти',
    'profile': 'Личный кабинет',
    'cart': 'Корзина',
    'language': 'Язык',
    // Header
    'about': 'О компании',
    'contacts': 'Контакты',
    'delivery': 'Доставка и оплата',
    // Categories
    'new_items': 'Новинки',
    'dairy': 'Молочное и сыр',
    'bread': 'Хлеб и выпечка',
    'meat': 'Мясо и птица',
    'ready_meals': 'Готовая еда',
    'sweets': 'Сладости и снеки',
    'drinks': 'Вода и напитки',
    'household': 'Бытовая химия',
    // Footer
    'for_business': 'Для бизнеса',
    'careers': 'Вакансии',
    'for_customers': 'Покупателям',
    'help': 'Помощь',
    'payment': 'Оплата',
    'refund': 'Возврат',
    'partners': 'Партнерам',
    'suppliers': 'Поставщикам',
    'advertising': 'Реклама',
    'app': 'Приложение',
    'social_media': 'Мы в соцсетях',
    'copyright': '© 2025 Брестский облпотребсоюз. Все права защищены',
    'terms': 'Условия использования',
    'privacy': 'Политика конфиденциальности',
  },
  be: {
    // Common
    'search': 'Пошук тавараў',
    'find': 'Знайсці',
    'login': 'Увайсці',
    'logout': 'Выйсці',
    'profile': 'Асабісты кабінет',
    'cart': 'Кошык',
    'language': 'Мова',
    // Header
    'about': 'Аб кампаніі',
    'contacts': 'Кантакты',
    'delivery': 'Дастаўка і аплата',
    // Categories
    'new_items': 'Навінкі',
    'dairy': 'Малочнае і сыр',
    'bread': 'Хлеб і выпечка',
    'meat': 'Мяса і птушка',
    'ready_meals': 'Гатовая ежа',
    'sweets': 'Салодкае і снэкі',
    'drinks': 'Вада і напоі',
    'household': 'Бытавая хімія',
    // Footer
    'for_business': 'Для бізнесу',
    'careers': 'Вакансіі',
    'for_customers': 'Пакупнікам',
    'help': 'Дапамога',
    'payment': 'Аплата',
    'refund': 'Вяртанне',
    'partners': 'Партнёрам',
    'suppliers': 'Пастаўшчыкам',
    'advertising': 'Рэклама',
    'app': 'Дадатак',
    'social_media': 'Мы ў сацсетках',
    'copyright': '© 2025 Брэсцкі аблспажыўсаюз. Усе правы абаронены',
    'terms': 'Умовы выкарыстання',
    'privacy': 'Палітыка канфідэнцыяльнасці',
  }
};

const defaultLanguage: Language = 'ru';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => {
    const currentTranslations = translations[defaultLanguage];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  }
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  // Handle client-side initialization
  useEffect(() => {
    setMounted(true);

    // Load language preference from localStorage on mount, if available
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'be')) {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  };

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  const contextValue = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
