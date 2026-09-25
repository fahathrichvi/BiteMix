import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CTA } from "@/components/CTA";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowToOrder } from "@/components/HowToOrder";
import { ProductGrid } from "@/components/ProductGrid";
import { StructuredData } from "@/components/StructuredData";
import { Testimonials } from "@/components/Testimonials";
import { TrustFeatures } from "@/components/TrustFeatures";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhyBiteMix } from "@/components/WhyBiteMix";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <TrustFeatures />
        <ProductGrid />
        <WhyBiteMix />
        <About />
        <FeaturedBanner />
        <HowToOrder />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <StructuredData />
    </>
  );
}
