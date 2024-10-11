import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Providers from "@/providers";



const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://topmart.vercel.app/'),
  title: "Topmart Store",
  description: "Your one-stop online store",
  keywords: "online, store, shopping, electronics, fashion, home, goods, Topmart, yaba, mandilas, lagos, thrift, iphone, lambo",
  openGraph: {
    title: 'Topmart Store',
    description: 'Your one-stop online store',
    url: 'https://topmart.vercel.app/',
    siteName: 'Topmart Store',
    images: [
      {
        url: 'https://topmart.vercel.app/opengraph-image.png', 
        width: 800,
        height: 600,
      },
      {
        url: 'https://topmart.vercel.app/twitter-image.png',
        width: 1800,
        height: 1600,
        alt: 'Twitter Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <ScrollArea className='h-screen'> 
            <Navbar />
            {children}
            <Footer />
          </ScrollArea>
        </Providers>
      </body>
    </html>
  );
}
