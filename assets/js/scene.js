// glb imports
import { GLTFLoader } from './helpers/three-gltf-loader';
import { DRACOLoader } from './helpers/draco'; 
import { BasisTextureLoader } from './helpers/basis-loader';

import { Scene } from 'three';
import { component } from 'bidello';
import Cube from './cube/cube';
import Cat from './cat/cat';
import camera from './camera';

class Stage extends Scene {
  constructor() {
    super()
    this.scope = component(this)
    this.init()
  }
  loadGLTF() {
    return new Promise ((resolve, reject) => {
      const loader = new GLTFLoader().setPath( 'models/' );
      DRACOLoader.setDecoderPath( '/js/' );
      loader.setDRACOLoader( new DRACOLoader() );
      loader.load('scene.glb', (gltf)=>{
        var renderer = this.scope.getInstance('Renderer')
        /* // example basis loader
        var bLoader = new BasisTextureLoader();
				bLoader.setTranscoderPath( '/js/basis/' );
        bLoader.detectSupport( renderer );
        bLoader.load( 'textures/PavingStones.basis', function ( texture ) {
          console.log(texture)
				}, undefined, function ( error ) {
					console.error( error );
        } ); */
        resolve(gltf)
      });
    });
  }
  init() {
    this.loadGLTF().then((gltf) => {
      this.add(new Cat(gltf.scene.children[0]))
      this.add(new Cube());
      this.add(camera);
    })

    /* else basic feature */
    // this.add(new Cube());
    // this.add(camera);
  }
}

export default new Stage();