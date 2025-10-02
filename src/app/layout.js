import Header from '../components/Header';
import './globals.css';
import Footer from '../components/Footer';

export const metadata = {
  title: 'CIS ENERGY',
  description: 'CIS ENERGY landing',
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32' }, // твой текущий PNG
      { url: '/images/logo.svg', type: 'image/svg+xml' }, // этот же логотип в SVG
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
