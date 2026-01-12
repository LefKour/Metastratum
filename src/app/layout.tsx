import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metastratum",
  description: "Web application for terrain extraction and DEM analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased w-screen h-screen`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
