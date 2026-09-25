/**
 * Customer reviews.
 * NOTE: these are sample placeholders for layout — replace them with
 * real reviews (with the customer's permission) before launch.
 */
export type Testimonial = {
  name: string;
  place: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  product: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "ரஞ்சனி",
    place: "யாழ்ப்பாணம்",
    rating: 5,
    review: "இறைச்சி சம்பல் அம்மா செய்வது போலவே இருந்தது. காரமும் உப்பும் சரியான அளவில். அடுத்த முறையும் இங்கேயே வாங்குவேன்.",
    product: "இறைச்சி சம்பல்",
  },
  {
    name: "பிரதீபன்",
    place: "கொழும்பு",
    rating: 5,
    review: "முறுக்கு நல்ல மொறுமொறுப்பு, எண்ணெய் வாசனை இல்லை. பொதியும் சுத்தமாக இருந்தது.",
    product: "உரைப்பு முறுக்கு",
  },
  {
    name: "சுமதி",
    place: "மட்டக்களப்பு",
    rating: 5,
    review: "வட்டலப்பம் மிகவும் மென்மையாக இருந்தது. கருப்பட்டி சுவை அருமை. வீட்டில் எல்லோருக்கும் பிடித்தது.",
    product: "வட்டலப்பம்",
  },
  {
    name: "அருண்",
    place: "கண்டி",
    rating: 4,
    review: "WhatsApp-ல் ஆர்டர் செய்வது மிக எளிதாக இருந்தது. பதிலும் விரைவாக வந்தது. பகோடா சுவையாக இருந்தது.",
    product: "பகோடா",
  },
  {
    name: "நிரோஷா",
    place: "வவுனியா",
    rating: 5,
    review: "விருந்தினர்களுக்காக லட்டு ஆர்டர் செய்தேன். நெய் மணமும் இனிப்பும் சரியாக இருந்தது.",
    product: "லட்டு",
  },
  {
    name: "கஜன்",
    place: "திருகோணமலை",
    rating: 5,
    review: "காய்ந்த இறைச்சி வெளிநாட்டில் இருக்கும் தம்பிக்கு அனுப்பினேன். நீண்ட நாள் நன்றாக இருந்தது என்றான்.",
    product: "காய்ந்த இறைச்சி",
  },
];
