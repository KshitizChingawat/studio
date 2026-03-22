import type {Metadata} from 'next';
import { Manrope, Sora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'CampusPreorder',
  description: 'Pre-order food from on-campus vendors.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${manrope.variable} ${sora.variable} font-body antialiased h-full`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
