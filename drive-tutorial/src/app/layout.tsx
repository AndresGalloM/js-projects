import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Drive App",
  description: "It's like Google Drive, but worse!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body className="bg-gray-900">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
