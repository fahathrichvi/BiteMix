import Image from "next/image";
import bannerImage from "@/public/images/banner-spread.png";
import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";

export function FeaturedBanner() {
  return (
    <section aria-labelledby="banner-title" className="py-6 sm:py-10">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brown-900 sm:rounded-[2.5rem]">
          <Image
            src={bannerImage}
            alt=""
            placeholder="blur"
            sizes="(min-width: 1280px) 78rem, 100vw"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-90"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-brown-900 via-brown-900/85 to-brown-900/30 md:bg-gradient-to-r md:from-brown-900 md:via-brown-900/85 md:to-transparent"
          />
          <Reveal className="max-w-2xl px-6 py-16 sm:px-12 sm:py-24 lg:px-16 lg:py-28">
            <h2 id="banner-title" className="text-[2.1rem] font-bold leading-[1.35] text-cream-50 sm:text-5xl">
              பாரம்பரிய சுவை.
              <br />
              புதிய தயாரிப்பு.
              <br />
              <span className="font-brand tracking-wide text-saffron-400">BITE MIX.</span>
            </h2>
            <p className="mt-6 text-lg text-cream-200/90 sm:text-xl">உங்கள் குடும்பத்துடன் பகிர்ந்து மகிழுங்கள்.</p>
            <a
              href={whatsappLink(generalOrderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent mt-9 w-full text-center !min-h-14 !px-5 text-base sm:w-auto sm:!px-7 sm:text-[1.05rem]"
            >
              <WhatsAppIcon size={22} />
              இன்றே ஆர்டர் செய்யுங்கள்
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
