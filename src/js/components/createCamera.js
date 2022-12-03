import { PerspectiveCamera } from "three";
import MovilUI from "../movilUI";

const camera = new PerspectiveCamera(
    75,
    MovilUI.CanvasCont.clientWidth / MovilUI.clientHeight,
    0.1,
    1000
)

camera.position.z = 5;

export default camera;