import "./style.scss";
import ColorTool from './js/colorTool.js';

import { World } from "./js/world";
import MovilUI from "./js/movilUI";

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

movilUI.setExitBtn(openBtn);
movilUI.setOpenBtn(exitBtn);

const colorTool = new ColorTool();
const colorToolBtn = document.getElementById('colorToolBtn');
colorTool.init();

colorTool.setToogleBtn(colorToolBtn);

