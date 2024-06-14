import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jane's Auction",
  description: "Auction your collectibles",
  icons: {
    icon: "/assets/logos/janes4.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className=" bg-dark-1">
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
