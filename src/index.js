import "./style.scss";
import ColorTool from './js/colorTool.js';

import { World } from "./js/world";
import MovilUI from "./js/movilUI";
import { Pointer, TextElement } from "./js/textElement";
import { Outliner } from "./js/outliner";
import { TextTool } from "./js/textTool";
import { ColorPicker } from "./js/colorPicker";

const world = new World();
const movilUI = new MovilUI();

const textTool = new TextTool();


async function main(){

  await world.init();
    
  world.start();
}

main().catch((err) => {
  console.error(err);
});

customElements.define('pointer-el', Pointer);
customElements.define('color-picker', ColorPicker)

const textBtn = document.getElementById("textBtn");
const imageBtn = document.getElementById("imageBtn");

const cont = document.getElementById('editor-content');


textBtn.addEventListener('click', () => {
  clearHtml();
  console.log('hola')
  cont.append(textTool.view);
})

imageBtn.addEventListener('click', () => {
  clearHtml();
  let imageTool = document.createElement('div');
  imageTool.innerHTML = "aqui van las imagenes"
  cont.append(imageTool)
})

function clearHtml(){
  cont.innerHTML = '';
}

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

const prueba = document.getElementById('prueba');


if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = "muestra.jpg";
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 540, 540); 
  }
  
} else {
  // canvas-unsupported code here
}

const renderers = {
  threeDView: {
    btn: document.getElementById('renderer-btn-3DView'),
    cont: document.querySelector('.renderer__3DEditor-cont')
  },
  insideView: {
    btn: document.getElementById('renderer-btn-insideView'),
    cont: document.querySelector('.renderer__insideEditor-cont')
  },
  outsideView:{
    btn: document.getElementById('renderer-btn-outsideView'),
    cont: document.querySelector('.renderer__outsideEditor-cont')
  }
}

Object.entries(renderers).forEach(([key]) => {
  let btn = renderers[key]['btn'];
  btn.addEventListener('click', (e) => {
    for(let renderer in renderers){
      btn = renderers[renderer]['btn'];
      if(btn === e.target ){
        renderers[renderer]['cont'].style.display = 'block';
      } else {
        renderers[renderer]['cont'].style.display = 'none';
      };
    };
  });
});

const addtext = document.getElementById("add-text");
const drawText = document.getElementById("draw-text");
const textInput = document.getElementById("textTool-input-text");
const familySelect = document.getElementById("textTool-select-family");
const sizeSelect = document.getElementById("textTool-select-size");
const italicCheckbox = document.getElementById("textTool-checkbox-italic");


//let currentFontText;
//let currentFontFamily = familySelect.value;
//let currentFontSize = sizeSelect.value;
//let currentItalic = italicCheckbox.checked;

/*

let index = 1;

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
});

let textElement;

drawText.addEventListener('click', () => {
  textElement.drawTextF();
}) 

const outliner = new Outliner();
addtext.addEventListener('click', () => {

  let color = colorPicker.getColor();

  textElement = new TextElement(
    index, 
    currentFontText, 
    currentFontSize, 
    currentFontFamily,
    currentItalic, 
    color,
    canvas
    );
  canvasCont.appendChild(textElement.element);
  outliner.addItem(textElement);
  console.log(outliner);

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
  txt.flipY = true;    
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

*/