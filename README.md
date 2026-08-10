# Interactive 3D Developer Portfolio

An enterprise-grade, cinematic developer portfolio built with Next.js 15, React Three Fiber, and Tailwind CSS v4. Designed to showcase technical excellence and a premium aesthetic.

## 🏗 Architecture

The project is structured for high scalability and separation of concerns:

- **`src/app/`**: Next.js App Router endpoints and global layouts.
- **`src/components/ui/`**: Reusable design system primitives (Buttons, Cards, Badges).
- **`src/components/layout/`**: Structural scaffolding (Sections, Containers, Grid).
- **`src/components/three/`**: Isolated WebGL/React Three Fiber components to prevent re-renders on the DOM layer.
- **`src/components/navigation/`**: Application shell navigation logic.
- **`src/config/`**: Centralized configuration (`portfolio.js`) dictating site-wide data.
- **`src/data/`**: Modular data arrays (projects, experience, skills) ready for future database integration.

## 🚀 Technologies

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4
- **3D Rendering**: Three.js, React Three Fiber, @react-three/drei, @react-three/postprocessing
- **Animation**: GSAP, Framer Motion
- **Scroll Management**: Lenis (Smooth Scrolling)

## 📦 Installation & Setup

1. Clone the repository.
2. Ensure you are running Node.js 18+.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## ⚡ Performance Considerations

- **Three.js**: Heavy assets are wrapped in `Suspense`. The `SceneCanvas` sits isolated from the main DOM tree to prevent layout thrashing.
- **DPR**: Device Pixel Ratio is clamped in the `<Canvas>` to prevent performance collapse on ultra-high-resolution displays.
- **Fonts**: Inter and Space Grotesk are optimized via `next/font`.
- **Assets**: Always compress models (glb) and images (WebP) before dropping them into the `public/` pipeline folders. Read the respective `README.md` files in those directories for instructions.

## 🗺 Future Roadmap

- Integrate CMS (Sanity or Contentful) to hydrate the `src/data` files dynamically.
- Implement specialized WebGL transitions between specific project routes.
- Add an interactive 3D particle gallery for the Projects section.
