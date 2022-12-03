export default class ColorTool{

  constructor(){
    this.TRAY = document.getElementById('tray-colorTool');
    this.TRAYSLIDE = document.getElementById('traySlide-colorTool');
    this.isDisplay = false;
  };

  init(){
    
    const colors = [
      {
        color: '66533C'
      },
      {
        color: '173A2F'
      },
      {
        color: '153944'
      },
      {
          color: '27548D'
      },
      {
          color: '438AAC'
      }  
    ]

    this.buildColors(colors);
  }

  buildColors(colors) {
    for (let [i, color] of colors.entries()) {
      let swatch = document.createElement('div');
      swatch.classList.add('tray__swatch');
  
        swatch.style.background = "#" + color.color;
  
      swatch.setAttribute('data-key', i);
      console.log(this.TRAYSLIDE)
      this.TRAYSLIDE.append(swatch);
    }
  }

  setToogleBtn(btn){
    btn.addEventListener('click', ()=> {
      const position = this.isDisplay != true ? '0px 0%' : '0px 100%';
      this.isDisplay = !this.isDisplay;
      this.TRAY.style.translate = position;
    });
  }

}