import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/layout";
import { CartProvider } from "@/lib/context/cart-context";
import { AuthProvider } from "@/lib/context/auth-context";
import { LanguageProvider } from "@/lib/context/language-context";
import { metadata as siteMetadata } from "./metadata";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <Layout>{children}</Layout>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
