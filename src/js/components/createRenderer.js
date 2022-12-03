import MovilUI from "../movilUI";
import { sRGBEncoding } from "three";
import { WebGLRenderer } from "three";


const renderer = new WebGLRenderer();
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.outputEncoding = sRGBEncoding;
renderer.setSize(MovilUI.CanvasCont.clientWidth, MovilUI.CanvasCont.clientHeight)

console.log(renderer)
container.appendChild(renderer.domElement)

export default renderer;