import { GLTFLoader } from 'three/src/loaders/GLTFLoader.js';
import { AnimationClip, AnimationMixer, LoopPingPong } from 'three';

export default class BoxModel{

  constructor(){
    this.data;
    this.model;
    this.animation;
    this.animationMixer;
    this.isUnfolded = true;
  };

  async loadModel(url, INITIAL_MTL, MESH_ID){

    const loader = new GLTFLoader()

    const boxModelData = await loader.loadAsync(url, function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      }, 
      function (error) {
        console.log(error);
      }
    )
             
    this.data = boxModelData;
    this.model = setUpModel();

    const animationGen = setUpAnimation();

    this.animation = animationGen.next().value;
    this.animationMixer = animationGen.next().value;

    function  setUpModel(){
      const model = boxModelData.scene; 
      model.traverse(function (child) {
        if ((child.isMesh)) {
          const m = child;
          m.receiveShadow = true
          m.castShadow = true
        }
      })
      return model;
    }

    function* setUpAnimation(){
      const CLIP_NAME = "ArmatureAction";
      const CLIPS_LIST = boxModelData.animations;
      const ROOT = boxModelData.scene;
  
      const clip = AnimationClip.findByName( CLIPS_LIST, CLIP_NAME);
      const mixer = new AnimationMixer(ROOT);
      
      let animation = mixer.clipAction(clip);
      animation.setLoop(LoopPingPong);

      mixer.addEventListener( 'loop', () => { 
        animation.paused = true;
      } ); 

      yield animation;
      yield mixer;
    }
  }
  
  toogleFold() {
    if(this.animation.isRunning() == true){
      this.animation.timeScale *= -1; 
      return;
    } 
    if (this.animation.paused == true){
      this.animation.paused = false;
      return;
    } 
    this.animation.play(); 
  }

  setMaterial(parent, mtl) {
    parent.traverse((o) => {
     if (o.isMesh && o.name != null) {  
      o.material = mtl;
     }
   });
  }
}