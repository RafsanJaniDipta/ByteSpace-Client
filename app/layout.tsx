import type { Metadata } from "next";
import localFont from "next/font/local";
import { Figtree, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
});

const satoshi = localFont({
  src: [{ path: "./fonts/Satoshi-Regular.woff2", weight: "400" }],
  variable: "--font-satoshi",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ByteSpace",
  description: "Your one-stop solution for all your byte needs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${geistMono.variable} ${poppins.variable} ${satoshi.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
