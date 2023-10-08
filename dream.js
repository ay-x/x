import { swarmBackground } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('path_to_your_texture_image.png');

// Create a new Three.js scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add bg's scene to your scene
const bg = swarmBackground({
    el: document.getElementById('app'),
    eventsEl: document.body,
    gpgpuSize: 100,
    color: [0x262626, 0x262626],
    geometry: 'sphere',
    particleTexture: particleTexture,

});
scene.add(bg.three.scene); // Add bg's scene to your scene

// Create a semi-transparent material for the sphere
const sphereMaterial = new THREE.MeshBasicMaterial({
    map: particleTexture,
    transparent: true,
    opacity: 0.5,
});

// Create a geometry for the sphere
const sphereGeometry = new THREE.SphereGeometry(50, 32, 32);

// Create a mesh by combining the geometry and material
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh); // Add the sphere to your scene

// Set the initial position of the sphere
sphereMesh.position.set(0, 0, 0);

// Simulate a click event initially
const initialClickEvent = new Event('click');
document.body.dispatchEvent(initialClickEvent);
setTimeout(() => {
    const initialClickEvent = new Event('click');
    document.body.dispatchEvent(initialClickEvent);
}, 100);

document.body.addEventListener('click', () => {
    bg.setColors([0x262626, 0x262626]);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Rotate the sphere (or perform any other animations)
    sphereMesh.rotation.x += 0.01;
    sphereMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();