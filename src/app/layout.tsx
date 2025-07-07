import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import './material-symbols.css';
import 'leaflet/dist/leaflet.css';
import Header from '@/components/Header/Header';
import { AuthProvider } from '@/components/auth/AuthProvider/AuthProvider';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Star Dweller',
  description:
    'A space-themed personal dashboard app to explore the cosmos while boosting productivity. Features widgets for tasks, space news, SpaceX launches, and more.',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${spaceGrotesk.variable}`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
