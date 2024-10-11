import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Providers from "@/providers";

const liveUrl = `https://earlsbistro.vercel.app/`;

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${liveUrl}`),
  title: "Earl's Bistro",
  description: "Your one-stop online store",
  keywords: "online, store, shopping, electronics, fashion, home, goods, Earl's Bistro, yaba, mandilas, lagos, thrift, iphone, lambo",
  openGraph: {
    title: `Earl's Bistro`,
    description: 'Your one-stop online store',
    url: `${liveUrl}`,
    siteName: `Earl's Bistro`,
    images: [
      {
        url: `${liveUrl}opengraph-image.png`, 
        width: 800,
        height: 600,
      },
      {
        url: `${liveUrl}twitter-image.png`,
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
      <body className={`${montserrat.className} bg-[#fcece2c5]`}>
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
