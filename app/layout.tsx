import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { NavItems } from "@/components/nav-items";

// Optimizar la carga de la fuente
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Asegura que el texto sea visible mientras se carga la fuente
  preload: true
});

export const metadata: Metadata = {
  title: 'AI Animal Recognition',
  description: 'Upload images to identify animals using AI',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavItems />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}