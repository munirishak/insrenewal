
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";
import ReduxProvider from "@/store/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zurich Insurance Renewal",
  description: "Insurance renewal at fingertips",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider><ReduxProvider>{children}</ReduxProvider></NextAuthProvider>
      </body>
    </html>
  );
}
