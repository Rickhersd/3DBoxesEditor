export class Outliner{

  constructor(){
    
    this.items = new Map();
    this.outlinerEl = document.getElementById('outliner');
    this.currentSelect;

    customElements.define("outliner-element", OutlinerElement, { extends: "li" });
  }

  addItem(item){
    this.items.set(this.items.size + 1, item);
    this.update();
  }

  deleteItem(item){
    this.items.delete(item.id);
    this.update();
  }

  changeItems(id_item1, id_item2){
    let itemValue1 = this.items.get(id_item1); 
    let itemValue2 = this.items.get(id_item2);

    this.item.set(id_item1, itemValue2);
    this.item.set(id_item2, itemValue1);
  }

  update(){

    this.outlinerEl.innerHTML = "";
    let fragment = new DocumentFragment();

    this.items.forEach((item) => {

      let elementDom = item.element;

      let prueba = document.createElement('li', {is: 'outliner-element'}); 
      //elementDom.classList.add('outliner__item');

      prueba.addEventListener('click', (e) => {

        let el = this.currentSelected;

        if(el != null) el.classList.remove('outliner__item-selected');
        el = prueba;
        el.classList.add('outliner__item-selected');
        
        this.currentSelected = el;
      }); 
      
      fragment.append(prueba);
    });
    this.outlinerEl.append(fragment);
  }
}

class OutlinerElement extends HTMLLIElement {

  constructor(element){
    
    self = super();

    this.id;
    this.className = 'outliner__item';
    this.inputName = createNameInput();
    this.eyeBtn = createEyeBtn();

    self.append(this.inputName);   
    self.append(this.eyeBtn);
  
    function createEyeBtn(){
      let URI = 'http://www.w3.org/2000/svg'
      let svgEl = document.createElementNS(URI, 'svg');
      svgEl.classList.add("outliner__item-eyeBtn");
      svgEl.setAttributeNS(URI, 'viewbox', '0 0 24 24;')
   
      svgEl.innerHTML = "<g stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'><path d='m1 12s4-8 11-8 11 8 11 8'/><path d='m1 12s4 8 11 8 11-8 11-8'/><circle cx='12' cy='12' r='3'/></g>"
      return svgEl;
    }

    function createIdDiv(){

    }

    function createNameInput(){
      let inputEl = document.createElement('input');
      

      inputEl.setAttribute('type', 'text');
      inputEl.setAttribute('readonly', '');
      inputEl.classList.add('outliner__item-input');

      inputEl.addEventListener('dblclick', () => {
        inputEl.removeAttribute('readonly');
      });

      return inputEl;
    }
  }
}

