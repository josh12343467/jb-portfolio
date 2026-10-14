import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Premium Font Initialization
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Joshua Buiza | IT & Developer",
  description: "Portfolio of Joshua Buiza, specializing in mobile apps, hardware, and web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Ina-apply natin ang font sa buong website */}
      <body className={`${spaceGrotesk.className} antialiased bg-[#0a0a0a]`}>
        {children}
      </body>
    </html>
  );
}