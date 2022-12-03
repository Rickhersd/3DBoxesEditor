import {
    Color as threeColor,
    Scene as threeScene,
    PerspectiveCamera as threePerspectiveCamera,
    WebGLRenderer as threeWebGlRenderer,
    AmbientLight as threeAmbientLight,
    sRGBEncoding as threesRGBEncoding,
} from 'three';
import { GLTFLoader } from 'three/src/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/src/controllers/OrbitControls.js';

import "./style.scss"

const scene = new threeScene()

console.log(scene);
const bgColor = new threeColor( 0xA0A0A0 );
scene.background = bgColor;

const lightAmb = new threeAmbientLight( 0x404040, 10 ); // soft white light
scene.add( lightAmb );

const container = document.getElementById('container');

const camera = new threePerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new threeWebGlRenderer()
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.outputEncoding = threesRGBEncoding;

renderer.setSize(container.clientWidth, container.clientHeight)


container.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

console.log('holamundo');

const loader = new GLTFLoader()
loader.load( "./Models/cubo.glb",
    function (gltf) {
        console.log(gltf)

        gltf.scene.traverse(function (child) {
            if ((child.isMesh)) {
                const m = child;
                m.receiveShadow = true
                m.castShadow = true
            }
        })
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const openBtn = document.querySelector('.editor-mobile__openBtn');
const exitBtn = document.querySelector('.editor-mobile__exitBtn');

exitBtn.addEventListener('click', () => {
    container.classList.remove('show-3DEditorMobile');
})
openBtn.addEventListener('click', () => {
    container.classList.add('show-3DEditorMobile');
})

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
    render()
}


function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

}

function render() {
    renderer.render(scene, camera)
}

animate()