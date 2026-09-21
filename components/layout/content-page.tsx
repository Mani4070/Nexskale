import type { ReactNode } from "react";
import type { Content } from "@/lib/content";
import Header from "./header";
import Footer from "./footer";
import "@/app/interior-pages.css";
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
    <div className={"interior-site interior-" + currentPage}>
      <div className="dark-top">
        <Header
          brandName={content.brand.name}
          navigation={content.navigation}
          currentPage={currentPage}
        />
      </div>
      <main>{children}</main>
      <Footer content={content} />
    </div>
  );
}
