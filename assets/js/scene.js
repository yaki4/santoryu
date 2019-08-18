// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene } from 'three';
import { component } from 'bidello';
import Cube from './cube/cube';
import camera from './camera';

class Stage extends Scene {
  constructor() {
    super()
    component(this)
    this.init()
  }
  init() {
    this.add(new Cube());
    this.add(camera);
  }
}

export default new Stage();