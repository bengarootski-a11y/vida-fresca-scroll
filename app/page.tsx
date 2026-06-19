import Providers from "./components/Providers";
import ScrollHero from "./components/ScrollHero";
import FeaturesSection from "./components/FeaturesSection";
import GallerySection from "./components/GallerySection";
import SpecsSection from "./components/SpecsSection";
import ClosingCTA from "./components/ClosingCTA";

export default function Home() {
  return (
    <Providers>
      <main style={{ background: "#F6EEDC" }}>
        <ScrollHero />
        <FeaturesSection />
        <GallerySection />
        <SpecsSection />
        <ClosingCTA />
      </main>
    </Providers>
  );
}
