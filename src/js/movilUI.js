export default class MovilUI{

  constructor(){};

  static CanvasCont = document.getElementById('container');
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
    container.classList.add('show-3DEditorMobile');
    UImobile.style.display = 'block';
  }

  #hideUI(){
    container.classList.remove('show-3DEditorMobile');
    UImobile.style.display = 'none';
  }
}