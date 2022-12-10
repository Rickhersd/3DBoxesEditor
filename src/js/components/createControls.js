
import camera from "./createCamera";
import renderer from "./createRenderer";
import { OrbitControls } from "three/src/controllers/OrbitControls";

console.log(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)
//controls.maxPolarAngle = Math.PI / 2;
//controls.minPolarAngle = Math.PI / 3;
controls.maxDistance = 10;
controls.minDistance = 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; 
controls.autoRotateSpeed = 0.2;

export default controls;
