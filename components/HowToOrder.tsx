import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { BasketIcon, TruckIcon, WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "உணவைத் தேர்வு செய்யுங்கள்",
    text: "எங்கள் உணவுப் பட்டியலில் விரும்பிய உணவையும் அளவையும் தேர்வு செய்யுங்கள்.",
    Icon: BasketIcon,
  },
  {
    title: "WhatsApp மூலம் ஆர்டர் செய்யுங்கள்",
    text: "“ஆர்டர்” பொத்தானை அழுத்தினால் விவரங்களுடன் செய்தி தயாராகிவிடும் — அனுப்பினால் போதும்.",
    Icon: WhatsAppIcon,
  },
  {
    title: "உங்கள் ஆர்டரைப் பெற்றுக்கொள்ளுங்கள்",
    text: "விலை, விநியோக விவரங்களை உறுதிசெய்த பின் புதிதாகத் தயாரித்து உங்களிடம் சேர்ப்போம்.",
    Icon: TruckIcon,
  },
];

export function HowToOrder() {
  return (
    <section aria-labelledby="how-title" className="relative bg-cream-200/60 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="how-title"
          eyebrow="மூன்று எளிய படிகள்"
          title="ஆர்டர் செய்வது எப்படி?"
          subtitle="கணக்கு உருவாக்க வேண்டாம், செயலி பதிவிறக்க வேண்டாம் — WhatsApp மட்டும் போதும்."
        />

        <ol className="relative mx-auto mt-12 grid max-w-md gap-9 sm:mt-14 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {/* Connector: vertical timeline on phones/tablets, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-8 top-10 border-l-2 border-dashed border-brown-500/30 lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-10 hidden border-t-2 border-dashed border-brown-500/30 lg:block"
          />
          {steps.map(({ title, text, Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 120} className="relative flex items-start gap-4 min-[400px]:gap-5 lg:block lg:text-center">
              <div className="relative grid size-16 shrink-0 place-items-center rounded-full bg-cream-50 text-forest-800 shadow-soft ring-8 ring-cream-100 lg:mx-auto lg:size-20">
                <Icon size={28} />
                <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-terracotta-500 font-brand text-xs font-bold text-cream-50 lg:-right-1 lg:-top-1 lg:size-8 lg:text-sm">
                  0{i + 1}
                </span>
              </div>
              <div className="min-w-0 pt-1 lg:pt-0">
                <h3 className="text-[1.05rem] font-bold leading-snug min-[400px]:text-lg text-brown-900 lg:mx-auto lg:mt-6 lg:max-w-[18rem] lg:text-xl">{title}</h3>
                <p className="mt-1.5 text-[0.98rem] text-brown-600 lg:mx-auto lg:mt-2 lg:max-w-xs lg:text-base">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 text-center">
          <a
            href={whatsappLink(generalOrderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa w-full !min-h-14 !px-6 text-base sm:w-auto sm:!px-8 sm:text-[1.05rem]"
          >
            <WhatsAppIcon size={22} />
            WhatsApp-ல் ஆர்டர் செய்யுங்கள்
          </a>
        </Reveal>
      </div>
    </section>
  );
}
