import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

const quickLinks = [
  { href: "#home", label: "முகப்பு" },
  { href: "#products", label: "உணவுகள்" },
  { href: "#about", label: "எங்களைப் பற்றி" },
  { href: "#contact", label: "தொடர்பு" },
];

const socials = [
  { label: "WhatsApp", href: whatsappLink(), Icon: WhatsAppIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-cream-200">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(90deg,var(--color-saffron-400)_0_24px,var(--color-terracotta-500)_24px_48px,var(--color-maroon-700)_48px_72px)]"
      />
      <div className="container-page grid gap-10 py-14 text-center sm:grid-cols-2 sm:gap-12 sm:py-16 sm:text-left lg:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div className="flex flex-col items-center sm:items-start">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs font-display text-xl text-cream-50">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-sm text-cream-200/75">{siteConfig.subTagline}</p>
        </div>

        <nav aria-label="அடிக்குறிப்பு இணைப்புகள்">
          <h2 className="font-display text-lg font-bold text-cream-50">விரைவு இணைப்புகள்</h2>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-5 sm:mt-4 sm:block sm:space-y-1">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block py-1.5 text-cream-200/85 transition-colors hover:text-saffron-400">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-bold text-cream-50">எங்களைப் பின்தொடருங்கள்</h2>
          <ul className="mt-5 flex justify-center gap-3 sm:justify-start">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-12 place-items-center rounded-full bg-cream-50/[0.08] text-cream-50 ring-1 ring-cream-50/10 transition-colors hover:bg-saffron-400 hover:text-brown-900"
                >
                  <Icon size={22} />
                </a>
              </li>
            ))}
          </ul>
          <a href={siteConfig.phoneHref} className="mt-6 inline-block py-2 text-cream-200/85 hover:text-saffron-400" dir="ltr">
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="border-t border-cream-50/10">
        <div className="container-page flex flex-col items-center gap-1.5 pb-24 pt-6 text-center text-[0.9rem] text-cream-200/70 sm:flex-row sm:justify-between sm:pb-6 sm:text-left">
          <p>© {new Date().getFullYear()} {siteConfig.name}. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
          <p>
            உருவாக்கியவர்:{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cream-100 underline-offset-4 transition-colors hover:text-saffron-400 hover:underline"
            >
              {siteConfig.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
