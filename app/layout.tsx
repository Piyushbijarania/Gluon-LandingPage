import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gluon Stablecoin Protocol",
  description:
    "Gluon W is a dual-token stabilization protocol. Split base tokens into neutrons (stable) and protons (volatile), or merge them back. DeFi-native mechanics with dynamic fees.",
  keywords: ["Gluon", "DeFi", "stablecoin", "dual token", "crypto", "EVM", "Ergo", "Solana"],
  authors: [{ name: "Gluon Stablecoin Protocol" }],
  openGraph: {
    title: "Gluon Stablecoin Protocol",
    description:
      "Gluon W is a dual-token stabilization protocol. Split base tokens into neutrons and protons. Available on EVM, Ergo, and Solana.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gluon Stablecoin Protocol",
    description: "DeFi-native dual-token mechanics. Fission, fusion, and beta decay reactions.",
  },
  robots: "index, follow",
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/image.png`,
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://gluon.stability.nexus/#website",
        "url": "https://gluon.stability.nexus/",
        "name": "Gluon Protocol",
        "description": "Physics-inspired dual-token stablecoin protocol with zero governance and no rent-seeking fees."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://gluon.stability.nexus/#application",
        "name": "Gluon Protocol",
        "applicationCategory": "DeFiApplication",
        "operatingSystem": "Web",
        "url": "https://gluon.stability.nexus/",
        "author": {
          "@type": "Organization",
          "name": "Stability Nexus",
          "url": "https://stability.nexus"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
