"use client";

import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/data/products";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

export function ProductGrid() {
  const [active, setActive] = useState<Category["id"]>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    for (const p of products) for (const id of p.categories) c[id] = (c[id] ?? 0) + 1;
    return c;
  }, []);

  const visible = active === "all" ? products : products.filter((p) => p.categories.includes(active));
  const activeLabel = categories.find((c) => c.id === active)?.label;

  return (
    <section id="products" aria-labelledby="products-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="products-title"
          eyebrow="எங்கள் உணவுகள்"
          title="எங்கள் பிரபலமான உணவுகள்"
          subtitle="அன்புடன் தயாரிக்கப்பட்ட பாரம்பரிய சுவைகள் — அளவைத் தேர்வு செய்து WhatsApp மூலம் நேரடியாக ஆர்டர் செய்யுங்கள்."
        />

        <div className="mt-8 sm:mt-10">
          <CategoryFilter categories={categories} active={active} counts={counts} onChange={setActive} />
        </div>

        <p className="sr-only" aria-live="polite">
          {activeLabel}: {visible.length} உணவுகள் காட்டப்படுகின்றன
        </p>

        {/* Re-keyed on filter change so the cards replay their entrance animation. */}
        <ul key={active} className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <li key={p.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
