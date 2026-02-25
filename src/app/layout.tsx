import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Sidebar from '@/components/layout/sidebar';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  title: 'WhatsApp CRM',
  description: 'WhatsApp CRM Demo - Pipeline, Campanhas e Contatos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} font-sans antialiased`}>
        <Sidebar />
        <main className="ml-16 min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
