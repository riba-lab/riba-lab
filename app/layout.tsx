import type { Metadata } from 'next';
import { DM_Sans, Marcellus, Noto_Sans_Hebrew } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hebrew',
});

export const metadata: Metadata = {
  title: 'RIBA Lab',
  description: 'חנות ריבה מיוחדת מישראל — RIBA Lab',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${marcellus.variable} ${dmSans.variable} ${notoSansHebrew.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-plum">{children}</body>
    </html>
  );
}
