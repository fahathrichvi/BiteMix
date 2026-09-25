import { DecoLeaf, HeartHandIcon, HomeHeartIcon, PotIcon, WheatIcon } from "./icons";
import { Reveal } from "./Reveal";

const reasons = [
  {
    title: "வீட்டிலேயே தயாரிக்கப்படுகிறது",
    text: "தொழிற்சாலை அல்ல — எங்கள் வீட்டுச் சமையலறையில், சிறு தொகுதிகளாக, நேரம் எடுத்துச் சமைக்கிறோம்.",
    Icon: HomeHeartIcon,
  },
  {
    title: "தேர்ந்தெடுக்கப்பட்ட தரமான பொருட்கள்",
    text: "இறைச்சி, மசாலா, எண்ணெய், தேங்காய் — ஒவ்வொன்றையும் நாமே பார்த்துத் தேர்ந்தெடுக்கிறோம்.",
    Icon: WheatIcon,
  },
  {
    title: "பாரம்பரிய இலங்கை சுவை",
    text: "வீட்டில் பழகிய செய்முறைகள், அதே பக்குவம், அதே மணம் — சுவையில் சமரசம் இல்லை.",
    Icon: PotIcon,
  },
  {
    title: "ஒவ்வொரு ஆர்டரும் அன்புடன் தயாரிக்கப்படுகிறது",
    text: "உங்கள் ஆர்டர் எங்கள் குடும்பத்துக்குச் சமைப்பது போலவே கவனமாகத் தயாராகிறது.",
    Icon: HeartHandIcon,
  },
];

export function WhyBiteMix() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden bg-forest-800 py-20 text-cream-100 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,#f7f0e3_1.3px,transparent_1.6px)] [background-size:26px_26px]"
      />
      <DecoLeaf className="absolute -right-6 top-10 w-24 rotate-[30deg] text-forest-700" />
      <DecoLeaf className="absolute -left-8 bottom-6 w-20 -rotate-[20deg] text-forest-700" />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow !text-saffron-400">எங்கள் சிறப்புகள்</p>
          <h2 id="why-title" className="mt-3 text-4xl font-bold text-cream-50 sm:text-5xl">
            ஏன் <span className="font-brand tracking-wide text-saffron-400">BITE MIX</span>?
          </h2>
          <p className="mt-5 max-w-md text-lg text-cream-200/85">
            கடையில் வாங்கும் உணவுக்கும் வீட்டில் செய்யும் உணவுக்கும் உள்ள வித்தியாசம் சுவையில் மட்டுமல்ல — அதில் இருக்கும் அக்கறையில்.
          </p>
          <a href="#products" className="btn btn-accent mt-8">
            உணவுகளைப் பாருங்கள்
          </a>
        </Reveal>

        <ol className="grid gap-x-10 sm:grid-cols-2">
          {reasons.map(({ title, text, Icon }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={(i % 2) * 100}
              className={`border-t border-cream-100/15 py-8 ${i % 2 === 1 ? "sm:mt-16" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-cream-50/[0.08] text-saffron-400 ring-1 ring-cream-50/10">
                  <Icon size={28} />
                </span>
                <span aria-hidden="true" className="font-brand text-4xl font-bold text-cream-50/15">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-[1.35rem] font-bold text-cream-50">{title}</h3>
              <p className="mt-2 text-cream-200/80">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
