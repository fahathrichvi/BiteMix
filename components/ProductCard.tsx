"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { categories, formatPrice, type Product } from "@/data/products";
import { productOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));

/**
 * Phones: compact card — thumbnail beside the name, sizes below, price and
 * order button on one row. Tablet and up: tall card with a large photo.
 */
export function ProductCard({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const uid = useId();
  const variant = product.variants[selected];
  const headingId = `${uid}-name`;
  const category = categoryLabel[product.categories[0]];

  return (
    <article
      aria-labelledby={headingId}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-cream-50 p-3.5 shadow-soft ring-1 ring-brown-800/[0.06] transition-[transform,box-shadow] duration-300 sm:p-0 sm:hover:-translate-y-1.5 sm:hover:shadow-lift"
    >
      <div className="flex gap-3 min-[360px]:gap-4 sm:block">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-cream-200 min-[360px]:size-[7.5rem] min-[400px]:size-32 sm:aspect-[4/3] sm:size-auto sm:w-full sm:rounded-none">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1280px) 25rem, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 8rem"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span className="absolute left-3 top-3 hidden rounded-full bg-cream-50/92 px-3 py-0.5 text-[0.8rem] font-semibold text-brown-800 backdrop-blur sm:block">
            {category}
          </span>
          {product.badge && (
            <span className="absolute bottom-3 left-3 hidden rounded-full bg-maroon-700 px-3 py-0.5 text-[0.8rem] font-semibold text-cream-50 sm:block">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center sm:block sm:px-6 sm:pt-6">
          <p className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] font-semibold sm:hidden">
            <span className="text-terracotta-600">{category}</span>
            {product.badge && (
              <span className="rounded-full bg-maroon-700 px-2 py-px text-[0.72rem] text-cream-50">{product.badge}</span>
            )}
          </p>
          <h3 id={headingId} className="text-[1.1rem] font-bold leading-snug text-brown-900 min-[360px]:text-[1.2rem] sm:text-[1.35rem]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-3 text-[0.92rem] leading-relaxed text-brown-600 sm:mt-1.5 sm:line-clamp-none sm:text-[0.98rem]">
            {product.description}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4 sm:px-6 sm:pb-6 sm:pt-5">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-brown-600 max-sm:sr-only">அளவைத் தேர்வு செய்யுங்கள்</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, i) => {
              const id = `${uid}-v${i}`;
              return (
                <label
                  key={v.label}
                  htmlFor={id}
                  className="relative inline-flex min-h-10 cursor-pointer items-center rounded-xl border border-cream-300 bg-white/60 px-3 text-[0.92rem] font-semibold text-brown-800 transition-colors hover:border-brown-500 has-[:checked]:border-forest-800 has-[:checked]:bg-forest-800 has-[:checked]:text-cream-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-saffron-500"
                >
                  <input
                    id={id}
                    type="radio"
                    name={`${uid}-size`}
                    className="sr-only"
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                  />
                  {v.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-cream-300 pt-3.5 sm:mt-auto sm:flex-col sm:items-stretch sm:border-0 sm:pt-6">
          <p className="leading-tight">
            <span className="hidden text-sm text-brown-600 sm:block">{variant.label}</span>
            <span className="font-brand text-[1.45rem] font-bold text-terracotta-600 sm:text-[1.6rem]" aria-live="polite">
              {formatPrice(variant.price)}
            </span>
          </p>
          <a
            href={whatsappLink(productOrderMessage(product, variant))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${product.name} ${variant.label} — WhatsApp மூலம் ஆர்டர் செய்ய`}
            className="btn btn-wa shrink-0 whitespace-nowrap !min-h-12 !px-5 sm:w-full"
          >
            <WhatsAppIcon size={20} />
            <span className="sm:hidden">ஆர்டர்</span>
            <span className="hidden sm:inline">WhatsApp மூலம் ஆர்டர்</span>
          </a>
        </div>
      </div>
    </article>
  );
}
