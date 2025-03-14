"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/context/language-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Only show the component after the first render on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 h-9 px-2 gap-1 opacity-0"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline-block">Язык</span>
        <span className="text-xs font-medium">RU</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-green-600 hover:bg-green-50 h-9 px-2 gap-1"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">{t('language')}</span>
          <span className="text-xs font-medium">{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage('ru')}
          className={`${language === 'ru' ? 'bg-green-50 text-green-600' : ''} cursor-pointer`}
        >
          <span className="font-medium mr-2">RU</span>
          <span>Русский</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('be')}
          className={`${language === 'be' ? 'bg-green-50 text-green-600' : ''} cursor-pointer`}
        >
          <span className="font-medium mr-2">BE</span>
          <span>Беларуская</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
