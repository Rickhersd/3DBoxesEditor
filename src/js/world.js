import { Scene, Color } from "three";
import { MeshPhongMaterial } from 'three';

import camera from "./components/createCamera"
import lightAmb from "./components/createLights";
import renderer from "./components/createRenderer";
import controls from "./components/createControls";
import MovilUI from "./movilUI";
import BoxModel from "./boxModel";


export class World {

  constructor() {
    this.scene = new Scene();
    this.boxModel;
  }
  
  async init() {

    const URL_LOADER = './Models/cube.glb'
    const INITIAL_MTL = new MeshPhongMaterial( { color: 0xff0000 , shininess: 10 } );
    const MESH_ID = "Cube";

    const boxModel= new BoxModel();

    this.boxModel = await boxModel.loadModel(URL_LOADER, INITIAL_MTL, MESH_ID);

    console.log(this.boxModel);

    this.scene.add( lightAmb );
    this.scene.add( this.boxModel)

    console.log(this,this.boxModel)
    console.log(this.scene)

    const bgColor = new Color( 0xA0A0A0 );
    this.scene.background = bgColor;

    

    function checkWindowResize(scene) {
      window.addEventListener('resize',() => {
        camera.aspect = MovilUI.CanvasCont.clientWidth / MovilUI.CanvasCont.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( MovilUI.CanvasCont.clientWidth, MovilUI.CanvasCont.clientHeight)
        render()
      }, false);
      
    }

    checkWindowResize(this.scene);
    animate(this.scene)
    

    function animate(scene) {
      //requestAnimationFrame(animate)
      controls.update()
      render(scene)
    }

    function render(scene){
      renderer.render(scene, camera);
    }
  
  }

  start (){

  }
}