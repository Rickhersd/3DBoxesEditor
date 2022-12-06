export default class ColorPicker {

  constructor(){
    this.colorSeleced;
    
  }

  init(){




    function setUpCanvas(){
      var colorCanvas = document.getElementById('color_canvas');
      var ColorCtx = colorCanvas .getContext('2d');  // This create a 2D context for the canvas

      // Create a Vertical Gradient(white to black)
      let gradientV = ColorCtx.createLinearGradient(0, 0, 0, 300);
      gradientV.addColorStop(0, 'rgba(0,0,0,0)');
      gradientV.addColorStop(1, '#000');
      ColorCtx.fillStyle = gradientV;
      ColorCtx.fillRect(0, 0, ColorCtx .canvas.width, ColorCtx.canvas.height); 

      // Create a horizontal gradient
      var color = '#0000ff'
      let gradientH = ColorCtx .createLinearGradient(0, 0, ColorCtx .canvas.width, 0);
      gradientH.addColorStop(0, '#fff');
      gradientH.addColorStop(1, color);
      ColorCtx .fillStyle = gradientH;
      ColorCtx .fillRect(0, 0, ColorCtx .canvas.width, ColorCtx .canvas.height);

      colorCanvas.addEventListener('click',function(event){
        let x = event.clientX;  // Get X coordinate
        let y = event.clientY;  // Get Y coordinate
        pixel = ColorCtx.getImageData(x,y,1,1)['data'];   // Read pixel Color
        rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        document.body.style.background = rgb;    // Set this color to body of the document
      });
    }

    function setUpSlider(){
      var colorCanvas = document.getElementById('color_canvas');
      var ColorCtx = colorCanvas .getContext('2d');  // This create a 2D context for the canvas

      // Create a Vertical Gradient(white to black)
      let gradientV = ColorCtx.createLinearGradient(0, 0, 0, 300);
      gradientV.addColorStop(0, 'rgba(0,0,0,0)');
      gradientV.addColorStop(1, '#000');
      ColorCtx.fillStyle = gradientV;
      ColorCtx.fillRect(0, 0, ColorCtx .canvas.width, ColorCtx.canvas.height); 

      // Create a horizontal gradient
      var color = ['#ff0000', '#ffff00', '#00ff00','#00ffff', '#0000ff', '#ff00ff', '#ff0000' ]
      let gradientH = ColorCtx .createLinearGradient(0, 0, 0, 0);
      gradientH.addColorStop(0, '#fff');
      gradientH.addColorStop(1, color);
      ColorCtx .fillStyle = gradientH;
      ColorCtx .fillRect(0, 0, ColorCtx .canvas.width, ColorCtx .canvas.height);

      colorCanvas.addEventListener('click',function(event){
        let x = event.clientX;  // Get X coordinate
        let y = event.clientY;  // Get Y coordinate
        pixel = ColorCtx.getImageData(x,y,1,1)['data'];   // Read pixel Color
        rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        document.body.style.background = rgb;    // Set this color to body of the document
      });
    }
  }  

}



