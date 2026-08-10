"use client";
import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sectionVisibility } from "@/stores/sectionVisibility";

/**
 * Lightweight, performant particle system using InstancedMesh.
 * Enhances scene depth without distracting from the primary geometry.
 * Fades out when the Contact (wormhole) section becomes active.
 */
export default function Particles({ count = 200 }) {
  const mesh    = useRef();
  const matRef  = useRef();
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const opacRef = useRef(0.15); // current rendered opacity

  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t:       Math.random() * 100,
        factor:  Math.random() * 0.5 + 0.5,
        speed:   Math.random() * 0.2 + 0.1,
        xFactor: (Math.random() - 0.5) * 2,
        yFactor: (Math.random() - 0.5) * 2,
        zFactor: (Math.random() - 0.5) * 2,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
      });
    }
    return temp;
  });

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Hide particles when wormhole section is active
    const targetOpacity = sectionVisibility.contact ? 0 : 0.15;
    opacRef.current = THREE.MathUtils.lerp(opacRef.current, targetOpacity, delta * 2);
    if (matRef.current) matRef.current.opacity = opacRef.current;

    if (opacRef.current < 0.002) return; // skip transform work when invisible

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, x, y, z } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(x + a * xFactor, y + b * yFactor, z + a * zFactor);
      dummy.scale.setScalar(s * factor * 0.05);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial
        ref={matRef}
        color="#a1a1aa"
        transparent
        opacity={0.15}
        roughness={1}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
