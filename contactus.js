// Canvas
const canvas3 = document.querySelector("canvas.webgl3");

// Scene
const scene3 = new THREE.Scene();

// GLTF Loader
var loader3 = new THREE.GLTFLoader();
var obj3;
loader3.load(
  // resource URL
  "models/b.glb",
  // called when the resource is loaded
  function (gltf) {
    obj3 = gltf.scene;
    scene3.add(obj3);
    obj3.scale.set(0.1, 0.1, 0.1);
    obj3.position.set(0, -0.2, 0);
  }
);

// Lights
const light3 = new THREE.AmbientLight(0xffffff, 0); // soft white light3
scene3.add(light3);

const dirLight31 = new THREE.DirectionalLight(0xaaaaaa, 0.1);
dirLight31.position.set(20, -0.1, 10);
scene3.add(dirLight31);

const dirLight32 = new THREE.DirectionalLight(0xaaaaaa, 0.1);
dirLight32.position.set(-20, -0.1, 10);
scene3.add(dirLight32);

const dirLight33 = new THREE.DirectionalLight(0xaaaaaa, 0.1);
dirLight33.position.set(20, 0, 10);
scene3.add(dirLight33);

const dirLight34 = new THREE.DirectionalLight(0xaaaaaa, 0.1);
dirLight34.position.set(-20, 0, 91);
scene3.add(dirLight34);
const dirLight35 = new THREE.DirectionalLight(0xaaaaaa, 0.1);
dirLight35.position.set(0, 0, 9);
//scene3.add(dirLight35);
const dirLight36 = new THREE.DirectionalLight(0xaaaaaa, 0.1);
dirLight36.position.set(0, 1, 0);
scene3.add(dirLight36);

// const width3 = 100;
// const height3 = 100;
// const intensity3 = 10;
// const rectLight3 = new THREE.RectAreaLight(
//   0xffffff,
//   intensity3,
//   width3,
//   height3
// );
// rectLight3.position.set(0, 0, 10);
// rectLight3.lookAt(0, 0, 0);
// scene3.add(rectLight3);
// const rectLight4 = new THREE.RectAreaLight(
//   0xffffff,
//   intensity3,
//   width3,
//   height3
// );
// rectLight4.position.set(-500, 0, 100);
// rectLight4.lookAt(0, 0, 0);
//scene3.add(rectLight4);
/**
 * Sizes
 */
const sizes3 = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes3
  sizes3.width = window.innerWidth;
  sizes3.height = window.innerHeight;

  // Update camera3
  camera3.aspect = sizes3.width / sizes3.height;
  camera3.updateProjectionMatrix();

  // Update renderer3
  renderer3.setSize(sizes3.width, sizes3.height);
  renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera3
const camera3 = new THREE.PerspectiveCamera(
  45,
  sizes3.width / sizes3.height,
  0.1,
  1000
);
camera3.position.x = 0;
camera3.position.y = 0;
camera3.position.z = 3;
scene3.add(camera3);

//Controls
// const controls = new THREE.OrbitControls(camera3, canvas2);
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.keys = {
//   LEFT: "ArrowLeft", //left arrow
//   UP: "ArrowUp", // up arrow
//   RIGHT: "ArrowRight", // right arrow
//   BOTTOM: "ArrowDown", // down arrow
// };

/**
 * Renderer
 */
const renderer3 = new THREE.WebGLRenderer({
  canvas: canvas3,
  alpha: true,
  antialias: true,
});
renderer3.setSize(sizes3.width, sizes3.height);
renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer3.isWebGLMultipleRenderTargets = true;
/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX3 = 0;
let mouseY3 = 0;

let targetX3 = 0;
let targetY3 = 0;

const windowX3 = window.innerWidth / 2;
const windowY3 = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX3 = event.clientX - windowX3;
  mouseY3 = event.clientY - windowY3;
}
const clock3 = new THREE.Clock();

const tick3 = () => {
  window.requestAnimationFrame(tick3);
  const deltaTime = clock3.getDelta();
  //if ( mixer1 ) mixer1.update( deltaTime);

  targetX3 = mouseX3 * 0.001;
  targetY3 = mouseY3 * 0.001;

  // Update obj3ects
  if (obj3) obj3.rotation.y += 0.02 * (targetX3 - obj3.rotation.y);
  //plane.rotation.y += 0.008 * (targetX - obj3.rotation.y);
  if (obj3) obj3.rotation.x += 0.08 * (targetY3 - obj3.rotation.x);
  // Update Orbital Controls
  //controls.update();
  renderer3.render(scene3, camera3);

  // Call tick again on the next frame
};

tick3();
