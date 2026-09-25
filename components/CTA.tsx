import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { DecoLeaf, WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section aria-labelledby="cta-title" className="pb-20 sm:pb-28">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-terracotta-600 px-4 py-12 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,#fcf8f1_1.3px,transparent_1.6px)] [background-size:24px_24px]"
          />
          <DecoLeaf className="absolute -left-4 -top-6 w-20 -rotate-[35deg] text-maroon-700/40 sm:w-28" />
          <DecoLeaf className="absolute -bottom-8 -right-2 w-24 rotate-[25deg] text-maroon-700/40 sm:w-32" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-title" className="text-[1.45rem] font-bold leading-[1.4] text-cream-50 min-[360px]:text-[1.75rem] min-[400px]:text-[1.95rem] sm:text-[2.75rem]">
              இன்றே <span className="whitespace-nowrap font-brand tracking-wide">BITE MIX</span> சுவையை அனுபவியுங்கள்!
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[1.05rem] text-cream-100/90 sm:max-w-none sm:text-xl">
              உங்கள் விருப்பமான வீட்டுச் சுவைகளை இப்போதே ஆர்டர் செய்யுங்கள்.
            </p>
            <a
              href={whatsappLink(generalOrderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-9 w-full !min-h-14 bg-cream-50 !px-4 text-base text-forest-800 !gap-2 text-center sm:w-auto sm:!gap-3 sm:!px-8 sm:text-[1.05rem] shadow-lift hover:-translate-y-0.5 hover:bg-white"
            >
              <WhatsAppIcon size={22} className="text-wa-600" />
              WhatsApp-ல் ஆர்டர் செய்யுங்கள்
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
