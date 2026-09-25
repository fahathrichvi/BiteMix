import { HomeHeartIcon, LeafIcon, ShieldCheckIcon, FlameIcon } from "./icons";
import { Reveal } from "./Reveal";

const features = [
  { title: "புதிய பொருட்கள்", text: "ஒவ்வொரு தொகுதிக்கும் புதிதாக வாங்கிய பொருட்கள்", Icon: LeafIcon },
  { title: "வீட்டில் தயாரிப்பு", text: "எங்கள் வீட்டுச் சமையலறையில் கவனத்துடன்", Icon: HomeHeartIcon },
  { title: "சிறந்த சுவை", text: "தலைமுறைகளாகப் பழகிய பாரம்பரியச் சுவை", Icon: FlameIcon },
  { title: "தரமான உணவு", text: "சுத்தமான தயாரிப்பு, பாதுகாப்பான பொதி", Icon: ShieldCheckIcon },
];

export function TrustFeatures() {
  return (
    <section aria-label="எங்கள் உறுதிமொழிகள்" className="relative z-10 -mt-16 lg:-mt-20">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-2 rounded-[1.75rem] bg-cream-50 p-2.5 shadow-lift sm:grid-cols-2 sm:gap-4 sm:p-4 xl:grid-cols-4 xl:gap-0 xl:p-2">
          {features.map(({ title, text, Icon }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 80}
              className="flex flex-col items-center gap-2.5 rounded-2xl bg-cream-100/70 px-2 py-4 text-center sm:flex-row sm:items-start sm:gap-4 sm:bg-transparent sm:p-5 sm:text-left xl:rounded-none xl:border-l xl:border-cream-300 xl:first:border-l-0"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-800/[0.07] text-forest-800">
                <Icon size={26} />
              </span>
              <span>
                <strong className="block font-display text-[0.98rem] font-bold leading-snug text-brown-900 sm:text-lg">{title}</strong>
                <span className="mt-0.5 hidden text-[0.95rem] leading-relaxed text-brown-600 sm:block">{text}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
