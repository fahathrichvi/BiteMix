import { siteConfig } from "@/config/site";
import { formatPrice, type Product, type Variant } from "@/data/products";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productOrderMessage(product: Product, variant: Variant) {
  return [
    `வணக்கம் ${siteConfig.name} 👋`,
    "",
    "எனக்கு இந்த உணவை ஆர்டர் செய்ய வேண்டும்:",
    "",
    `உணவு: ${product.name}`,
    `அளவு: ${variant.label}`,
    `விலை: ${formatPrice(variant.price)}`,
    "",
    "தயவுசெய்து ஆர்டர் விவரங்களை தெரிவிக்கவும்.",
  ].join("\n");
}

export const generalOrderMessage = [
  `வணக்கம் ${siteConfig.name} 👋`,
  "",
  "உங்கள் உணவுகளை ஆர்டர் செய்ய விரும்புகிறேன். கிடைக்கும் உணவுகள் மற்றும் விலை விவரங்களை தெரிவிக்கவும்.",
].join("\n");

export function inquiryMessage(name: string, phone: string, message: string) {
  return [
    `வணக்கம் ${siteConfig.name} 👋`,
    "",
    `பெயர்: ${name}`,
    `தொலைபேசி: ${phone}`,
    "",
    message,
  ].join("\n");
}
