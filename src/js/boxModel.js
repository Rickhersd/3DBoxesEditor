import { GLTFLoader } from 'three/src/loaders/GLTFLoader.js';
import { MeshPhongMaterial } from 'three';

export default class BoxModel{

  constructor(){
    this.model;
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

    let boxModel = setUpModel(boxModelData); 

    return boxModel;

    function setUpModel(modelData){
      const model = modelData.scene; 

      model.traverse(function (child) {
        if ((child.isMesh)) {
          const m = child;
          m.receiveShadow = true
          m.castShadow = true
        }
      })

      initColor(model, MESH_ID, INITIAL_MTL);
      return model;
    }
    

    function initColor(parent, type, mtl) {
      parent.traverse((o) => {
        if (o.isMesh) {
          if (o.name.includes(type)) {
            o.material = mtl;
            o.nameID = type;
          }
        }
      });
    }
  }

  setMaterial(parent, type, mtl) {
    console.log('hola')
    parent.traverse((o) => {
     if (o.isMesh && o.nameID != null) {
       if (o.nameID == type) {
        o.material = mtl;
      }
     }
   });
  }
}