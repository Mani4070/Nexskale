import type { ReactNode } from "react";
import type { Content } from "@/lib/content";
import Header from "./header";
import Footer from "./footer";
import InteriorMotion from "./interior-motion";
import "@/app/interior-pages.css";
import "@/app/interior-mockup.css";
import "@/app/reference-pages.css";
import "@/app/corporate-pages.css";
export default function ContentPage({
  content,
  currentPage,
  children,
}: {
  content: Content;
  currentPage: string;
  children: ReactNode;
}) {
  return (
    <>
      <div
        className={
          "interior-site interior-" +
          currentPage +
          (["about", "services", "blog", "careers", "contact"].includes(
            currentPage,
          )
            ? " reference-pages"
            : "")
        }
      >
        <Header
          brandName={content.brand.name}
          navigation={content.navigation}
          currentPage={currentPage}
          hideSpacer
        />
        <main>{children}</main>
        <InteriorMotion />
      </div>
      <Footer content={content} />
    </>
  );
}
