import Image from "next/image";
import logo from "@/public/brand/bite-mix-logo.png";

type Props = {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
};

/**
 * BITE MIX brand logo. Generated from scripts/brand/logo-source.png (npm run logo).
 * On dark backgrounds it sits on a cream badge so the brown lettering stays legible.
 */
export function Logo({ tone = "dark", className = "size-14 sm:size-16", priority = false }: Props) {
  const img = (
    <Image
      src={logo}
      alt="BITE MIX"
      priority={priority}
      sizes="(min-width: 640px) 96px, 72px"
      className={tone === "light" ? "size-full" : `${className} object-contain`}
    />
  );

  if (tone === "light") {
    return (
      <span className={`block rounded-full bg-cream-50 p-1.5 shadow-lift ring-1 ring-cream-50/10 ${className}`}>
        {img}
      </span>
    );
  }
  return img;
}
