import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminLogin from "@/components/admin/admin-login";
import { ToastProvider } from "@/components/admin/toast";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Panel — NexusKale CMS",
  description: "Dynamic content management system for NexusKale.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/images/logo/mobile-logo.png", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/images/logo/mobile-logo.png",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    const content = await getContent();
    return <AdminLogin brandName={content.brand.name} />;
  }

  return <ToastProvider>{children}</ToastProvider>;
}
