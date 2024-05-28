import type { Metadata, Viewport } from "next";
import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });
const title = "zKSearch";
const description =
  "zkSearch is a privacy-centric search engine crafted within the ZKML ecosystem, utilising established privacy-focused technologies while refraining from storing user data. It harnesses the power of venice ai and groq to deliver AI-driven search capabilities within the secure confines of the ZKML subnet, ensuring heightened levels of privacy and security.";
const domain = process.env.DOMAIN || "";

export const metadata: Metadata = {
  title: title,
  description: description,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: title,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: domain,
    title: title,
    description: description,
    siteName: domain,
    images: [
      {
        url: domain + "/og1.png",
        alt: "zkSearch",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: title,
      template: title,
    },
    description: description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-[#00111A] dark:bg-[#E5FCFF]">
            <Suspense>
              <Header />
              {children}
              <Footer />
            </Suspense>
          </div>
          <Toaster
            position="top-center"
            containerStyle={{ backgroundColor: "#black" }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
