# Textures Directory

Store all standalone Three.js texture maps here.

## Guidelines
- Store environmental maps (HDR/EXR), normal maps, roughness maps, etc.
- Compress HDRs to **.hdr** or **.exr** and keep resolution strictly to what is necessary (usually 1K is plenty for environmental lighting without a clear background).
- For standard PBR textures (albedo, normal, etc.), use compressed **JPG** or **WebP** format.
- Always use power-of-two resolutions (e.g., 512x512, 1024x1024) to ensure WebGL mipmapping functions correctly.
