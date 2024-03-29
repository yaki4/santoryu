import {
  WebGLRenderTarget,
  Camera,
  RGBFormat,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  Scene,
  RawShaderMaterial,
  Vector2,
} from 'three';

import renderer from '../renderer';
import settings from '../settings';
import triangle from '../utils/triangle';
import vertexShader from './postfx.vert';
import fragmentShader from './postfx.frag';

class PostFX {
  constructor() {
    this.init()
  }
  init() {
    this.renderer = renderer;
    this.scene = new Scene();
    this.dummyCamera = new Camera();
    // this.geometry = new BufferGeometry();

    // const vertices = new Float32Array([
    //   -1.0, -1.0,
    //   3.0, -1.0,
    //   -1.0, 3.0
    // ]);

    // this.geometry.addAttribute('position', new BufferAttribute(vertices, 2));
    this.resolution = new Vector2();
    this.renderer.getDrawingBufferSize(this.resolution);

    this.target = new WebGLRenderTarget(this.resolution.x, this.resolution.y, {
      format: RGBFormat,
      stencilBuffer: false,
      depthBuffer: true,
    });

    const defines = {};

    settings.fxaa && (defines.FXAA = true);

    this.material = new RawShaderMaterial({
      defines,
      fragmentShader,
      vertexShader,
      uniforms: {
        uScene: { value: this.target.texture },
        uResolution: { value: this.resolution },
      },
    });

    this.triangle = new Mesh(triangle, this.material);
    this.triangle.frustumCulled = false;
    this.scene.add(this.triangle);
  }

  onResize() {
    this.renderer.getDrawingBufferSize(this.resolution);
    this.target.setSize(this.resolution.x, this.resolution.y);
  }

  render(scene, camera) {
    this.renderer.setRenderTarget(this.target);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.dummyCamera);
  }
}

export default new PostFX();