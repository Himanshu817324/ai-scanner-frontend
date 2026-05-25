import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import FaqPreview from '@/components/home/FaqPreview';
import Cta from '@/components/home/Cta';

export default function LandingPage() {
  return (
    <div className="relative bg-[#0A0A0A] min-h-screen selection:bg-blue-500/30">
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <Hero />
      <Features />
      <HowItWorks />
      <FaqPreview />
      <Cta />
    </div>
  );
}
