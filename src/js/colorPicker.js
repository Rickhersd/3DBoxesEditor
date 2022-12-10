export default class ColorPicker {

  constructor(){
    this.canvas;
    this.slider;
    this.CP_btn
  }

  init(){

    const canvasPicker = new CanvasPicker('colorPicker-colorPicker', "#00ff00");
    const sliderPicker = new SliderPicker('colorPicker-slider');

    const sliderGrafientV = ['#ff0000', '#ffff00', '#00ff00','#00ffff', '#0000ff', '#ff00ff', '#ff0000' ];

    const canvasGradientH = [canvasPicker.initialColor,'#fff'];
    const canvasGradientV = ['#fff0', '#000'];

    canvasPicker.setUp();

    sliderPicker.addGradient(sliderGrafientV, 'top');

    canvasPicker.addGradient(canvasGradientH, 'right');
    canvasPicker.addGradient(canvasGradientV, 'top');
  
    sliderPicker.otherColor(canvasPicker);
    canvasPicker.setUpPicker();
    
    this.selected = canvasPicker.initialColor;
    this.canvas = canvasPicker;

    this.CP_btn = document.getElementById('colorPicker-btn');
    const CP_selecter = document.getElementById('colorPicker-selecter');

    this.CP_btn.addEventListener('click', () => {
      CP_selecter.classList.toggle('show');
      console.log(this.selected)
    });
  }
  
  getColor(){
    return this.canvas.currentColor;
  }
}

class Picker{

  constructor(CANVAS_ID){
    this.currentColor;
    this.indicator;
    this.canvas = document.getElementById( CANVAS_ID, { willReadFrequently: true });
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

  constructor(CANVAS_ID){
    super(CANVAS_ID);

    this.minRag;
    this.maxRag;
  }

  otherColor(target){
    this.canvas.addEventListener('click', (e) => {
      
      console.log(e);
      let color = this.getColor(e);
      console.log(color)
      target.changeColor(color);
    });
  }
}

class CanvasPicker extends Picker{

  constructor(CANVAS_ID, initialColor){
    super(CANVAS_ID)
    this.initialColor = initialColor;
  }

  setUp(){
    this.indicator = this.canvas.nextElementSibling;
  }

  changeColor(color){
    const canvasGradientH = [color,'#fff'];
    const canvasGradientV = ['#fff0', '#000'];
  
    this.addGradient(canvasGradientH, 'right');
    this.addGradient(canvasGradientV, 'top');
  }

  setUpPicker(target){

    const CP_btn = document.getElementById('colorPicker-btn');

    this.canvas.addEventListener('click', (e) => {
      let x = e.offsetX;  
      let y = e.offsetY; 

      console.log(x);
      console.log(y)
      this.indicator.setAttribute('style', `top: ${y}px; left: ${x}px `)
      
      let pixel = this.ctx.getImageData(x,y,1,1)['data'];   
      let rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

      CP_btn.children[0].style.backgroundColor = rgb;

      this.currentColor = rgb; 
    });
  }


}