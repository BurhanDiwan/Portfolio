import { SITE } from "@/config/site";
import Container from "./Container";
import SocialLinks from "../navigation/SocialLinks";
import Paragraph from "./Paragraph";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-default bg-background py-8 sm:py-12">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-display text-lg font-bold text-text-primary">
            {SITE.name}.
          </span>
          <Paragraph size="sm" color="tertiary" className="mt-1">
            {SITE.copyright}
          </Paragraph>
        </div>
        
        <SocialLinks />
      </Container>
    </footer>
  );
}
