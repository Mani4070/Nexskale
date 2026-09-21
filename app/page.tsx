import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import SiteMotion from "@/components/site-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import TechStackSection from "@/components/home/tech-stack-section";
import ServicesSection from "@/components/services/services-section";
import AboutSection from "@/components/about/about-section";
import WorkSection from "@/components/products/work-section";
import ContactBanner from "@/components/contact/contact-banner";
import BlogSection from "@/components/blog/blog-section";
import HeroVideo from "@/components/home/hero-video";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: `${content.brand.name} — Ideas into Impactful Technology`,
    description: content.hero.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: `${content.brand.name} — Ideas into Impactful Technology`,
      description: content.hero.description,
      url: "/",
      siteName: content.brand.name,
      type: "website",
      images: [
        {
          url: "/images/hero1.png",
          width: 1200,
          height: 630,
          alt: `${content.brand.name} — Ideas into Impactful Technology`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.brand.name} — Ideas into Impactful Technology`,
      description: content.hero.description,
      images: ["/images/hero1.png"],
    },
  };
}

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <SiteMotion revision="home" />
      <div className="dark-top home-dark-top" id="home">
        <HeroVideo />
        <Header
          brandName={content.brand.name}
          navigation={content.navigation}
          currentPage="home"
        />
        <div className="hero-wrapper">
          <HeroSection hero={content.hero} stats={content.stats} />
        </div>
      </div>
      <TechStackSection />
      <main>
        <ServicesSection services={content.services} isHome />
        <AboutSection about={content.about} isHome />
        <WorkSection projects={content.projects} isHome />
        <ContactBanner />
        <BlogSection posts={content.posts} isHome />
      </main>
      <Footer content={content} />
    </>
  );
}
