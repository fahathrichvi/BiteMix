type Props = { tone?: "dark" | "light" };

/** BITE MIX wordmark with a leaf-in-bowl mark. */
export function Logo({ tone = "dark" }: Props) {
  const text = tone === "dark" ? "text-forest-800" : "text-cream-50";
  return (
    <span className={`flex items-center gap-2.5 ${text}`}>
      <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="20" className={tone === "dark" ? "fill-forest-800" : "fill-cream-50"} />
        <path d="M9 21h22a11 11 0 0 1-22 0Z" className="fill-saffron-400" />
        <path
          d="M20 19c-1-5 1-9 7-11 .8 6-2 10-7 11Z"
          className={tone === "dark" ? "fill-cream-100" : "fill-forest-700"}
        />
        <path d="M13 19c.2-3 2-5 5-5.5-.2 3-2 5-5 5.5Z" className="fill-terracotta-500" />
      </svg>
      <span className="font-brand text-[1.45rem] font-bold leading-none tracking-[0.04em]">
        BITE<span className="text-terracotta-500"> MIX</span>
      </span>
    </span>
  );
}
