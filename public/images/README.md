# Images Directory

Store all static image assets here.

## Guidelines
- Prefer **WebP** or **AVIF** formats for maximum compression and browser performance.
- Avoid PNG unless alpha channel transparency is strictly required.
- Serve responsive resolutions via Next.js `<Image>` component (`next/image`) rather than hardcoding large assets.
- Keep file sizes under 200KB whenever possible.

## Structure
- `/projects/` - Screenshots of portfolio projects.
- `/profile/` - Profile pictures and about-me assets.
