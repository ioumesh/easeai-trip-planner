import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <ToastContainer
          position="top-center"
          autoClose={2200}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          theme="colored"
        />
      </body>
    </html>
    </ClerkProvider>
  );
}
