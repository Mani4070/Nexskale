import { Cloud, Sparkles, Triangle, Zap, Leaf } from "lucide-react";

type PartnersSectionProps = {
  partners: readonly string[] | string[];
};

export default function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section className="partners">
      <div className="container">
        <div className="eyebrow">The technologies behind what we build</div>
        <div className="partner-list">
          {partners.map((p, i) => (
            <span key={p} className={`partner partner-${i}`}>
              {i === 2 ? (
                <Cloud />
              ) : i === 3 ? (
                <Sparkles />
              ) : i === 4 ? (
                <Triangle fill="currentColor" />
              ) : i === 5 ? (
                <Zap fill="currentColor" />
              ) : i === 6 ? (
                <Leaf fill="currentColor" />
              ) : null}
              {p}
              {i === 1 && <span className="aws-smile" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
