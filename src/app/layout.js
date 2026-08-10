import { Outfit, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import Preloader from "@/components/loader/Preloader";
import PageLayout from "@/components/layout/PageLayout";
import { SEO } from "@/config/seo";
import "./globals.css";

// Configure Google Fonts: Outfit for Display/Headings, Plus Jakarta Sans for Body
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

// Use SEO config
export const metadata = {
  title: SEO.title,
  description: SEO.description,
  openGraph: SEO.openGraph,
  twitter: SEO.twitter,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable} bg-background text-text-primary antialiased`}>
      <body className="overflow-x-hidden font-sans">
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          <PageLayout>
            {children}
          </PageLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
