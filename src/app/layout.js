// src/app/layout.js
import Header from '../components/Header';
import './globals.css';
import Footer from '../components/Footer';
import I18nRootProvider from '../components/I18nRootProvider';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'CIS ENERGY',
  description: 'CIS ENERGY landing',
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32' },
      { url: '/images/logo.svg', type: 'image/svg+xml' },
    ],
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
