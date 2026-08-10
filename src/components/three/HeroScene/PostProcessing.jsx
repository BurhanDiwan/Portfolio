"use client";
import { EffectComposer, Bloom, Vignette, ToneMapping } from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";

/**
 * Premium post-processing pipeline.
 * Utilizes subtle bloom and mild vignette to create a cinematic look,
 * avoiding heavy artifacts or visual noise.
 */
export default function PostProcessing() {
  return (
    <EffectComposer disableNormalPass>
      {/* 
        Subtle Bloom: Enhances the highlights of the physical glass material 
        without blowing out the entire image.
      */}
      <Bloom 
        luminanceThreshold={1.5} 
        luminanceSmoothing={0.5} 
        intensity={0.2} 
        mipmapBlur 
      />
      
      {/* 
        Tone Mapping: Uses ACES Filmic mapping for realistic color grading 
        that matches high-end film cameras.
      */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      
      {/* 
        Vignette: Focuses attention on the center geometry and creates depth.
      */}
      <Vignette 
        offset={0.4} 
        darkness={0.6} 
        blendFunction={BlendFunction.NORMAL} 
      />
    </EffectComposer>
  );
}
