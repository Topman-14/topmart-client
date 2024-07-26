import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Providers from "@/providers";



const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Topmart",
  description: "Your one-stop online marketplace",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://test",
    siteName: "Topmart",
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
