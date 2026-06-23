import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lithos — Layers of Time",
  description: "Peel back the crust to trace how stones, fossils, and deep time combine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-black antialiased">
        {children}
      </body>
    </html>
  );
}