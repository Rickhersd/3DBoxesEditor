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
    this.parent;

    this.pointers = createPointers();


    function createPointers(){

      let pointers = {
        topLeft: {
          el:document.createElement('pointer-el', {is: 'pointer-el'}),
          cords: "top: 0px; left: 0px; translate: -50% -50%",
          type: 'topLeft',
        },
        topRight:{
          el:document.createElement('pointer-el', {is: 'pointer-el'}),
          cords: "top: 0px; right: 0px; translate: 50% -50%",
          type: 'topRight'
        },
        bottomLeft: {
          el:document.createElement('pointer-el', {is: 'pointer-el'}),
          cords: "bottom: 0px; left: 0px; translate: -50% 50%",
          type: 'bottomLeft'
        },
        bottomRight: {
          el:document.createElement('pointer-el', {is: 'pointer-el'}),
          cords: "bottom: 0px; right: 0px; translate: 50% 50%",
          type: 'bottomRight'
        }
      };

      let fragment = new DocumentFragment();

      for(let pointer in pointers){
        let span = pointers[pointer]["el"];
        span.setAttribute('style', pointers[pointer]["cords"]);
        span.setAttribute('pointer-type', pointers[pointer]["type"]);
        span.setAttribute('class', 'pointer');

        fragment.append(span);
      }

      return fragment;
    }
  }
}

export class Pointer extends HTMLElement {

  constructor(){
    self = super();

    this.onClick = false;
    this.type;
    this.refElement = self;
  }

  selectDir(type){
    let dir = {
      topLeft: {
        top: (p) => {return 'initial';},
        left: (p) => {return 'initial';},
        bottom: (p) => { return `${538 - remPx(p.style.top) - p.clientHeight}px`;},
        right: (p) => {return `${538 - remPx(p.style.left) - p.clientWidth}px`;}
      },
      topRight: {
        top: (p) => {return 'initial';},
        left: (p) => {return p.style.left;},
        bottom: (p) => { return `${538 - remPx(p.style.top) - p.clientHeight}px`;},
        right: (p) => {return 'initial';}
      },
      bottomLeft: {
        top: (p) => {return p.style.top},
        left: (p) => {return 'initial';},
        bottom: (p) => {return 'initial';},
        right: (p) => {return `${538 - remPx(p.style.left) - p.clientWidth}px`;}
      },
      bottomRight:{
        top: (p) => {return p.style.top;},
        left: (p) => {return p.style.left;},
        bottom: (p) => {return 'initial';},
        right: (p) => {return 'initial';}
      }
    }

    return dir[type];
  }

  expand(dir, difX, difY, initialW, initialH){
    let parent = this.refElement.parentElement;

    let left = parent.style.left;
    let top = parent.style.top;

    parent.style.right = dir.right(parent);
    parent.style.bottom = dir.bottom(parent);
    parent.style.top = dir.top(parent);
    parent.style.left = dir.left(parent);

    parent.style.width = `${initialW + difX}px`;
    parent.style.height = `${initialH + difY}px`;

    left = `${538 - remPx(parent.style.right) - parent.clientWidth}px`;
    top = `${538 - remPx(parent.style.bottom) - parent.clientHeight}px`;

    parent.style.top = top;
    parent.style.left = left;
    parent.style.right = 'initial';
    parent.style.bottom = 'initial';
  }

  connectedCallback(){

    this.type = this.refElement.getAttribute('pointer-type');

    let initialX;
    let initialY;
    let initialParentW;
    let initialParentH;

    let parent = this.refElement.parentElement;

    this.refElement.addEventListener('mousedown', (e) => {
      initialX = e.x;
      initialY = e.y;

      let rect = parent.getBoundingClientRect();
      initialParentH = rect.height;
      initialParentW = rect.width;

      this.onClick = true;
    });

    window.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if(this.onClick != true) return;       

      let difX = e.x - initialX;
      let difY = e.y - initialY;

      if (this.type == "topLeft") {
        difX = -difX;
        difY = -difY;
        console.log('hola')
      }
      if (this.type == "topRight"){
        difY = -difY;
      }
      if (this.type == "bottomLeft"){
        difX = -difX;
      }

      let dir = this.selectDir(this.type);


      this.expand(dir, difX, difY, initialParentW, initialParentH );

    })

    this.refElement.addEventListener('mouseup', (e) => {
      e.preventDefault();

      this.onClick = false;
    });
    
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

    let initialX;
    let initialY;

    this.element.addEventListener('mousedown', (e) => {
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

      //item.style.top = posy;
      //item.style.left = posx;
    })

    canvasCont.addEventListener('mouseleave', (e) => {
      this.currentPosY = this.element.style.top;
      this.currentPosX = this.element.style.left;

      this.onClick = false
    });

    this.element.addEventListener('mouseup', (e) => {
      e.preventDefault();
  
      this.top = this.element.style.top;
      this.left = this.element.style.left;

      this.right = `${canvasCont.clientWidth - this.element.clientWidth - remPx(this.left)}px`;
      this.bottom = `${canvasCont.clientHeight - this.element.clientHeight - remPx(this.top)}px`;

      this.onClick = false
    });

  }
  
  drawTextF(){
    let ctx = this.canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;

    let text = "hola como esta todo </br> yo estyo muy bien"

    console.log( `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`)
    console.log(this.text + " " + this.element.style.left + "" + this.element.style.top)

    ctx.fillText(text, remPx(this.element.style.left), remPx(this.element.style.top));
    console.log(ctx.measureText(text))
  }
}

function remPx(str){
  return parseInt(str.replace('px', ''));
}

function addPx(n){
  return `${n}px`;
}