import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function InteriorBanner({
  eyebrow,
  title,
  highlight,
  description,
  image,
  imageAlt,
  action,
  href,
  index,
  topics,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
  action: string;
  href: string;
  index: string;
  topics: string[];
}) {
  return (
    <section className="interior-banner">
      <Image
        className="interior-banner-image"
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
      />
      <div className="interior-banner-shade" />
      <div className="interior-wrap interior-banner-body">
        <div className="interior-banner-copy">
          <span className="interior-kicker">{eyebrow}</span>
          <h1>
            {title}
            <br />
            <span>{highlight}</span>
          </h1>
          <p>{description}</p>
          <Link className="interior-button" href={href}>
            {action}
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="interior-banner-bottom">
          <div className="interior-banner-topics">
            {topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
          <a href={index} className="interior-banner-scroll">
            <ArrowDown size={16} />
            <span>Scroll to explore</span>
          </a>
        </div>
      </div>
    </section>
  );
}
