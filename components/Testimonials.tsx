import { testimonials } from "@/data/testimonials";
import { StarIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const segmenter = new Intl.Segmenter("ta", { granularity: "grapheme" });
const initial = (name: string) => segmenter.segment(name)[Symbol.iterator]().next().value?.segment ?? "";

const avatarTones = ["bg-forest-800", "bg-terracotta-500", "bg-maroon-700", "bg-brown-600", "bg-leaf-500", "bg-saffron-500"];

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="reviews-title"
          eyebrow="வாடிக்கையாளர் கருத்துகள்"
          title="வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்?"
        />

        <Reveal>
          {/* Phones: swipeable row with snap points. Tablet and up: grid. */}
          <ul
            tabIndex={0}
            aria-label="வாடிக்கையாளர் கருத்துகள் — பக்கவாட்டில் நகர்த்திப் பாருங்கள்"
            className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-5 pt-1 sm:mt-14 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <li key={t.name} className="w-[84%] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none">
                <figure className="relative flex h-full flex-col rounded-[1.5rem] bg-cream-50 p-6 shadow-soft ring-1 ring-brown-800/[0.05] sm:p-7">
                  <span aria-hidden="true" className="absolute right-6 top-3 font-brand text-7xl leading-none text-cream-300">
                    &ldquo;
                  </span>
                  <div className="flex gap-0.5 text-saffron-500" role="img" aria-label={`5-க்கு ${t.rating} நட்சத்திரங்கள்`}>
                    {Array.from({ length: 5 }, (_, s) => (
                      <StarIcon key={s} filled={s < t.rating} />
                    ))}
                  </div>
                  <blockquote className="relative mb-6 mt-4 text-[1.02rem] leading-[1.85] text-brown-800">
                    <p>{t.review}</p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-cream-200 pt-5">
                    <span
                      aria-hidden="true"
                      className={`grid size-11 shrink-0 place-items-center rounded-full font-display text-lg font-bold text-cream-50 ${avatarTones[i % avatarTones.length]}`}
                    >
                      {initial(t.name)}
                    </span>
                    <span className="leading-tight">
                      <strong className="block font-display text-brown-900">{t.name}</strong>
                      <span className="text-sm text-brown-600">
                        {t.place} · {t.product}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p aria-hidden="true" className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-brown-500 md:hidden">
            <span className="h-px w-8 bg-brown-500/40" />
            பக்கவாட்டில் நகர்த்துங்கள்
            <span className="h-px w-8 bg-brown-500/40" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
