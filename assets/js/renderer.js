import { WebGLRenderer } from 'three';
import { component } from 'bidello';
import settings from './settings';

class Renderer extends WebGLRenderer {
  constructor() {
    super({
      powerPreference: 'high-performance',
      antialiasing: false,
    });
    component(this)
    // this.gammaFactor = 2.2;
    // this.gammaInput = true;
    // this.gammaOutput = true;

    this.setPixelRatio(settings.dpr);
  }

  onResize({ width, height }) {
    this.setSize(width, height);
  }
}

export default new Renderer();
