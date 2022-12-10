class Element{
  
  constructor(id){
    this.id = id;
    this.element;
    this.isDisplay = true;
    this.onClick = false;
    this.top;
    this.right;
    this.bottom;
    this.left;

    this.pointers = createPointers();

    function createPointers(){

      let pointers = {
        topLeft: {
          el:document.createElement('span', {is: 'pointer-element'}),
          cords: "top: 0px; left: 0px; translate: -50% -50%",
        },
        topRight:{
          el:document.createElement('span', {is: 'pointer-element'}),
          cords: "top: 0px; right: 0px; translate: 50% -50%",
        },
        bottomLeft: {
          el:document.createElement('span', {is: 'pointer-element'}),
          cords: "bottom: 0px; left: 0px; translate: -50% 50%",
        },
        bottomRight: {
          el:document.createElement('span', {is: 'pointer-element'}),
          cords: "bottom: 0px; right: 0px; translate: 50% 50%",
        }
      };

      let fragment = new DocumentFragment();

      for(let pointer in pointers){
        let span = pointers[pointer]["el"];
        span.setAttribute('style', pointers[pointer]["cords"]);
        fragment.append(span);
      }

      return fragment;
    }
  }
}

export class Pointer extends HTMLSpanElement {

  constructor(){
    self = super();

    this.self = self;
    this.classParent;
    console.log(this.self);

    self.classList.add('pointer');

    this.onClick = false;

    let initialX;
    let initialY;

    self.addEventListener('mousedown', (e) => {
      initialX = e.x;
      initialY = e.y;
      this.onClick = true;
    });

    window.addEventListener('mousemove', (e) => {
      e.preventDefault();

      let difX = e.x - initialX;
      let difY = e.y - initialY;

      if(this.onClick != true) return;       

      let currentX = this.currentPosX.replace('px', '');
      let currentY = this.currentPosY.replace('px', '');

      let posx = parseInt(currentX) + difX;
      let posy = parseInt(currentY) + difY;

      //self .setAttribute('style', `top: ${posy}px; left: ${posx}px`)
    })

    self.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.currentPosY = self.style.top;
      this.currentPosX = self.style.left;

      this.onClick = false
    });

    self.addEventListener('click', (e) => {
      this.expand();
    })


  }

  expand(){
    let parent = this.self.parentElement;

    let top = parent.style.top; 
    let left = parent.style.left;

    let right = `${538 - parent.clientWidth - remPx(left)}px`;
    let bottom = `${538 - parent.clientHeight - remPx(top)}px`;

    parent.style.top = 'initial';
    parent.style.left = 'initial';
    
    parent.style.right = right;
    parent.style.bottom = bottom;

    parent.style.width = `${parent.clientWidth + 3}px`;
    parent.style.height = `${parent.clientHeight + 3}px`;

    parent.style.top = `${538 - parent.clientHeight - remPx(bottom)}px`;;
    parent.style.left = `${538 - parent.clientWidth - remPx(right)}px`;
    
    parent.style.right = 'initial';
    parent.style.bottom = 'initial';
  }
}

export class TextElement extends Element{

  constructor(id, text, fontSize, fontFamily,isItalic, color, canvas){
    super(id);

    this.text = text;
    this.id = id;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fontStyle = isItalic ? 'Italic': 'Normal';
    this.fontColor = color;
    this.currentPosX = '300px';
    this.currentPosY = '300px';
    this.canvas = canvas;

    let textEl = document.createElement('div');
    textEl.innerText = this.text;
    textEl.setAttribute('id', `text-${id}`);
    textEl.setAttribute('contenteditable', '')
    textEl.setAttribute('style', `font-family: ${this.fontFamily}; font-size: ${this.fontSize}; font-style: ${this.fontStyle}; color: ${this.fontColor};`)
    textEl.classList.add('textAdded');
    textEl.style.top = this.currentPosX;
    textEl.style.left = this.currentPosY;

    textEl.append(this.pointers);
    this.element = textEl;


  }
  
  init(canvasCont){
    const item = document.querySelector('.textAdded');

    let initialX;
    let initialY;

    item.addEventListener('mousedown', (e) => {
      initialX = e.x;
      initialY = e.y;
      this.onClick = true;
    });

    canvasCont.addEventListener('mousemove', (e) => {
      e.preventDefault();

      let difX = e.x - initialX;
      let difY = e.y - initialY;

      if(this.onClick != true) return;       

      let currentX = this.currentPosX.replace('px', '');
      let currentY = this.currentPosY.replace('px', '');

      let posx = addPx(parseInt(currentX) + difX);
      let posy = addPx(parseInt(currentY) + difY);

      item.style.top = posy;
      item.style.left = posx;
    })

    canvasCont.addEventListener('mouseleave', (e) => {
      this.currentPosY = item.style.top;
      this.currentPosX = item.style.left;

      this.onClick = false
    });

    item.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.currentPosY = item.style.top;
      this.currentPosX = item.style.left;

      this.top = item.style.top;
      this.left = item.style.left;

      this.right = `${canvasCont.clientWidth - item.clientWidth - remPx(this.left)}px`;
      this.bottom = `${canvasCont.clientHeight - item.clientHeight - remPx(this.top)}px`;

      this.onClick = false
    });

  }

  drop(e) {
    e.target.classList.remove('drag-over');

    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    console.log(e)

    let posX = e.offsetX;
    let posY = e.offsetY;

    this.currentPosX = posX;

    console.log(draggable)
    this.currentPosY = posY;
    
    draggable.setAttribute('style', `top: ${posY}px; left: ${posX}px`)

    draggable.classList.remove('hide');
  }
  
  drawTextF(){
    let ctx = this.canvas.getContext('2d');
    ctx.font = `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
    console.log(`${this.fontStyle} ${this.fontSize} ${this.fontFamily}`)
    ctx.fillText(this.text, this.currentPosX, this.currentPosY);
  }
}

function remPx(str){
  return parseInt(str.replace('px', ''));
}

function addPx(n){
  return `${n}px`;
}