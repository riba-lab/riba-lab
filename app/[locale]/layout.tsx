import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { ReactNode } from 'react';
import { CartProvider } from '@/lib/cart-context';
import AmbientBackground from '@/components/AmbientBackground';
import Header from '@/components/Header';
import LangModal from '@/components/LangModal';
import AccountModal from '@/components/AccountModal';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import ChatBot from '@/components/ChatBot';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <CartProvider>
        <AmbientBackground />
        <Header />
        <LangModal />
        <AccountModal />
        <ProductModal />
        <CartDrawer />
        {children}
        <ChatBot />
      </CartProvider>
    </NextIntlClientProvider>
  );
}
