import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { ContactForm } from "./ContactForm";
import { FacebookIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const channels = [
  {
    label: "WhatsApp",
    value: siteConfig.phoneDisplay,
    href: whatsappLink(),
    Icon: WhatsAppIcon,
    tone: "bg-wa-600 text-white",
    external: true,
  },
  {
    label: "தொலைபேசி",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
    Icon: PhoneIcon,
    tone: "bg-forest-800 text-cream-50",
    external: false,
  },
  {
    label: "Instagram",
    value: "@" + siteConfig.social.instagram.split("/").filter(Boolean).pop(),
    href: siteConfig.social.instagram,
    Icon: InstagramIcon,
    tone: "bg-terracotta-600 text-cream-50",
    external: true,
  },
  {
    label: "Facebook",
    value: siteConfig.name,
    href: siteConfig.social.facebook,
    Icon: FacebookIcon,
    tone: "bg-brown-600 text-cream-50",
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-cream-200/60 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          eyebrow="தொடர்பு"
          title="எங்களை தொடர்பு கொள்ளுங்கள்"
          subtitle="சிறப்பு ஆர்டர்கள், விருந்து ஆர்டர்கள் அல்லது கேள்விகள் — எதுவாக இருந்தாலும் தயங்காமல் கேளுங்கள்."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <Reveal as="ul" className="grid grid-cols-2 content-start gap-3 lg:grid-cols-1">
            {channels.map(({ label, value, href, Icon, tone, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col items-center gap-2.5 rounded-2xl bg-cream-50 px-2 py-5 text-center shadow-soft sm:flex-row sm:gap-4 sm:p-5 sm:text-left ring-1 ring-brown-800/[0.05] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${tone}`}>
                    <Icon size={24} />
                  </span>
                  <span className="w-full min-w-0 leading-snug">
                    <span className="block text-sm text-brown-600">{label}</span>
                    <strong className="block truncate text-[0.9rem] font-semibold text-brown-900 sm:text-base" dir="ltr">
                      {value}
                    </strong>
                  </span>
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
