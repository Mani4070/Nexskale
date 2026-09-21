import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SiteMotion from "@/components/site-motion";
import PageIntro from "@/components/layout/page-intro";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Privacy Policy",
    description:
      "Read the NexSkale privacy policy. Learn how we collect, handle, and safeguard the information you share with us.",
    alternates: {
      canonical: "/privacy",
    },
    openGraph: {
      title: `Privacy Policy | ${c.brand.name}`,
      description: "How we handle the information you share with us.",
      url: "/privacy",
      siteName: c.brand.name,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Privacy Policy | ${c.brand.name}`,
      description: "How we handle the information you share with us.",
    },
  };
}

export default async function PrivacyPage() {
  const c = await getContent();

  return (
    <>
      <SiteMotion revision="privacy" />
      <div className="dark-top" id="home">
        <Header
          brandName={c.brand.name}
          navigation={c.navigation}
          currentPage="privacy"
        />
        <PageIntro
          eyebrow="NexSkale"
          title="Privacy policy"
          description="How we handle the information you share with us."
          variant="legal"
        />
      </div>
      <main>
        <section className="container section legal-page article-body">
          <h2>Information you share</h2>
          <p>
            When you submit an enquiry, we collect the name, email address and
            project details you provide so we can respond. Newsletter
            subscriptions store your email address.
          </p>
          <h2>Your choices</h2>
          <p>
            Contact us at{" "}
            <a href={`mailto:${c.brand.email}`}>{c.brand.email}</a> to request
            access to or deletion of your submitted information, or to
            unsubscribe. This website does not use advertising trackers.
          </p>
        </section>
      </main>
      <Footer content={c} />
    </>
  );
}
