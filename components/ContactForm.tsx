"use client";

import { useState, type FormEvent } from "react";
import { inquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

type Fields = { name: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", phone: "", message: "" };

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.";
  const digits = v.phone.replace(/[\s()+-]/g, "");
  if (!/^\d{9,15}$/.test(digits)) e.phone = "சரியான தொலைபேசி எண்ணை உள்ளிடவும் (எ.கா. 077 123 4567).";
  if (v.message.trim().length < 5) e.message = "தயவுசெய்து உங்கள் செய்தியை எழுதவும்.";
  return e;
}

/**
 * Inquiry form. There is no backend: on a valid submit the inquiry opens in
 * WhatsApp, pre-filled, so no API keys or private endpoints live in the frontend.
 */
export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    setSent(false);
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    window.open(
      whatsappLink(inquiryMessage(values.name.trim(), values.phone.trim(), values.message.trim())),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
    setValues(empty);
  }

  const field =
    "mt-2 block w-full rounded-xl border bg-white/80 px-4 py-3 text-base text-brown-900 placeholder:text-brown-500/70 transition-colors focus:border-forest-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-forest-800/10";
  const border = (k: keyof Fields) => (errors[k] ? "border-maroon-700" : "border-cream-300");

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="form-title"
      className="rounded-[1.75rem] bg-cream-50 p-6 shadow-lift ring-1 ring-brown-800/[0.05] sm:p-9"
    >
      <h3 id="form-title" className="text-2xl font-bold text-brown-900">
        செய்தி அனுப்புங்கள்
      </h3>
      <p className="mt-1 text-brown-600">உங்கள் செய்தி WhatsApp மூலம் எங்களுக்கு நேரடியாக வந்து சேரும்.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="font-semibold text-brown-800">
            பெயர் <span aria-hidden="true" className="text-maroon-700">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={update("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            className={`${field} ${border("name")}`}
            placeholder="உங்கள் பெயர்"
          />
          {errors.name && (
            <p id="cf-name-err" className="mt-1.5 text-sm font-medium text-maroon-700">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-phone" className="font-semibold text-brown-800">
            தொலைபேசி எண் <span aria-hidden="true" className="text-maroon-700">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
            className={`${field} ${border("phone")}`}
            placeholder="077 123 4567"
          />
          {errors.phone && (
            <p id="cf-phone-err" className="mt-1.5 text-sm font-medium text-maroon-700">
              {errors.phone}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="font-semibold text-brown-800">
            செய்தி <span aria-hidden="true" className="text-maroon-700">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={update("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cf-message-err" : undefined}
            className={`${field} ${border("message")} resize-y`}
            placeholder="நீங்கள் அறிய விரும்புவதை எழுதுங்கள்…"
          />
          {errors.message && (
            <p id="cf-message-err" className="mt-1.5 text-sm font-medium text-maroon-700">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-7 w-full !min-h-14 text-[1.05rem] sm:w-auto sm:!px-10">
        <WhatsAppIcon size={20} />
        அனுப்பவும்
      </button>

      <p role="status" className="mt-4 min-h-[1.5rem] text-[0.95rem] font-medium text-forest-700">
        {sent && "நன்றி! WhatsApp திறக்கப்பட்டது — செய்தியை அனுப்பினால் விரைவில் பதிலளிப்போம்."}
      </p>
    </form>
  );
}
