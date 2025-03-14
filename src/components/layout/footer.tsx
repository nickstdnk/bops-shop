"use client";

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useLanguage } from '@/lib/context/language-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo size="medium" variant="default" />
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('contacts')}
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href="/for-business" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('for_business')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('for_customers')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('help')}
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('delivery')}
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('payment')}
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('refund')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('partners')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/suppliers" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('suppliers')}
                </Link>
              </li>
              <li>
                <Link href="/marketing" className="text-gray-600 hover:text-green-600 text-sm">
                  {t('advertising')}
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-600 hover:text-green-600 text-sm">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('app')}</h3>
            <div className="flex flex-col space-y-3">
              <Link href="https://apps.apple.com" className="border border-gray-200 rounded-lg py-2 px-4 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-sm">App Store</span>
              </Link>
              <Link href="https://play.google.com" className="border border-gray-200 rounded-lg py-2 px-4 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-sm">Google Play</span>
              </Link>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">{t('social_media')}</h3>
              <div className="flex space-x-4">
                <Link href="https://instagram.com" className="text-gray-600 hover:text-green-600">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://facebook.com" className="text-gray-600 hover:text-green-600">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" className="text-gray-600 hover:text-green-600">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="text-sm text-gray-500">
              {t('copyright')}
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-green-600">
                {t('terms')}
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-green-600">
                {t('privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
