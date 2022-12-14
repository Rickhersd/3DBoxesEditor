import html from '../views/textTool.html';
import { TextElement } from "./textElement";

export class TextTool {

  constructor(){

    const view = document.createElement('div');
    view.innerHTML = html;

    this.currentText = '';
    this.fontSize = '30px';
    this.fontFamily = '';
    this.fontIsItalic = false;
    this.fontColor = 'black';
    this.currentSelected = '';
    

    const textInput = view.getElementsByClassName("textTool__text")[0];
    const familySelect = view.getElementsByClassName("textTool__family")[0];
    const sizeSelect = view.getElementsByClassName("textTool__size")[0];
    const italicCheckbox = view.getElementsByClassName("textTool__italic")[0];

    textInput.addEventListener('input', (e) => {
      this.setAttribute('current-text', e.target.value);
      if(this.getAttribute('element-selected') === null){
        
      }
    
    })

    familySelect.addEventListener('input', (e) => {
      this.setAttribute('font-size', e.target.value);
    })

    sizeSelect.addEventListener('input', (e) => {
      this.setAttribute('font-family', e.target.value);
    })

    italicCheckbox.addEventListener('change', (e) =>{
      this.setAttribute('font-isItalic', e.target.checked);
    });

    // Take attribute content and put it inside the info spa
      
    this.view = view;
  }

  addTextElement(){
    //let color = colorPicker.getColor();

    const textElement = new TextElement(
      index, 
      currentFontText, 
      currentFontSize, 
      currentFontFamily,
      currentItalic, 
      color,
      canvas
    );
    canvasCont.appendChild(textElement.element);
    //outliner.addItem(textElement);

    textElement.init(canvasCont);
  }
}