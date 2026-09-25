import Image from "next/image";
import heroImage from "@/public/images/hero-spread.png";
import { products } from "@/data/products";
import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { ArrowRightIcon, DecoLeaf, WhatsAppIcon } from "./icons";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]">
      {/* Background: soft kolam dots and an organic cream blob */}
      <div aria-hidden="true" className="kolam-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div
        aria-hidden="true"
        className="absolute -right-[20%] top-[8%] h-[46rem] w-[46rem] rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-cream-200 lg:-right-[8%]"
      />

      <DecoLeaf className="absolute left-[4%] top-[18%] hidden w-7 animate-float-slow text-leaf-500/50 [--r:-25deg] md:block" />
      <DecoLeaf className="absolute bottom-[20%] left-[44%] hidden w-5 animate-float text-terracotta-500/40 [--r:30deg] lg:block" />

      <div className="container-page relative grid items-center gap-10 pb-28 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-36 lg:pt-16">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="eyebrow animate-fade-up max-lg:rounded-full max-lg:bg-terracotta-500/10 max-lg:px-4 max-lg:py-1.5 max-lg:text-[0.85rem] max-lg:leading-snug max-lg:before:hidden">அன்புடன் வீட்டில் தயாரிக்கப்பட்ட பாரம்பரிய உணவுகள்</p>
          <h1
            id="hero-title"
            className="mt-5 animate-fade-up text-[2.2rem] font-bold min-[400px]:text-[2.5rem] leading-[1.3] text-brown-900 [animation-delay:80ms] sm:text-5xl lg:text-[3.6rem]"
          >
            வீட்டின் சுவை,
            <br />
            <span className="relative inline-block text-forest-800">
              உங்கள் வாசலில்
              <svg
                aria-hidden="true"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-saffron-400"
              >
                <path d="M3 11C70 3 180 2 297 9" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-md animate-fade-up text-[1.05rem] text-brown-600 lg:mx-0 lg:max-w-none sm:text-lg lg:text-xl [animation-delay:160ms]">
            அன்புடன் வீட்டில் தயாரிக்கப்பட்ட பாரம்பரிய இலங்கை உணவுகளின் உண்மையான சுவையை அனுபவிக்குங்கள்.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <a
              href={whatsappLink(generalOrderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !min-h-14 !px-5 text-center text-base sm:!px-7 sm:text-[1.05rem]"
            >
              <WhatsAppIcon size={22} />
              இப்போதே ஆர்டர் செய்யுங்கள்
            </a>
            <a href="#products" className="btn btn-outline group !min-h-14 !px-5 text-center text-base sm:!px-7 sm:text-[1.05rem]">
              உணவுகளைப் பாருங்கள்
              <ArrowRightIcon size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <p className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-x-4 lg:justify-start gap-y-1 text-[0.95rem] font-medium text-brown-600 [animation-delay:320ms]">
            {["புதிய பொருட்கள்", "வீட்டில் தயாரிப்பு", "தரமான சுவை"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-terracotta-500" />
                {t}
              </span>
            ))}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] animate-fade-up [animation-delay:200ms] lg:max-w-none">
          <Image
            src={heroImage}
            alt="பின்னப்பட்ட முறத்தில் வாழை இலையின் மேல் இறைச்சி சம்பல், முறுக்கு, லட்டு மற்றும் வட்டலப்பம் நிறைந்த கிண்ணங்கள்"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 34rem, 92vw"
            className="h-auto w-full drop-shadow-[0_30px_40px_rgba(59,36,22,0.18)]"
          />
          <div className="absolute -bottom-3 left-1/2 flex w-max -translate-x-1/2 items-center gap-3 rounded-2xl bg-cream-50/95 px-4 py-3 text-left shadow-soft backdrop-blur sm:bottom-6 sm:left-4 sm:translate-x-0">
            <span className="grid size-11 place-items-center rounded-full bg-forest-800 font-brand text-lg font-bold text-saffron-400">
              {products.length}
            </span>
            <span className="text-sm leading-snug text-brown-800">
              <strong className="block text-[0.95rem]">பாரம்பரிய உணவுகள்</strong>
              ஒவ்வொன்றும் வீட்டில் தயாரிப்பு
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
