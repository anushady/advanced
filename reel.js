// Canvas
const canvas4 = document.querySelector("canvas.webgl4");

// Scene
const scene4 = new THREE.Scene();

const video = document.getElementById("video");
//const texture = new THREE.VideoTexture(video);
//texture.minFilter = THREE.LinearFilter;
//texture.magFilter = THREE.LinearFilter;
const imagetex = new THREE.TextureLoader().load("images/alef-preview.jpg");
const geometry = new THREE.PlaneGeometry(5, 3);
const material = new THREE.MeshBasicMaterial({
  map: imagetex,
  //color: 0xffff00,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0,
});

const plane = new THREE.Mesh(geometry, material);
scene4.add(plane);
plane.position.set(0, 0, -9);
plane.rotation.set(0, Math.PI / 2, 0);

/**
 * Sizes
 */
const sizes4 = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function resiz() {
  // Update sizes
  sizes4.width = window.innerWidth;
  sizes4.height = window.innerHeight;

  // Update camera
  camera4.aspect = sizes4.width / sizes4.height;
  camera4.updateProjectionMatrix();

  // Update renderer
  renderer4.setSize(sizes4.width, sizes4.height);
  renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener("resize", resiz);

/**
 * Camera
 */
// Base camera
const camera4 = new THREE.PerspectiveCamera(
  45,
  sizes4.width / sizes4.height,
  0.1,
  1000
);
camera4.position.x = 0;
camera4.position.y = 0;
camera4.position.z = 3;
scene4.add(camera4);

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
const renderer4 = new THREE.WebGLRenderer({
  canvas: canvas4,
  alpha: true,
  antialias: true,
});
renderer4.setSize(sizes4.width, sizes4.height);
renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer4.isWebGLMultipleRenderTargets = true;
/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove2);

let mouseX4 = 0;
let mouseY4 = 0;

let targetX4 = 0;
let targetY4 = 0;

const windowX4 = window.innerWidth / 2;
const windowY4 = window.innerHeight / 2;

function onDocumentMouseMove2(event) {
  mouseX4 = event.clientX - windowX4;
  mouseY4 = event.clientY - windowY4;
}
gsap.registerPlugin(ScrollTrigger);
// const updateOnScroll = (event) => {
//   let tl = gsap.timeline();
//   tl.to(obj.rotation, {
//     y: 0,
//     duration: 1,
//   }).to(
//     obj.position,
//     {
//       x: 0,
//       z: window.scrollY * 0.0033,
//     },
//     0
//   );
// };

// window.addEventListener("scroll", updateOnScroll);
var tlp = gsap.timeline();
var action67 = tlp.to(".webgl4", {
  ease: "none",
  duration: 1,
  zIndex: 0,
});
//   .to(renderer4.setSize, {
//     x: sizes4.width,
//     y: sizes4.height,
//   });

ScrollTrigger.create({
  trigger: canvas4,
  start: "top top",
  endTrigger: "#section3",
  end: "top top",
  pin: true,
  pinSpacing: true,
  animation: action67,
  toggleActions: "play complete reverse reset",
});

// var tl0s = gsap.timeline();
// var action8 = tl0s.from(plane.scale, { y:0 , duration: 1 });

// ScrollTrigger.create({
//   trigger: "#section1",
//   start: "top top",
//   endTrigger: "#section2",
//   end: "top top",
//   animation: action8,
//   scrub: 2,
//   toggleActions: "play reverse play reverse",
// });

var tl0 = gsap.timeline();
var action5 = tl0.to(material, { opacity: 1, duration: 1 }, 0);

tl0.to(plane.rotation, { y: Math.PI, duration: 1 }, 0);
tl0.to(plane.position, { z: -2, duration: 1 }, 0);
tl0.to(plane.position, { x: -0.2, duration: 1 }, 0);

ScrollTrigger.create({
  trigger: "#section2",
  start: "top top",
  endTrigger: "#section3",
  end: "top top",
  animation: action5,
  scrub: 2,
  toggleActions: "play reverse play reverse",
});

const clock4 = new THREE.Clock();

const tick4 = () => {
  window.requestAnimationFrame(tick4);
  const deltaTime4 = clock4.getDelta();
  //if ( mixer1 ) mixer1.update( deltaTime);

  targetX4 = mouseX4 * 0.0003;
  targetY4 = mouseY4 * 0.0003;

  // Update objects
  //plane.rotation.y += targetX4 - plane.rotation.y;
  //plane.rotation.x += targetY4 - plane.rotation.x;
  //plane.rotation.x -= 0.00006 * (targetY - plane.rotation.y);
  //if (obj) obj.position.z += 0.0008 * (targetY - obj.position.z);
  // Update Orbital Controls
  //controls.update();
  renderer4.render(scene4, camera4);

  // Call tick again on the next frame
};

tick4();
