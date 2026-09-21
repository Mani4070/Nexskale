import type { Metadata } from "next";
import Preloader from "@/components/ui/preloader";
import "./globals.css";
import "./pages.css";
export const metadata: Metadata = {
  title: "NexusKale — Ideas into Impactful Technology",
  description:
    "Digital products built with purpose. Web development, AI automation, mobile apps and cloud solutions by NexusKale.",
  icons: {
    icon: [
      { url: "/images/logo/mobile-logo.png", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/images/logo/mobile-logo.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
