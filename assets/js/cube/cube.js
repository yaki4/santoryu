import {
  Object3D,
  BoxBufferGeometry,
  Mesh
} from 'three';

import MagicShader from 'magicshader';
import trail from '../utils/trail';
import { component } from 'bidello';

export default class extends Object3D {
  constructor() {
    super()
    component(this)
    this.init()
  }
  init() {
    this.geometry = new BoxBufferGeometry(3, 3, 3, 18, 18, 18);
    this.material = new MagicShader({
      wireframe: true,
      name: 'Cube',
      vertexShader: `
        precision highp float;
        
        attribute vec3 normal;
        attribute vec3 position;

        uniform sampler2D uTrail;
        uniform mat3 normalMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        varying float vForce;

        float quarticOut(float t) {
          return pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
        }

        void main() {
          vec4 clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

          vec2 uv = ((clipSpace.xy / clipSpace.w) + 1.0) / 2.0;
          float pointer = texture2D(uTrail, uv).r;
          vec4 pos = modelMatrix * vec4(position, 1.0);

          float force = quarticOut(pointer);
          vForce = force;

          vec3 norm = normalMatrix * normal;
          pos.rgb += (norm * force) * .5;

          gl_Position = projectionMatrix * viewMatrix * pos;
        }
      `,
      fragmentShader: `
        precision highp float;
    
        varying float vForce;
    
        void main() {
          gl_FragColor = vec4(mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vForce), 1.0);
        }
      `,
      uniforms: {
        uTrail: { value: trail.fbo.target }
      }
    });

    this.mesh = new Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }

  onRaf({ delta }) {
    this.mesh.rotation.x += 0.3 * delta;
    this.mesh.rotation.y += 0.3 * delta;
    // this.material.uniforms.uTrail.value = trail.target;
  }
}