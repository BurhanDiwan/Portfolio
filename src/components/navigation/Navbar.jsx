"use client";
import { useNavbarState } from "@/hooks/useNavbarState";
import { cn } from "@/utils/cn";
import Container from "../layout/Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import HamburgerButton from "./HamburgerButton";

export default function Navbar() {
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavbarState();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-header transition-all duration-300 ease-out",
          isScrolled ? "py-4 bg-surface-glass backdrop-blur-md border-b border-border-default" : "py-6 bg-transparent border-b border-transparent"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:block">
            <NavLinks />
          </nav>

          {/* Right: Hamburger Toggle (Mobile Only) */}
          <div className="md:hidden">
            <HamburgerButton isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} closeMenu={closeMobileMenu} />
    </>
  );
}
