import { ShaderMaterial } from "three";
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

          // Distance verticale au centre (0 au centre → 0.5 en haut/bas)
          float distFromCenter = abs(uv.y - 0.5);

          // ✅ "Bombé" uniquement au centre : 1.0 au centre → 0.0 sur les bords
          float bulge = 1.0 - smoothstep(0.0, 0.8, distFromCenter);

          // ✅ shift contrôle l’intensité de l’effet (bombé positif uniquement)
          pos.z += bulge * shift * 0.9;

          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
`,
      fragmentShader: `
        uniform float shift;
        uniform sampler2D map;
        uniform float parallax;
        uniform float time;
        uniform float noiseStrength;
        varying vec2 vUv;

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
         vec2 uv = vUv;

           // ✅ Zoom léger dans la texture (ça crée une marge)
          uv = uv * 0.8 + 0.1;  
          // → 0.8 = on garde 80% du centre de l’image
          // → 0.1 = on recentre (évite que l’image se décale)

          // ✅ Ajoute un décalage doux
          uv.y += parallax * 0.8;  // 0.15 = intensité (moins fort que 0.9)
        
          vec4 texColor = texture2D(map, uv);

          // 📺 Génère le "snow effect" façon vieille TV
          float noise = random(uv * time * 50.0) * noiseStrength;

           // 🌀 Mélange texture et bruit
          vec3 noisyColor = mix(texColor.rgb, vec3(noise), noiseStrength);
          
            // 🎯 BORDS ARRONDIS
            float radius = 0.18;        // ↔ rayon des coins (0.0 = aucun arrondi, 0.5 = cercle complet)
            float edgeSoftness = 0.2; // ➡ transition douce des coins

            // on calcule la distance de chaque pixel au bord du carré (dans l’espace UV)
            vec2 dist = abs(vUv - 0.5) - vec2(0.5 - radius);

            // prend uniquement la partie extérieure des coins
            float outside = length(max(dist, 0.0));

            // masque : 1 au centre, 0 sur les coins
            float alpha = 1.0 - smoothstep(0.0, edgeSoftness, outside);

            // ✅ applique la couleur seulement là où alpha > 0
            if(alpha < 0.01) discard;

          // ✅ Crée un dégradé basé sur vUv.y
          float fadeTop = smoothstep(0.0, 0.01, vUv.y);      // 0 en haut → 1 après 15%
          float fadeBottom = smoothstep(1.0, 0.99, vUv.y);   // 0 en bas → 1 après 15%
          float fadeMask = fadeTop * fadeBottom;             // combine les deux

          // ✅ Couleur de fond (la même que ton <Canvas background>)
          vec3 bgColor = vec3(0.09, 0.09, 0.09); // #111 en RGB 0-1

                // 🖤 Ajoute fond noir pour les coins
          noisyColor = mix(vec3(0.09), noisyColor, alpha); 

          // ✅ Mix entre la texture et la couleur de fond
          vec3 finalColor = mix(bgColor, noisyColor, fadeMask);
          

        gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        shift: { value: 0 },
        map: { value: null }, // ✅ nouvelle uniform
        parallax: { value: 0 },
        time: { value: 0 },
        noiseStrength: { value: 0.0 },
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

  set time(value) {
    this.uniforms.time.value = value;
  }
  get time() {
    return this.uniforms.time.value;
  }

  set noiseStrength(value) {
    this.uniforms.noiseStrength.value = value;
  }
  get noiseStrength() {
    return this.uniforms.noiseStrength.value;
  }
}

extend({ FilmEffectMaterial });

// ✅ Déclare le JSX IntrinsicElement pour TypeScript :
declare module "@react-three/fiber" {
  interface ThreeElements {
    filmEffectMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
      shift?: number;
      time?: number;
      noiseStrength?: number;
    };
  }
}
