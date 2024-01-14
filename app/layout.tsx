import './globals.css';
import { Metadata } from 'next';
import QueryProvider from '@/src/lib/query';

export const metadata: Metadata = {
  title: `Kevin's e-commerce application`,
  description: 'E-commerce application built with Next.js'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
