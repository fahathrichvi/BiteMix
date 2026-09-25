import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp order button, always within thumb reach. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(generalOrderMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp-ல் ஆர்டர் செய்யுங்கள்"
      className="wa-pulse group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-wa-600 p-3.5 text-white shadow-[0_12px_30px_-8px_rgb(17_112_60/0.65)] transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-wa-700 sm:right-6 sm:bottom-6 sm:py-3.5 sm:pl-4 sm:pr-5"
    >
      <WhatsAppIcon size={30} />
      <span className="hidden font-semibold sm:inline">ஆர்டர் செய்ய</span>
    </a>
  );
}
