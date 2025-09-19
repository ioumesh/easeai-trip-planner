import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

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
    <html lang="en">
      <body className={Outfitfont.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
