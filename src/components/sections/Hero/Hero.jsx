import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <Section id="home" variant="fullHeight" className="overflow-hidden">
      <Container className="relative z-10 w-full h-full flex items-center">
        <Grid cols={1} lg={2} gap="lg" className="w-full">
          {/* Left Side: Typography and CTAs */}
          <div className="flex flex-col justify-center pointer-events-auto lg:-translate-y-4 pt-[28vh] lg:pt-0">
            <HeroContent />
          </div>

          {/* Right Side: Reserved for 3D Geometry */}
          {/* The actual 3D geometry renders globally in SceneCanvas, 
              but this div acts as a visual counterbalance in the DOM layout. */}
          <div className="hidden lg:block h-full w-full" aria-hidden="true" />
        </Grid>
      </Container>
    </Section>
  );
}
