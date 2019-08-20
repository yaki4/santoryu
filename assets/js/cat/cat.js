import {
    Object3D,
    BoxBufferGeometry,
    Mesh
  } from 'three';
  
  import MagicShader from 'magicshader';
  import trail from '../utils/trail';
  import { component } from 'bidello';
  
  export default class extends Object3D {
    constructor(model) {
      super()
      component(this)
      this.model = model
      this.init()
    }
    init() {
      this.geometry = new BoxBufferGeometry(3, 3, 3, 18, 18, 18);
      this.material = new MagicShader({
        wireframe: true,
        name: 'Cat',
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
          void main() {
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
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
      this.mesh = new Mesh(this.model.geometry, this.material);
      this.add(this.mesh);
      this.mesh.scale.set(0.03,0.03,0.03)
    }
  
    onRaf({ delta }) {
      this.mesh.rotation.x += 0.3 * delta;
      this.mesh.rotation.y += 0.3 * delta;
      // this.material.uniforms.uTrail.value = trail.target;
    }
  }