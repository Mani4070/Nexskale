import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "light" | "dark";
export type LogoMode = "auto" | "full" | "icon";

export interface LogoProps {
  name?: string;
  variant?: LogoVariant;
  mode?: LogoMode;
  height?: number;
  className?: string;
  href?: string;
  asLink?: boolean;
  priority?: boolean;
}

export default function Logo({
  name = "NexSkale",
  variant = "light",
  mode = "auto",
  height = 36,
  className = "",
  href = "/",
  asLink = true,
  priority = true,
}: LogoProps) {
  const isLight = variant === "light";
  const fullSrc = isLight
    ? "/images/logo/logo-light.png"
    : "/images/logo/logo-dark.png";

  // Aspect ratios based on trimmed master assets:
  // logo-light: 1275 x 309 (~4.126)
  // logo-dark: 1256 x 308 (~4.078)
  // mobile-logo: 748 x 507 (~1.475)
  const fullWidth = Math.round(height * (isLight ? 4.126 : 4.078));
  const mobileWidth = Math.round(height * 1.475);

  const content = (
    <>
      {(mode === "auto" || mode === "full") && (
        <Image
          src={fullSrc}
          alt={name}
          width={fullWidth}
          height={height}
          priority={priority}
          className={`logo-img logo-full ${mode === "auto" ? "logo-desktop-only" : ""}`}
        />
      )}
      {(mode === "auto" || mode === "icon") && (
        <Image
          src="/images/logo/mobile-logo.png"
          alt={name}
          width={mobileWidth}
          height={height}
          priority={priority}
          className={`logo-img logo-mobile ${mode === "auto" ? "logo-mobile-only" : ""}`}
        />
      )}
      <span className="sr-only">{name}</span>
    </>
  );

  const containerClasses = `logo logo-${variant} ${mode === "auto" ? "logo-responsive" : ""} ${className}`.trim();

  if (!asLink) {
    return <span className={containerClasses}>{content}</span>;
  }

  return (
    <Link className={containerClasses} href={href} aria-label={`${name} home`}>
      {content}
    </Link>
  );
}

