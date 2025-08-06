import { ShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

class PhotoEffectMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float shift;
        uniform float opacityOnClick;
        varying vec2 vUv;

        void main() {
          vec4 texColor = texture2D(map, vUv);

          // 🎨 conversion en niveaux de gris
          float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

          // 📉 Plus shift augmente, plus on tire vers le gris
          vec3 finalColor = mix(texColor.rgb, vec3(gray), shift);

          gl_FragColor = vec4(finalColor, opacityOnClick);
        }
      `,
      uniforms: {
        map: { value: null },
        shift: { value: 0 },
        opacityOnClick: { value: 1 }, // ✅ déjà prêt au moment du super()
      },
      transparent: true, // ✅ pour gérer la transparence
    });
  }

  set map(value) {
    this.uniforms.map.value = value;
  }
  get map() {
    return this.uniforms.map.value;
  }

  set shift(value) {
    this.uniforms.shift.value = value;
  }
  get shift() {
    return this.uniforms.shift.value;
  }
  set opacityOnClick(value) {
    this.uniforms.opacityOnClick.value = value;
  }
  get opacityOnClick() {
    return this.uniforms.opacityOnClick.value;
  }
}

extend({ PhotoEffectMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    photoEffectMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
      map?: THREE.Texture;
      shift?: number;
      opacityOnClick?: number;
    };
  }
}
