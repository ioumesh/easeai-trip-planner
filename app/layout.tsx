import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "Ease AI Trip Planner",
  description: "Ease AI Trip Planner",
};
const Outfitfont = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={Outfitfont.className}>
    <ConvexClientProvider>
        {children}
        </ConvexClientProvider>
        <Toaster
          position="top-center"
          theme="system"
          toastOptions={{
            duration: 2200
          }}
        />
      </body>
    </html>
    </ClerkProvider>
  );
}
