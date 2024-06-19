import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import MainNav from "@/components/main-nax";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Topmart",
  description: "Your one-stop online marketplace",
  openGraph: {
    type: "website",
    locale: "en_US",
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
        <MainNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
