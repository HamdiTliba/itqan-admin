"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import MountedProvider from "@/providers/MountedProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";


export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MountedProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              background: "#ffffff",
              color: "#00321a",
              fontWeight: "bold",
              fontSize: "14px",
              lineHeight: "1.3",
              borderRadius: "10px",
              padding: "5px 10px",
              fontFamily: "sans-serif",
            },
          }}
        />
        <SessionProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </MountedProvider>
  );
}
