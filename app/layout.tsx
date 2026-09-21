import type { Metadata } from "next";
import Preloader from "@/components/ui/preloader";
import "./globals.css";
import "./pages.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NexSkale — Ideas into Impactful Technology",
    template: "%s | NexSkale",
  },
  description:
    "Digital products built with purpose. High-performance web development, AI automation, mobile apps, and cloud systems by NexSkale.",
  applicationName: "NexSkale",
  keywords: [
    "NexSkale",
    "digital products",
    "web development",
    "mobile application development",
    "AI automation",
    "cloud architecture",
    "custom software development",
    "SaaS development",
    "UI UX design",
    "generative AI solutions",
  ],
  authors: [{ name: "NexSkale", url: siteUrl }],
  creator: "NexSkale",
  publisher: "NexSkale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NexSkale",
    title: "NexSkale — Ideas into Impactful Technology",
    description:
      "Digital products built with purpose. Web development, AI automation, mobile apps, and cloud solutions by NexSkale.",
    images: [
      {
        url: "/images/hero1.png",
        width: 1200,
        height: 630,
        alt: "NexSkale — Ideas into Impactful Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexSkale — Ideas into Impactful Technology",
    description:
      "Digital products built with purpose. Web development, AI automation, mobile apps, and cloud solutions by NexSkale.",
    images: ["/images/hero1.png"],
    creator: "@nexskale",
  },
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
      { url: "/images/logo/mobile-logo.png", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/images/logo/mobile-logo.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NexSkale",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/images/logo/logo-light.png`,
        caption: "NexSkale Logo",
      },
      image: `${siteUrl}/images/hero1.png`,
      description:
        "NexSkale designs, builds and scales digital products with modern web development, mobile apps, AI automation and cloud systems.",
      email: "hello@nexskale.com",
      sameAs: [
        "https://linkedin.com",
        "https://x.com",
        "https://github.com",
        "https://instagram.com",
        "https://youtube.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NexSkale",
      description: "Ideas into Impactful Technology",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
