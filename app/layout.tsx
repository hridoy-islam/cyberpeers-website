import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/utils";
import { Providers } from "@/app/providers";
import { Header } from "@/components/public/Header"; 
import { Footer } from "@/components/public/Footer";

// Font Configuration
const fontHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});



export const metadata: Metadata = {
  metadataBase: new URL("https://cyberpeers.co.uk"), 

  title: {
    default: "Cyberpeers | Digital Marketing & Tech Agency",
    template: "%s | Cyberpeers",
  },

  description:
    "Cyberpeers is a results-driven digital marketing and technology agency specializing in web development, SEO, branding, UI/UX design, and performance marketing.",

  keywords: [
    "Cyberpeers",
    "Digital Marketing Agency",
    "Web Development Company",
    "SEO Services",
    "Performance Marketing",
    "Branding Agency",
    "UI UX Design",
    "Tech Agency",
    "Social Media Marketing",
  ],

  authors: [{ name: "Cyberpeers Team" }],
  creator: "Cyberpeers",
  publisher: "Cyberpeers",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "Cyberpeers | Digital Marketing & Tech Agency",
    description:
      "Scale your business with Cyberpeers. We build high-performing websites and data-driven marketing strategies that deliver measurable growth.",
    url: "https://cyberpeers.co.uk",
    siteName: "Cyberpeers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Cyberpeers Digital Marketing & Tech Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Cyberpeers | Digital Marketing & Tech Agency",
    description:
      "Web development, SEO, branding & performance marketing solutions tailored for modern businesses.",
    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://cyberpeers.co.uk",
  },

  category: "technology",
  applicationName: "Cyberpeers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontHeading.variable,
          fontSans.variable
        )}
      >
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}