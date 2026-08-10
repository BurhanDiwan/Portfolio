# Models Directory

Store all 3D geometry assets here.

## Guidelines
- Prefer **GLB** (Binary glTF) format. It packs textures and geometry into a single, efficient file.
- Heavily optimize models before placing them here. Use `gltf-transform` or Blender to:
  - Decimate unnecessary polygons.
  - Compress textures to WebP.
  - Apply Draco or Meshopt compression.
- **Strict Rule:** Keep individual model files under **3 MB** to ensure the portfolio loads instantly.
