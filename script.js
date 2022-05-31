// Canvas
const canvas2 = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GLTF Loader
var loader = new THREE.GLTFLoader();
var obj;
loader.load(
  // resource URL
  "models/a.glb",
  // called when the resource is loaded
  function (gltf) {
    obj = gltf.scene;
    scene.add(obj);
    obj.scale.set(0.026, 0.026, 0.026);
    obj.position.set(0, 0, 0);
  }
);
const geometry = new THREE.PlaneGeometry(5, 3);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(0, 0, -2);
plane.rotation.set(0, Math.PI / 2, 0);

// Lights
const light = new THREE.AmbientLight(0xffffff, 0.6); // soft white light
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(20, -0.1, 10);
scene.add(dirLight);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
dirLight2.position.set(-20, -0.1, 10);
scene.add(dirLight2);

const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight3.position.set(20, 0, 10);
scene.add(dirLight3);

const dirLight4 = new THREE.DirectionalLight(0xffffff, 0.2);
dirLight4.position.set(-20, 0, 91);
scene.add(dirLight4);

const width = 10;
const height = 100;
const intensity = 10;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(500, 0, 100);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);
const rectLight2 = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight2.position.set(-500, 0, 100);
rectLight2.lookAt(0, 0, 0);
scene.add(rectLight2);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

//Controls
// const controls = new THREE.OrbitControls(camera, canvas2);
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
const renderer = new THREE.WebGLRenderer({
  canvas: canvas2,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.isWebGLMultipleRenderTargets = true;
/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

const updateOnScroll = (event) => {
  let tl = gsap.timeline();
  tl.to(
    obj.rotation,
    {
      y: 0,
      duration: 1,
    },
    0
  )
    .to(
      obj.position,
      {
        x: 0,
        duration: 1,
      },
      0
    )
    .to(
      obj.position,
      {
        z: window.scrollY * 0.0033,
        duration: 1,
      },
      0
    )
    .to(
      material,
      {
        opacity: 1,
        duration: 2,
      },
      5
    )
    .to(
      plane.rotation,
      {
        y: 0,
        duraion: 2,
      },
      5
    );
};

window.addEventListener("scroll", updateOnScroll);

const clock = new THREE.Clock();

const tick = () => {
  window.requestAnimationFrame(tick);
  const deltaTime = clock.getDelta();
  //if ( mixer1 ) mixer1.update( deltaTime);

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  // Update objects
  if (obj) obj.rotation.y += 0.02 * (targetX - obj.rotation.y);
  plane.rotation.y += 0.008 * (targetX - obj.rotation.y);
  if (obj) obj.position.z += 0.0008 * (targetY - obj.position.z);
  // Update Orbital Controls
  //controls.update();
  renderer.render(scene, camera);

  // Call tick again on the next frame
};

tick();
