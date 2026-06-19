import Providers from "./components/Providers";
import ScrollHero from "./components/ScrollHero";
import FeaturesSection from "./components/FeaturesSection";
import FlavorsSection from "./components/FlavorsSection";
import AboutSection from "./components/AboutSection";
import SpecsSection from "./components/SpecsSection";
import ClosingCTA from "./components/ClosingCTA";

export default function Home() {
  return (
    <Providers>
      <main style={{ background: "#F6EEDC" }}>
        <ScrollHero />
        <FeaturesSection />
        <FlavorsSection />
        <AboutSection />
        <SpecsSection />
        <ClosingCTA />
      </main>
    </Providers>
  );
}
