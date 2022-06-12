// Canvas
const canvas2 = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GLTF Loader
var loader = new THREE.GLTFLoader();
var obj;
loader.load(
  // resource URL
  "models/whatsup3.glb",
  // called when the resource is loaded
  function (gltf) {
    obj = gltf.scene;
    scene.add(obj);
    obj.scale.set(0.6, 0.6, 0.6);
    obj.position.set(0, 0.2, 0);
  }
);
// const video = document.getElementById("video");
// //const texture = new THREE.VideoTexture(video);
// //texture.minFilter = THREE.LinearFilter;
// //texture.magFilter = THREE.LinearFilter;
// const imagetex = new THREE.TextureLoader().load("images/alef-preview.jpg");
// const geometry = new THREE.PlaneGeometry(5, 3);
// const material = new THREE.MeshBasicMaterial({
//   map: imagetex,
//   //color: 0xffff00,
//   side: THREE.DoubleSide,
//   transparent: true,
//   opacity: 0,
// });
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// const plane = new THREE.Mesh(geometry, material);
// scene.add(plane);
// plane.position.set(0, 0, -9);
// plane.rotation.set(0, Math.PI / 2, 0);
let textureVid = document.createElement("video");
textureVid.src = `images/showreel_preview.mp4`; // transform gif to mp4
textureVid.loop = true;
window.addEventListener("mousemove", () => {
  textureVid.play();
});

// Load video texture
let videoTexture = new THREE.VideoTexture(textureVid);
videoTexture.format = THREE.RGBFormat;
videoTexture.minFilter = THREE.NearestFilter;
videoTexture.maxFilter = THREE.NearestFilter;
videoTexture.generateMipmaps = false;
//const video = document.getElementById("video");
//const texture = new THREE.VideoTexture(video);
//texture.minFilter = THREE.LinearFilter;
//texture.magFilter = THREE.LinearFilter;
const imagetex = new THREE.TextureLoader().load("images/restricted.gif");
let geometry = new THREE.PlaneGeometry(5, 3);
const material = new THREE.MeshBasicMaterial({
  map: videoTexture,
  //color: 0xffff00,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(0, -0.5, -9);
plane.rotation.set(0, Math.PI / 2, 0);
plane.scale.set(1, 1, 1);

var widtha = $(window).width();
if (widtha < 1000) {
  plane.scale.set(0.8, 0.8, 1);
}
var widtha = $(window).width();
if (widtha < 800) {
  plane.scale.set(0.55, 0.55, 1);
}
var widtha = $(window).width();
if (widtha < 600) {
  plane.scale.set(0.4, 0.4, 1);
}

$(window).resize(function () {
  var widtha = $(window).width();
  if (widtha < 1000) {
    plane.scale.set(0.8, 0.8, 1);
  }
});
$(window).resize(function () {
  var widtha = $(window).width();
  if (widtha < 800) {
    plane.scale.set(0.55, 0.55, 1);
  }
});
$(window).resize(function () {
  var widtha = $(window).width();
  if (widtha < 600) {
    plane.scale.set(0.4, 0.4, 1);
  }
});
// Lights
const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
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

        z: window.scrollY * 0.0033,
      },
      0
    )
    .to(
      obj.position,
      {
        y: 0,
      },
      1
    );
};

window.addEventListener("scroll", updateOnScroll);

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

var tl0 = gsap.timeline();
var action5 = tl0.to(material, { opacity: 1, duration: 1 }, 0);

tl0.to(plane.rotation, { y: Math.PI, duration: 1 }, 0);
tl0.to(plane.position, { z: -2, duration: 1 }, 0);
tl0.to(plane.position, { x: 0, duration: 1 }, 0);
////whatsup
// if (obj) {
//   var tlwh = gsap.timeline();
//   var action5w = tlwh.to(obj.position, { y: 0, duration: 1 });

//   ScrollTrigger.create({
//     trigger: "body",
//     start: "top top",
//     endTrigger: "#section1",
//     end: "10% top",
//     animation: action5w,
//     scrub: 2,
//     toggleActions: "play reverse play reverse",
//   });
// }
// end//
ScrollTrigger.create({
  trigger: "#section2",
  start: "top top",
  endTrigger: "#section3",
  end: "top top",
  animation: action5,
  scrub: 2,
  toggleActions: "play reverse play reverse",
});

