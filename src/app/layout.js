// src/app/layout.js
import Header from '../components/Header';
import './globals.css';
import Footer from '../components/Footer';
import I18nRootProvider from '../components/I18nRootProvider';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'CIS ENERGY',
  description: 'CIS ENERGY - энергетическая компания',
  keywords: ['CIS ENERGY', 'энергетика', 'energy', 'Казахстан'],
  authors: [{ name: 'CIS ENERGY' }],
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  openGraph: {
    title: 'CIS ENERGY',
    description: 'CIS ENERGY - энергетическая компания',
    url: 'https://cisenergy.kz',
    siteName: 'CIS ENERGY',
    images: [
      {
        url: '/logo.jpeg',
        width: 512,
        height: 512,
        alt: 'CIS ENERGY Logo',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'CIS ENERGY',
    description: 'CIS ENERGY - энергетическая компания',
    images: ['/logo.jpeg'],
  },
};

// (опционально) гарантируем динамический рендер
// export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
  // ⬇️ обязательно await
  const cookieStore = await cookies();
  const cookieLangRaw = cookieStore.get('lang')?.value ?? 'ru';
  const cookieLang = ['ru', 'kk', 'en'].includes(cookieLangRaw.toLowerCase())
    ? cookieLangRaw.toLowerCase()
    : 'ru';

  return (
    <html lang={cookieLang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nRootProvider initialLang={cookieLang}>
          <Header />
          {children}
          <Footer />
        </I18nRootProvider>
      </body>
    </html>
  );
}
