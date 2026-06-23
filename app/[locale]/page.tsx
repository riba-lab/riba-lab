import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import ProductGrid from '@/components/ProductGrid';
import IsraelSection from '@/components/IsraelSection';
import Loyalty from '@/components/Loyalty';
import Footer from '@/components/Footer';

export default function LocalePage() {
  return (
    <>
      <Hero />
      <Collections />
      <ProductGrid />
      <IsraelSection />
      <Loyalty />
      <Footer />
    </>
  );
}
