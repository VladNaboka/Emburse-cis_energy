// src/app/layout.js
import Header from '../components/Header';
import './globals.css';
import Footer from '../components/Footer';
import I18nRootProvider from '../components/I18nRootProvider';
import { cookies } from 'next/headers';
import { Inter, Source_Serif_4 } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
  display: 'swap',
});

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

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const cookieLangRaw = cookieStore.get('lang')?.value ?? 'ru';
  const cookieLang = ['ru', 'kk', 'en'].includes(cookieLangRaw.toLowerCase())
    ? cookieLangRaw.toLowerCase()
    : 'ru';

  return (
    <html lang={cookieLang} className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
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
