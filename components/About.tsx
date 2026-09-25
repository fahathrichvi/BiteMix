import Image from "next/image";
import aboutImage from "@/public/images/about-kitchen.png";
import { AboutMore } from "./AboutMore";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-x-clip py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rotate-[-4deg] rounded-[48%_52%_40%_60%/55%_40%_60%_45%] bg-terracotta-500/15 sm:-inset-6"
          />
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src={aboutImage}
              alt="வாழை இலையில் மண் சட்டியில் இறைச்சி சம்பல், தேங்காய், மிளகாய்த் தூள், மஞ்சள், மிளகு, கறிவேப்பிலை மற்றும் கறுவாப்பட்டை"
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 92vw"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-6 right-4 grid size-28 place-items-center rounded-full bg-saffron-400 text-center shadow-lift sm:-right-6 sm:size-32">
            <span className="px-3 font-display text-[0.95rem] font-bold leading-snug text-brown-900 sm:text-base">
              வீட்டுச்
              <br />
              சமையல்
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">எங்களைப் பற்றி</p>
          <h2 id="about-title" className="mt-3 text-4xl font-bold text-brown-900 sm:text-5xl">
            எங்கள் கதை
          </h2>
          <div className="mt-6 space-y-5 text-lg text-brown-600">
            <p>
              <strong className="font-semibold text-brown-900">BITE MIX</strong> ஒரு சிறிய வீட்டுச் சமையலறையில் தொடங்கியது. குடும்பத்துக்காகச் செய்த இறைச்சி சம்பலும் முறுக்கும் நண்பர்களும் உறவினர்களும் மீண்டும் மீண்டும் கேட்கும் உணவுகளாக மாறின.
            </p>
            <p>
              இன்று அதே செய்முறைகளை, அதே பக்குவத்துடன் உங்கள் வீட்டுக்குக் கொண்டு வருகிறோம். தரமான பொருட்களைத் தேர்ந்தெடுத்து, சிறு தொகுதிகளாக, சுத்தமாகத் தயாரிக்கிறோம்.
            </p>
          </div>
          <AboutMore />
        </Reveal>
      </div>
    </section>
  );
}
