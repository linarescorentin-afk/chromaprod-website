import { ShaderMaterial, Color } from "three";
import { extend } from "@react-three/fiber";
import React from "react";

class FilmEffectMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
  uniform float shift;
  varying vec2 vUv;
  void main() {
    vec3 pos = position;

    // ✅ Ajoute une vague de bas en haut
    // On utilise sin() sur la coordonnée Y (uv.y) pour créer une ondulation
    // shift agit comme un "décalage" pour animer la vague avec le scroll
   if (shift > 0.0) {
            float amplitude = 0.5; // hauteur de la vague
            float frequency = 1.6; // nombre de vagues

            // ✅ Crée une ondulation verticale
            pos.z += sin(-pos.y * frequency + shift * 5.0) * amplitude * shift;
          }


    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,
      fragmentShader: `
        uniform sampler2D map;
        uniform float parallax;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;

          // ✅ Zoom léger dans la texture (ça crée une marge)
          uv = uv * 0.8 + 0.1;  
          // → 0.8 = on garde 80% du centre de l’image
          // → 0.1 = on recentre (évite que l’image se décale)

          // ✅ Ajoute un décalage doux
          uv.y += parallax * 0.8;  // 0.8 = intensité du parallax

          // ✅ Clamp pour éviter de sortir de l'image
          uv.y = clamp(uv.y, 0.0, 1.0);
        
          vec4 texColor = texture2D(map, uv);

          // ✅ Affiche la texture directement sans dégradé
          gl_FragColor = texColor;
        }
      `,
      uniforms: {
        shift: { value: 0 },
        map: { value: null }, // ✅ nouvelle uniform
        parallax: { value: 0 },
      },
    });
  }

  set shift(value) {
    this.uniforms.shift.value = value;
  }
  get shift() {
    return this.uniforms.shift.value;
  }
  set map(value) {
    this.uniforms.map.value = value;
  }
  get map() {
    return this.uniforms.map.value;
  }
  set parallax(value) {
    this.uniforms.parallax.value = value;
  }
  get parallax() {
    return this.uniforms.parallax.value;
  }
}

extend({ FilmEffectMaterial });

// ✅ Déclare le JSX IntrinsicElement pour TypeScript :
declare module "@react-three/fiber" {
  interface ThreeElements {
    filmEffectMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
      shift?: number;
      color?: string | Color;
    };
  }
}