var tl0y = gsap.timeline();
var actiony = tl0y.to(plane.position, { y: 3.57 }, 0);

ScrollTrigger.create({
  trigger: "#section3",
  start: "top top",
  endTrigger: "#section4",
  end: "top top",
  animation: actiony,
  scrub: true,
  toggleActions: "play reverse play reverse",
});
const clock = new THREE.Clock();

const tick = () => {
  window.requestAnimationFrame(tick);
  const deltaTime = clock.getDelta();
  //if ( mixer1 ) mixer1.update( deltaTime);

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  targetX4 = mouseX4 * 0.0003;
  targetY4 = mouseY4 * 0.0003;
  // Update objects
  if (obj) obj.rotation.y += 0.008 * (targetX - obj.rotation.y);
  //plane.rotation.y -= 0.004 * (targetX - plane.rotation.z);
  //plane.rotation.x -= 0.00006 * (targetY - plane.rotation.y);
  //if (obj) obj.position.z += 0.0008 * (targetY - obj.position.z);
  // Update Orbital Controls
  //controls.update();
  renderer.render(scene, camera);

  // Call tick again on the next frame
};

tick();

// move Arrow png with cursor on image hover
gsap.utils.toArray(".recentworkcontainer").forEach((el) => {
  const image = el.querySelector("img.swipeimage"),
    //const image2 = el.querySelector("img.imagediv"),
    setX = gsap.quickSetter(image, "x", "px"),
    setY = gsap.quickSetter(image, "y", "px"),
    align = (e) => {
      const top = el.getBoundingClientRect().top;
      //const left = el.getBoundingClientRect().left;
      setX(e.clientX);
      setY(e.clientY - top);
    },
    startFollow = () => document.addEventListener("mousemove", align),
    stopFollow = () => document.removeEventListener("mousemove", align),
    fade = gsap.to(image, {
      autoAlpha: 1,
      ease: "none",
      paused: true,
      onReverseComplete: stopFollow,
    });

  el.addEventListener("mouseenter", (e) => {
    fade.play();
    startFollow();
    align(e);
  });
  el.addEventListener("mouseleave", () => fade.reverse());
});

//links move effect
var hoverMouse = function ($el) {
  $el.each(function () {
    var $self = $(this);
    var hover = false;
    var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
    var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;

    var attachEventsListener = function () {
      $(window).on("mousemove", function (e) {
        //
        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

        // cursor
        var cursor = {
          x: e.clientX,
          y: e.clientY + $(window).scrollTop(),
        };

        // size
        var width = $self.outerWidth();
        var height = $self.outerHeight();

        // position
        var offset = $self.offset();
        var elPos = {
          x: offset.left + width / 2,
          y: offset.top + height / 2,
        };

        // comparaison
        var x = cursor.x - elPos.x;
        var y = cursor.y - elPos.y;

        // dist
        var dist = Math.sqrt(x * x + y * y);

        // mutex hover
        var mutHover = false;

        // anim
        if (dist < width * hoverArea) {
          mutHover = true;
          if (!hover) {
            hover = true;
          }
          onHover(x, y);
        }

        // reset
        if (!mutHover && hover) {
          onLeave();
          hover = false;
        }
      });
    };

    var onHover = function (x, y) {
      gsap.to($self, 0.4, {
        x: x * 0.3,
        y: y * 0.3,
        //scale: .9,
        rotation: x * 0.05,
        ease: Power2.easeOut,
      });
    };
    var onLeave = function () {
      gsap.to($self, 0.5, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ease: Elastic.easeOut.config(0.2, 0.8),
      });
    };

    attachEventsListener();
  });
};

hoverMouse($(".link"));

//image Zoom

const imagediv = document.querySelector(".recentimg");

document.querySelector(".imagediv").addEventListener("mouseover", () => {
  gsap.fromTo(imagediv, { scale: 1.05 }, { scale: 1, duration: 0.75 });
});
