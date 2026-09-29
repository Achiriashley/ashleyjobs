import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import "./globals.css";
import CommonLayout from "@/components/common-layout";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "ASHJOBS — Find Your Next Role or Your Next Hire",
  description:
    "ASHJOBS connects candidates with recruiters through a fast, focused hiring platform.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased`}
        >
          <Suspense fallback={<Loading />}>
            <CommonLayout attribute="class" defaultTheme="system">
              {children}
            </CommonLayout>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
