export default class MovilUI{

  constructor(){};

  static CanvasCont = document.getElementById('container');
  #canvasCont = document.getElementById('container');
  UImobile = document.querySelector('.editor-mobile__UI');
  exitBtn;
  openBtn;


  setExitBtn(btn){
    this.exitBtn = btn;
    this.exitBtn.addEventListener('click', () => {
      this.#hideUI();
    });
  };

  setOpenBtn(btn){
    this.openBtn = btn;
    this.openBtn.addEventListener('click', () => {
      this.#displayUI();
    });
  };

  #displayUI(){
    this.#canvasCont.classList.add('show-3DEditorMobile');
    this.UImobile.style.display = 'block';
  }

  #hideUI(){
    this.#canvasCont.classList.remove('show-3DEditorMobile');
    this.UImobile.style.display = 'none';
  }
}