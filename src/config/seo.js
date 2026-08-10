import { SITE } from "./site";

export const SEO = {
  title: {
    default: `${SITE.name} | ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: "Awwwards-quality interactive 3D developer portfolio.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.domain,
    title: SITE.name,
    description: "Awwwards-quality interactive 3D developer portfolio.",
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.domain}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: "Awwwards-quality interactive 3D developer portfolio.",
    images: [`${SITE.domain}/og-image.jpg`],
  },
};
