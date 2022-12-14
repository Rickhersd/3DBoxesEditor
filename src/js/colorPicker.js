import html from '../views/colorPicker.html';

export class ColorPicker extends HTMLElement {

  constructor(){
    super();

    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = html;

    this.setAttribute('currentColor', '#00ff00');
    
    const canvasColorPicker = shadow.getElementById( 'colorPicker-colorPicker', { willReadFrequently: true });
    const canvasSliderPicker = shadow.getElementById( 'colorPicker-slider', { willReadFrequently: true });

    const CP_btn = shadow.getElementById('colorPicker-btn') 

    const canvasPicker = new CanvasPicker(canvasColorPicker, "#00ff00");
    const sliderPicker = new SliderPicker(canvasSliderPicker);

    const sliderGrafientV = ['#ff0000', '#ffff00', '#00ff00','#00ffff', '#0000ff', '#ff00ff', '#ff0000' ];

    const canvasGradientH = [canvasPicker.initialColor,'#fff'];
    const canvasGradientV = ['#fff0', '#000'];

    sliderPicker.addGradient(sliderGrafientV, 'top');

    canvasPicker.addGradient(canvasGradientH, 'right');
    canvasPicker.addGradient(canvasGradientV, 'top');
  
    sliderPicker.otherColor(canvasPicker);
    canvasPicker.setUpPicker();

    const style = document.createElement('style');
    style.textContent = `

    .colorPicker__btn{
      padding: 0.1rem;
    }
    
    .colorPicker__btn > span{
      width: 15px;
      height: 15px;
      background-color: blue;
      display: block;
    }
    
    .colorPicker__selecter{
      position: absolute;
      padding: 1rem;
      border-radius: 5px;
      background-color: white;
      z-index: 5;
      border: 1px solid rgb(207, 207, 207);
      -webkit-box-shadow: 0px 0px 14px -6px rgba(0,0,0,1);
      -moz-box-shadow: 0px 0px 14px -6px rgba(0,0,0,1);
      box-shadow: 0px 0px 14px -6px rgba(0,0,0,1);
      display: grid;
      grid-template-areas: 
      "picker slider"
      "info info";
      grid-template-columns: 170px 14px;
      grid-template-rows: 170px 20px;
      gap: 1rem;
      display: none;
    }
        
    .colorPicker__selecter-picker{
      grid-area: picker;
      width: 170px;
      height: 170px;
      position: relative;
    
    .colorPicker__selecter-canvas{
      border-radius: 5px;
      border: 1px solid gray;
    }
    
    .colorPicker__selecter-indicator{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      translate: -50% -50%;
      border: 1px solid gray
    }	
    
    .colorPicker__selecter-slider{
      grid-area: slider;
      width: 14px;
      height: 170px;
      position: relative;
          
    .colorPicker__selecter-canvas{
      border-radius: 7px;
    }
    
    .colorPicker__selecter-indicator{
      position: absolute;
      width: 40px;
    }`;
    
    this.selected = canvasPicker.initialColor;
    this.canvas = canvasPicker;

    const CP_selecter = shadow.getElementById('colorPicker-selecter');

    CP_btn.addEventListener('click', () => { 
      CP_selecter.style.display = CP_selecter.style.display != 'grid' ? 'grid' : 'none';
    });


    shadow.append(style);
  }

  getColor(){
    return this.canvas.currentColor;
  }
}

class Picker{

  constructor(canvas){
    this.currentColor;
    this.indicator;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
  }

  addGradient(color, origin){

    let widthCanvas = this.ctx.canvas.width;
    let heightCanvas = this.ctx.canvas.height;
    let cord = selectDirecion();

    let gradient = this.ctx.createLinearGradient(cord.x1, cord.y1, cord.x2, cord.y2);

    for(let i = 0; i < color.length; i++){
      let stop = i * 1/(color.length - 1);
      gradient.addColorStop(stop, color[i]);
    }
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, widthCanvas, heightCanvas);

    function selectDirecion(){
      switch (origin){
        case "top":
          return {x1: 0 , y1: 0 , x2: 0 , y2: heightCanvas }
        case "bottom":
          return {x1: 0 , y1: heightCanvas , x2: 0 , y2: 0 }
        case "left":
          return {x1: 0 , y1: 0 , x2: widthCanvas , y2: 0 }
        case "right":
          return {x1: widthCanvas , y1: 0 , x2: 0 , y2: 0}
      }
    }
  }

  getColor(e){
    let x = e.offsetX;  
    let y = e.offsetY;  

    let pixel = this.ctx.getImageData(x,y,1,1)['data'];   
    let rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    return rgb;
  }

  rgbToHex(r, g, b) {

    return(valueToHex(r) + valueToHex(g) + valueToHex(b));

    function valueToHex(c) {
      return c.toString(16);
    }
  }
}

class SliderPicker extends Picker{

  constructor(canvas){
    super(canvas);

    this.minRag;
    this.maxRag;
  }

  otherColor(target){
    this.canvas.addEventListener('click', (e) => {
      let color = this.getColor(e);
      target.changeColor(color);
    });
  }
}

class CanvasPicker extends Picker{

  constructor(CANVAS_ID, initialColor){
    super(CANVAS_ID)
    this.initialColor = initialColor;

    this.indicator = this.canvas.nextElementSibling;

    //const CP_btn = document.getElementById('colorPicker-btn');

    this.canvas.addEventListener('click', (e) => {
      let x = e.offsetX;  
      let y = e.offsetY; 

      this.indicator.setAttribute('style', `top: ${y}px; left: ${x}px `)
      
      let pixel = this.ctx.getImageData(x,y,1,1)['data'];   
      let rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

      //CP_btn.children[0].style.backgroundColor = rgb;

      this.currentColor = rgb; 
    });
  }


  changeColor(color){
    const canvasGradientH = [color,'#fff'];
    const canvasGradientV = ['#fff0', '#000'];
  
    this.addGradient(canvasGradientH, 'right');
    this.addGradient(canvasGradientV, 'top');
  }

  setUpPicker(target){
 
  }
}
