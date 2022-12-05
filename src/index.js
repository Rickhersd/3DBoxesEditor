import "./style.scss";
import ColorTool from './js/colorTool.js';

import { MeshPhongMaterial } from "three";
import { MeshStandardMaterial } from 'three';
import { TextureLoader } from "three";
import { RepeatWrapping } from "three";

import { World } from "./js/world";
import MovilUI from "./js/movilUI";
import { TextElement } from "./js/textElement";

const world = new World();
const movilUI = new MovilUI();

async function main(){

    await world.init();
    
    world.start();
}

main().catch((err) => {
    console.error(err);
});

const openBtn = document.querySelector('.editor-mobile__openBtn');
const exitBtn = document.querySelector('.editor-mobile__exitBtn');

movilUI.setExitBtn(exitBtn);
movilUI.setOpenBtn(openBtn);

const colorTool = new ColorTool();
const colorToolBtn = document.getElementById('colorToolBtn');
colorTool.init();

colorTool.setToogleBtn(colorToolBtn);


const canvas = document.getElementById('editor-insideBox');
const canvasCont = document.getElementById('editor-insideBoxCont')



if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = "Cuadricula.jpg";
  img.onload = () => {
    ctx.drawImage(img, 0, 0); 
  }
  
} else {
  // canvas-unsupported code here
}

1

const addtext = document.getElementById("add-text");
const drawText = document.getElementById("draw-text");
const textInput = document.getElementById("textTool-input-text");
const familySelect = document.getElementById("textTool-select-family");
const sizeSelect = document.getElementById("textTool-select-size");
const italicCheckbox = document.getElementById("textTool-checkbox-italic");
let currentFontText;
let currentFontFamily = familySelect.value;
let currentFontSize = sizeSelect.value;
let currentItalic = italicCheckbox.checked;

console.log(currentItalic);

let index = 0;

textInput.addEventListener('input', (e) => {
  currentFontText = e.target.value;
})

familySelect.addEventListener('input', (e) => {
  currentFontFamily = e.target.value;
})

sizeSelect.addEventListener('input', (e) => {
  currentFontSize = e.target.value;
})

italicCheckbox.addEventListener('change', (e) =>{
  currentItalic = e.target.checked;
})

let textElement;

drawText.addEventListener('click', () => {
  textElement.drawTextF();
}) 

addtext.addEventListener('click', () => {
  textElement =  new TextElement(
    index, 
    currentFontText, 
    currentFontSize, 
    currentFontFamily,
    currentItalic, 
    canvas
    );
  canvasCont.appendChild(textElement.createElement(index));
  index++;
  textElement.init(canvasCont);
});

const renderBtn = document.getElementById('render-box');

renderBtn.addEventListener('click', () => {
  render();
})

function render(){

  const textureMap = {
    texture: canvas.toDataURL('image/jpeg'),
    size: [5,5,5],
    shininess: 0
  }
  
  let txt = new TextureLoader().load(textureMap.texture);
  txt.flipY = false;    
  //txt.repeat.set( textureMap.size[0], textureMap.size[1], textureMap.size[2]);
 // txt.wrapS = RepeatWrapping;
 // txt.wrapT = RepeatWrapping;
      
  let new_mtl = new MeshStandardMaterial( {
    map: txt,
  }); 
  
  console.log(new_mtl)

  world.boxModel.setMaterial(world.boxModel.model, new_mtl);
  console.log("renderizado")
}

