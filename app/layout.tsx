import type { Metadata } from "next";
import { Almarai, Inter, Playfair_Display, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

// 1. Initialize Next.js Optimized Web Fonts
const almarai = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Prisma Studio & Lithos",
  description: "Visionary creation and stratigraphy suite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`h-full antialiased ${almarai.variable} ${inter.variable} ${playfair.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-full bg-black antialiased m-0 p-0">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}