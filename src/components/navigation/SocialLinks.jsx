import { SOCIALS } from "@/config/socials";
import IconButton from "../ui/IconButton";
import Stack from "../layout/Stack";

export default function SocialLinks() {
  return (
    <Stack direction="row" gap="md" align="center">
      {SOCIALS.map((social) => (
        <IconButton
          key={social.platform}
          as="a"
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.platform}
          title={social.platform}
          variant="ghost"
          size="md"
        >
          <social.icon className="h-5 w-5" />
        </IconButton>
      ))}
    </Stack>
  );
}
