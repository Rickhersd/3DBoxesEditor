export class TextElement{

  constructor(id, text, fontSize, fontFamily,isItalic, canvas){
    this.text = text;
    this.id = id;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fontStyle = isItalic ? 'Italic': 'Normal';
    this.currentPosX = 0;
    this.currentPosY = 0;
    this.element;
    this.canvas = canvas;
  }
  
    init(canvasCont){
      const item = document.querySelector('.textAdded');
      const posX = document.getElementById('PosX');
      const posY = document.getElementById('PosY');
  
      item.addEventListener('dragstart', dragStart);
  
      function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        console.log(e.target.id)
        setTimeout(() => {
          e.target.classList.add('hide');
        }, 0);
      }
   
      canvasCont.addEventListener('dragenter', dragEnter)
      canvasCont.addEventListener('dragover', dragOver);
      canvasCont.addEventListener('dragleave', dragLeave);
      canvasCont.addEventListener('drop', (e) => {
        this.drop(e);
      });
           
      function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
      }
  
      function dragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
      }
  
      function dragLeave(e) {
      }
    }
  
    drop(e) {
      e.target.classList.remove('drag-over');
  
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
  
      let posX = e.offsetX;
      let posY = e.offsetY;

      this.currentPosX = posX;
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
    
    createElement(index){
      let textEl = document.createElement('div');
      textEl.innerText = this.text;
      textEl.setAttribute('draggable', true);
      textEl.setAttribute('id', `text-${index}`);
      textEl.classList.add('textAdded');
      this.element = textEl;
      return textEl;
    }
  }