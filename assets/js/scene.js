// glb imports
import { GLTFLoader } from './helpers/three-gltf-loader';
import { DRACOLoader } from './helpers/draco'; 

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
  loadGLTF() {
    return new Promise ((resolve, reject) => {
      const loader = new GLTFLoader().setPath( 'models/draco/' );
      DRACOLoader.setDecoderPath( '/js/' );
      loader.setDRACOLoader( new DRACOLoader() );
      loader.load('scene.glb', (gltf)=>{
        resolve(gltf)
      });
    });
  }
  init() {
    /* if glb models uncomment
    this.loadGLTF().then((gltf) => {
      console.log(gltf)
      this.add(new Cube());
      this.add(camera);
    })
    */

    /* else basic feature */
    this.add(new Cube());
    this.add(camera);
  }
}

export default new Stage();