import { Inter, Cormorant_Garamond, Pirata_One, Silkscreen } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const gothic = Pirata_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-gothic',
  display: 'swap',
});

const pixel = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pixel',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://iri.org.br';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '000000000000000';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: ' Soma+ — Cultivar & Guardar ',
  description:
    'Conteúdos exclusivos para igrejas e líderes que desejam cultivar e guardar a criação. Baixe materiais ricos sobre fé, ecologia e missão integral.',
  keywords: [
    'IRI Brasil',
    'Soma+',
    'cultivar e guardar',
    'fé e ecologia',
    'missão integral',
    'criação',
    'igreja e meio ambiente',
  ],
  authors: [{ name: 'Soma+' }],
  openGraph: {
    title: 'Soma+ — Cultivar & Guardar',
    description:
      'Materiais ricos e exclusivos sobre fé, ecologia e cuidado com a criação. Baixe agora.',
    url: SITE_URL,
    siteName: 'Soma+',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soma+ — Cultivar & Guardar',
    description: 'Materiais ricos e exclusivos sobre fé, ecologia e cuidado com a criação.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3a3d14',
};

export default function RootLayout({ children }) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Soma+',
    url: SITE_URL,
    description:
      'Soma+ — promovendo o diálogo entre fé cristã e cuidado com a criação.',
    sameAs: [],
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cormorant.variable} ${gothic.variable} ${pixel.variable}`}
    >
      <head>
        <link rel="icon" href="/logos/Soma_s.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
