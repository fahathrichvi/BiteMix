"use client";

import { useState } from "react";
import { ArrowRightIcon } from "./icons";

const values = [
  { k: "சிறு தொகுதிகள்", v: "ஒவ்வொரு தொகுதியும் புதிதாக" },
  { k: "குடும்பச் செய்முறைகள்", v: "வீட்டில் பழகிய அதே பக்குவம்" },
  { k: "சுத்தமான பொதி", v: "பாதுகாப்பாக, சீல் செய்து" },
];

export function AboutMore() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-8">
      <div id="about-more" hidden={!open} className="mb-8 animate-fade-up">
        <p className="text-lg text-brown-600">
          எங்களுக்கு உணவு என்பது வியாபாரம் மட்டுமல்ல — அது பகிர்வு. பண்டிகைகள், விருந்துகள், வெளிநாட்டில் இருக்கும் உறவுகளுக்கு அனுப்பும் பொதிகள் — எல்லாவற்றிலும் வீட்டின் சுவை இருக்க வேண்டும் என்பதே எங்கள் நோக்கம்.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {values.map(({ k, v }) => (
            <div key={k} className="rounded-2xl bg-cream-50 p-4 shadow-soft">
              <dt className="font-display font-bold text-forest-800">{k}</dt>
              <dd className="mt-1 text-[0.95rem] leading-relaxed text-brown-600">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="about-more"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-outline group"
      >
        {open ? "குறைவாகக் காட்டு" : "மேலும் அறிய"}
        <ArrowRightIcon size={20} className={`transition-transform ${open ? "-rotate-90" : "rotate-90"}`} />
      </button>
    </div>
  );
}
