import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SiteMotion from "@/components/site-motion";
import PageIntro from "@/components/layout/page-intro";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Terms of Service",
    description:
      "Read the NexSkale terms of service. A clear legal foundation and expectations for working together.",
    alternates: {
      canonical: "/terms",
    },
    openGraph: {
      title: `Terms of Service | ${c.brand.name}`,
      description: "A clear foundation for working together.",
      url: "/terms",
      siteName: c.brand.name,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Terms of Service | ${c.brand.name}`,
      description: "A clear foundation for working together.",
    },
  };
}

export default async function TermsPage() {
  const c = await getContent();

  return (
    <>
      <SiteMotion revision="terms" />
      <div className="dark-top" id="home">
        <Header
          brandName={c.brand.name}
          navigation={c.navigation}
          currentPage="terms"
        />
        <PageIntro
          eyebrow="NexSkale"
          title="Terms of service"
          description="A clear foundation for working together."
          variant="legal"
        />
      </div>
      <main>
        <section className="container section legal-page article-body">
          <h2>Using this website</h2>
          <p>
            This website introduces NexSkale’s services and illustrative
            product concepts. Content is provided for general information.
          </p>
          <h2>Working together</h2>
          <p>
            Sending an enquiry does not create a service agreement. Scope,
            pricing, timelines and deliverables are agreed separately before
            work begins.
          </p>
          <p>
            For questions, contact{" "}
            <a href={`mailto:${c.brand.email}`}>{c.brand.email}</a>.
          </p>
        </section>
      </main>
      <Footer content={c} />
    </>
  );
}
