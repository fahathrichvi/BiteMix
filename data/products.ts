/**
 * BITE MIX product catalogue.
 * Add, remove or re-price products here — the product grid, filters,
 * WhatsApp messages and SEO structured data are all generated from this list.
 */

export type CategoryId = "spicy" | "sweet" | "murukku" | "snacks" | "special";

export type Category = { id: CategoryId | "all"; label: string };

export const categories: Category[] = [
  { id: "all", label: "அனைத்தும்" },
  { id: "spicy", label: "கார வகைகள்" },
  { id: "sweet", label: "இனிப்பு" },
  { id: "murukku", label: "முறுக்கு" },
  { id: "snacks", label: "ஸ்நாக்ஸ்" },
  { id: "special", label: "சிறப்பு உணவுகள்" },
];

export type Variant = {
  /** Size shown to the customer and sent in the WhatsApp message, e.g. "200g". */
  label: string;
  /** Price in rupees. */
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  categories: CategoryId[];
  image: string;
  imageAlt: string;
  variants: Variant[];
  /** Optional short badge, e.g. "அதிகம் விரும்பப்படுவது". */
  badge?: string;
};

export const products: Product[] = [
  {
    id: "meat-sambol",
    name: "இறைச்சி சம்பல்",
    description: "காரமும் மணமும் நிறைந்த பாரம்பரிய வீட்டுச் சுவை.",
    categories: ["spicy", "special"],
    image: "/images/products/meat-sambol.png",
    imageAlt: "வாழை இலையின் மேல் மண் கிண்ணத்தில் சிவந்த இறைச்சி சம்பல், கறிவேப்பிலை மற்றும் செத்தல் மிளகாயுடன்",
    variants: [
      { label: "100g", price: 750 },
      { label: "200g", price: 1500 },
      { label: "400g", price: 3000 },
      { label: "800g", price: 6000 },
    ],
    badge: "அதிகம் விரும்பப்படுவது",
  },
  {
    id: "dried-meat",
    name: "காய்ந்த இறைச்சி",
    description: "மசாலாவில் ஊறி மெதுவாக உலர்த்திய, சுவை நிறைந்த இறைச்சித் துண்டுகள்.",
    categories: ["special"],
    image: "/images/products/dried-meat.png",
    imageAlt: "கிண்ணத்தில் அடுக்கிய காய்ந்த இறைச்சித் துண்டுகள்",
    variants: [
      { label: "100g", price: 900 },
      { label: "250g", price: 2200 },
      { label: "500g", price: 4300 },
    ],
  },
  {
    id: "babath-fry",
    name: "பாபத் பொரியல்",
    description: "கறிவேப்பிலையும் காரமும் சேர்த்து நன்கு வறுத்த பாபத் பொரியல்.",
    categories: ["spicy", "special"],
    image: "/images/products/babath-fry.png",
    imageAlt: "கறிவேப்பிலை கலந்த சிவந்த மசாலாவில் வறுத்த பாபத் பொரியல்",
    variants: [
      { label: "250g", price: 1200 },
      { label: "500g", price: 2300 },
    ],
  },
  {
    id: "spicy-murukku",
    name: "உறைப்பு முறுக்கு",
    description: "மிளகாய்த் தூள் மணக்கும், மொறுமொறுப்பான காரமான முறுக்கு.",
    categories: ["murukku", "spicy"],
    image: "/images/products/spicy-murukku.png",
    imageAlt: "செம்மஞ்சள் நிறத்தில் சுருள் வடிவ காரமான முறுக்குகள்",
    variants: [
      { label: "250g", price: 550 },
      { label: "500g", price: 1050 },
      { label: "1kg", price: 2000 },
    ],
  },
  {
    id: "round-murukku",
    name: "ரவுண்டு டைப் முறுக்கு",
    description: "சிறிய வட்ட வடிவில், தேநீருடன் சாப்பிட ஏற்ற மொறுமொறுப்பு.",
    categories: ["murukku", "snacks"],
    image: "/images/products/round-murukku.png",
    imageAlt: "பொன்னிற சிறிய வட்ட முறுக்குகள் நிறைந்த கிண்ணம்",
    variants: [
      { label: "250g", price: 500 },
      { label: "500g", price: 950 },
      { label: "1kg", price: 1800 },
    ],
  },
  {
    id: "pakoda",
    name: "பகோடா",
    description: "வெங்காயமும் கறிவேப்பிலையும் சேர்த்த பொன்னிற மொறுமொறுப்பான பகோடா.",
    categories: ["snacks", "spicy"],
    image: "/images/products/pakoda.png",
    imageAlt: "கறிவேப்பிலையுடன் பொன்னிறமாக பொரித்த பகோடா",
    variants: [
      { label: "250g", price: 500 },
      { label: "500g", price: 950 },
    ],
  },
  {
    id: "sovi",
    name: "சோவி",
    description: "சோவி வடிவில் செய்த, லேசான இனிப்புடன் மொறுமொறுக்கும் சிற்றுண்டி.",
    categories: ["snacks"],
    image: "/images/products/sovi.png",
    imageAlt: "சோவி வடிவ பொன்னிற மொறுமொறுப்பான சிற்றுண்டிகள்",
    variants: [
      { label: "250g", price: 550 },
      { label: "500g", price: 1050 },
    ],
  },
  {
    id: "seeval",
    name: "சீவல்",
    description: "மெல்லியதாகச் சீவிப் பொரித்த, உப்பும் காரமும் சேர்ந்த சீவல்.",
    categories: ["snacks"],
    image: "/images/products/seeval.png",
    imageAlt: "மெல்லிய வட்ட சீவல் துண்டுகள் மிளகாய்த் தூள் தூவப்பட்டு",
    variants: [
      { label: "200g", price: 450 },
      { label: "500g", price: 1050 },
    ],
  },
  {
    id: "laddu",
    name: "லட்டு",
    description: "நெய் மணக்கும் பூந்தி லட்டு — முந்திரியும் திராட்சையும் சேர்த்து.",
    categories: ["sweet"],
    image: "/images/products/laddu.png",
    imageAlt: "முந்திரி மற்றும் திராட்சையுடன் பொன்னிற பூந்தி லட்டுகள்",
    variants: [
      { label: "5 உருண்டைகள்", price: 600 },
      { label: "10 உருண்டைகள்", price: 1150 },
      { label: "20 உருண்டைகள்", price: 2200 },
    ],
  },
  {
    id: "watalappam",
    name: "வட்டலப்பம்",
    description: "தேங்காய்ப் பாலும் கித்துள் கருப்பட்டியும் சேர்த்த மென்மையான இனிப்பு.",
    categories: ["sweet", "special"],
    image: "/images/products/watalappam.png",
    imageAlt: "முந்திரிப் பருப்புடன் மண் சட்டியில் கருப்பட்டி நிற வட்டலப்பம்",
    variants: [
      { label: "1 கப்", price: 350 },
      { label: "4 கப்", price: 1350 },
      { label: "முழு தட்டு", price: 2500 },
    ],
    badge: "புதியது",
  },
];

export function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-US")}`;
}
