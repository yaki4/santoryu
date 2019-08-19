import * as helpers from './bidello';
import renderer from './renderer';
import camera from './camera';
import scene from './scene';
import postfx from './postfx/postfx';
import assets from './assets';
import { component } from 'bidello';

class Site {
  constructor() {
    component(this)
    this.init()
  }
  init() {
    assets.load();
    document.body.appendChild(renderer.domElement);
  }
  onRaf() {
    // renderer.render(scene, camera);
    postfx.render(scene, camera);
  }

  onLoadEnd() {
    console.log('finished loader!');
  }
}

export default new Site();