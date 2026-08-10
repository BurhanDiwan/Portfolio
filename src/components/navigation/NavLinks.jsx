"use client";
import { NAVIGATION } from "@/config/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import NavItem from "./NavItem";
import ResumeButton from "./ResumeButton";
import Stack from "../layout/Stack";

export default function NavLinks({ isMobile = false, onItemClick }) {
  const activeSection = useActiveSection();

  return (
    <Stack
      direction={isMobile ? "col" : "row"}
      align="center"
      gap={isMobile ? "lg" : "md"}
      className="w-full"
    >
      {NAVIGATION.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activeSection === item.id}
          isMobile={isMobile}
          onClick={onItemClick}
        />
      ))}
      <ResumeButton isMobile={isMobile} />
    </Stack>
  );
}
