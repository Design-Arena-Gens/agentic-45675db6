import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Travel Social Agent',
  description: 'Generate luxury travel content for social media'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
