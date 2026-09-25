/**
 * BITE MIX — central business configuration.
 * Change contact details, social links and the site URL here only;
 * every component reads from this file.
 */
export const siteConfig = {
  name: "BITE MIX",
  tagline: "வீட்டின் சுவை, உங்கள் வாசலில்",
  subTagline: "அன்புடன் வீட்டில் தயாரிக்கப்பட்ட பாரம்பரிய உணவுகள்",
  title: "BITE MIX | வீட்டில் தயாரிக்கப்பட்ட பாரம்பரிய உணவுகள்",
  description:
    "BITE MIX — அன்புடன் வீட்டில் தயாரிக்கப்பட்ட பாரம்பரிய இலங்கை உணவுகள். இறைச்சி சம்பல், முறுக்கு, லட்டு, வட்டலப்பம் மற்றும் பல வீட்டுச் சுவைகளை WhatsApp மூலம் எளிதாக ஆர்டர் செய்யுங்கள்.",

  /** Public site URL — used for canonical, Open Graph and sitemap. */
  url: "https://bitemix.lk",
  locale: "ta_LK",

  /**
   * WhatsApp number in international format, digits only
   * (country code + number, no "+", spaces or leading zero).
   * Example for 077 123 4567 in Sri Lanka → "94771234567".
   */
  whatsappNumber: "94771234567",

  /** Phone number shown to visitors, and its dialable form. */
  phoneDisplay: "+94 77 123 4567",
  phoneHref: "tel:+94771234567",

  social: {
    instagram: "https://www.instagram.com/bitemix",
    facebook: "https://www.facebook.com/bitemix",
  },

  developer: {
    name: "Fahath Richvi",
    url: "https://github.com/fahathrichvi",
  },

  currency: "LKR",
  currencyLabel: "Rs.",
} as const;

export const navLinks = [
  { id: "home", label: "முகப்பு" },
  { id: "about", label: "எங்களைப் பற்றி" },
  { id: "products", label: "உணவுகள்" },
  { id: "why", label: "சிறப்புகள்" },
  { id: "reviews", label: "வாடிக்கையாளர் கருத்துகள்" },
  { id: "contact", label: "தொடர்பு" },
] as const;
