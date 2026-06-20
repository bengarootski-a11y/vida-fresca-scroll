import Providers from "./components/Providers";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import AmbientField from "./components/AmbientField";
import WaypointNav from "./components/WaypointNav";
import Hero3 from "./components/Hero3";
import IngredientsSection from "./components/IngredientsSection";
import FeaturesSection from "./components/FeaturesSection";
import AboutSection from "./components/AboutSection";
import SpecsSection from "./components/SpecsSection";
import ClosingCTA from "./components/ClosingCTA";

export default function Home() {
  return (
    <Providers>
      <SmoothScroll />
      <ScrollProgress />
      <AmbientField />
      <WaypointNav />
      <main style={{ position: "relative", zIndex: 1, background: "transparent" }}>
        <Hero3 />
        <IngredientsSection />
        <FeaturesSection />
        <AboutSection />
        <SpecsSection />
        <ClosingCTA />
      </main>
    </Providers>
  );
}
