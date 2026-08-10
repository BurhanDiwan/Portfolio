# Icons Directory

Store all custom SVG icons and favicons here.

## Guidelines
- Use **SVG** format exclusively for UI icons to ensure infinite scalability and crispness on high DPI displays.
- Optimize SVGs using a tool like SVGO before committing to remove unnecessary metadata and paths.
- Ensure `fill="currentColor"` is used on paths if the icon needs to inherit CSS text colors.
- For standard UI icons, prefer using `react-icons` directly in components rather than storing static SVGs here to reduce bundle size.
