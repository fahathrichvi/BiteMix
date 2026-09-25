import type { Category } from "@/data/products";

type Props = {
  categories: Category[];
  active: Category["id"];
  counts: Record<string, number>;
  onChange: (id: Category["id"]) => void;
};

export function CategoryFilter({ categories, active, counts, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="உணவு வகைகளின்படி வடிகட்டவும்"
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [mask-image:linear-gradient(to_right,black_82%,transparent)] sm:mx-0 sm:[mask-image:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
      {categories.map((c) => {
        const isActive = c.id === active;
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(c.id)}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[0.95rem] font-semibold transition-all duration-200 sm:px-5 ${
              isActive
                ? "border-forest-800 bg-forest-800 text-cream-50 shadow-[0_8px_18px_-10px_rgb(20_42_29/0.8)]"
                : "border-cream-300 bg-cream-50 text-brown-600 hover:border-brown-500 hover:text-brown-900"
            }`}
          >
            {c.label}
            <span
              className={`rounded-full px-2 text-[0.8rem] leading-5 ${isActive ? "bg-cream-50/15 text-cream-100" : "bg-cream-200 text-brown-600"}`}
            >
              {counts[c.id] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
