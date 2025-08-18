import type { Metadata } from "next";
import "./globals.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Quicksand } from "next/font/google";

import ClientProviders from "@/providers/ClientProviders";

const inter = Quicksand({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Itqan Admin",
  description:
    "Itqan Exemple -  E-commerce website built by Tunsian, focused on selling high-quality furniture products.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} dark:bg-black dark:text-white `}
        suppressHydrationWarning>
        <ClientProviders>
          <div className="min-h-screen h-full max-w-[1366px] w-full m-auto  ">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
