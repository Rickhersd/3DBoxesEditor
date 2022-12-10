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
    
    this.boxModel;
    this.animationClip;
  }
  
  async init() {


    const URL_LOADER = './Models/First_box.glb'
    const INITIAL_MTL = new MeshPhongMaterial( { color: 0xff0000 , shininess: 10 } );
    const MESH_ID = "Cube";

    const scene = new Scene();

    this.boxModel = new BoxModel();

    await this.boxModel.loadModel(URL_LOADER, INITIAL_MTL, MESH_ID);

    scene.add( lightAmb );
    scene.add( this.boxModel.model)

    const bgColor = new Color( 0xA0A0A0 );
    scene.background = bgColor;

    function checkWindowResize(scene) {
      window.addEventListener('resize',() => {
        camera.aspect = MovilUI.CanvasCont.clientWidth / MovilUI.CanvasCont.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( MovilUI.CanvasCont.clientWidth, MovilUI.CanvasCont.clientHeight)
        render()
      }, false); 
    }

    const anim = document.getElementById('anim');
    anim.addEventListener('click', () => {
      this.boxModel.toogleFold();
    })
    
    let mixer = this.boxModel.animationMixer;

    checkWindowResize();
    animate()
    

    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      mixer.update(0.02)
     
      
      render();
    }

    function render(){
      renderer.render(scene, camera);
    }
  
  }

  start (){

  }
}