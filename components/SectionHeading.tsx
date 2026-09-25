import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, subtitle, id, align = "center", tone = "light" }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      <p className={`eyebrow ${tone === "dark" ? "!text-saffron-400" : ""}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-3 text-[1.42rem] font-bold min-[360px]:text-[1.6rem] min-[400px]:text-[1.85rem] sm:text-4xl lg:text-[2.6rem] ${tone === "dark" ? "text-cream-50" : "text-brown-900"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${tone === "dark" ? "text-cream-200/85" : "text-brown-600"}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}
