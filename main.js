import * as THREE from "three";
import { cameraPosition } from "three/webgpu";

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30; // Adjust camera position

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Geometry for the torus
const cincinGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const cincinMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const cincin = new THREE.Mesh(cincinGeometry, cincinMaterial);
cincin.position.z = -50; // Position the torus
scene.add(cincin);

// Icon
const profileGeometry = new THREE.BoxGeometry(5, 5, 5);
const profileTexture = new THREE.TextureLoader().load("Aozora.jpeg");
const Aozora = new THREE.Mesh(profileGeometry, new THREE.MeshStandardMaterial({ map: profileTexture }));
Aozora.position.set(8, 0, -10); // Corrected variable name
scene.add(Aozora);

// Mars
const MarsMap = new THREE.TextureLoader().load("Mars.jpg");

const marsGeometry = new THREE.SphereGeometry(10,32,32);
const marsMaterial = new THREE.MeshStandardMaterial({
  map: MarsMap
})

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.z = -100;
scene.add(mars);  

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(50, 50, 50);
scene.add(pointLight, ambientLight);

// Star object
function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  // Correctly set the position of the star
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(400));
  star.position.set(x, y, z);
  scene.add(star);
}

// Create multiple stars
Array.from({ length: 200 }).forEach(addStar);

// Camera Movement
function cameraMovement() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * 0.01;

}

window.addEventListener("scroll", cameraMovement);

// Renderer
function animate() {
  requestAnimationFrame(animate);

  // rotate the mars
  mars.rotation.y += 0.01;
  
  // rotate the icon
  Aozora.rotation.x += 0.02;

  // Rotate the torus
  cincin.rotation.x += 0.01;
  cincin.rotation.y += 0.02;

  renderer.render(scene, camera);
}
animate();

