import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import nebula from '../src/img/c_nebula.jpg';
import stars from '../src/img/stars.jpg';
import space from '../src/img/space.jpg';
import earth from '../src/img/earth.jpg';



const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
const textureLoader = new THREE.TextureLoader();

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000

);
const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-10, 30, 30);
orbit.update()

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
//   color: 0x0000FF,
//   wireframe: false,
    map: textureLoader.load(earth)
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)  
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

renderer.setClearColor(0xFFEA00)

// scene.background = textureLoader.load(starts);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nebula,
    nebula,
    nebula,
    nebula,
    nebula,
    nebula
]);

const sphere2Geometry = new THREE.SphereGeometry(4, 60, 60);
const sphere2Material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(space)
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(0, 15, 10);
// box2.material.map = textureLoader.load(space);

const gui = new dat.GUI();


let step = 0;
let speed = 0.01;

function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  step += speed;
  sphere.position.y = 20 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)

renderer.render(scene, camera)
