import SceneCanvas from "@/components/three/Canvas/SceneCanvas";
import Hero from "@/components/sections/Hero/Hero";
import Philosophy from "@/components/sections/Philosophy/Philosophy";
import About from "@/components/sections/About/About";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import EngineeringSection from "@/components/sections/engineering/EngineeringSection";
import BeyondCodeSection from "@/components/sections/beyond-code/BeyondCodeSection";
import ContactSection from "@/components/sections/Contact/ContactSection";
import ScrollWormholeContact from "@/components/sections/Contact/ScrollWormholeContact";

export default function Home() {
  return (
    <div className="relative">
      {/* 3D Canvas Background */}
      <SceneCanvas />

      {/* DOM Content (Foreground) */}
      <div className="relative z-10 pointer-events-none">

        {/* Section 00: Hero */}
        <Hero />

        {/* Section 01: Developer Philosophy */}
        <Philosophy />

        {/* Section 02: About */}
        <About />

        {/* Section 03: Featured Projects */}
        <ProjectsSection />

        {/* Section 04: Engineering Capabilities */}
        <EngineeringSection />

        {/* Section 05: Beyond Code */}
        <BeyondCodeSection />

        {/* Section 06: Contact */}
        {/* TEMPORARILY DISABLED
        // Original Contact section preserved for rollback.
        // Re-enable after validating ScrollWormholeContact.
        <ContactSection />
        */}
        <ScrollWormholeContact />

      </div>
    </div>
  );
}
