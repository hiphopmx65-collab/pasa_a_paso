import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { BRAND_NAME, BRAND_TAGLINE } from '@paso-a-paso/config';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Owner`,
  description: BRAND_TAGLINE,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc' }}>{children}</body>
    </html>
  );
}
