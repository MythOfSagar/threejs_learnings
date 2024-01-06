import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/2.png')

/**
 * Test cube
 */
const particlesGeometry = new THREE.BufferGeometry();

const numberOfParticles = 7000
const numberOfVertices = 3 //always

const particlesPositionArray = new Float32Array(numberOfParticles * numberOfVertices)
const particlesColors = new Float32Array(numberOfParticles * numberOfVertices)

for (let i = 0; i < numberOfParticles * numberOfVertices; i++) {
    particlesPositionArray[i] = (Math.random() - 0.5) * 11
    particlesColors[i] = Math.random()
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(particlesPositionArray, numberOfVertices)
)

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.vertexColors = true
particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(particlesColors, numberOfVertices)
)

particlesMaterial.size = 0.1;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture
particlesMaterial.sizeAttenuation = true;

particlesMaterial.alphaTest = 0.001 // improving transparency
particlesMaterial.depthWrite = false; // improving transparency

particlesMaterial.depthTest = false; // randomly will be drawn, which is not good when other materials are in prticles or ahead or behind

//particlesMaterial.blending = THREE.AdditiveBlending // it will mix the colors, i.e. if behind particle colour is yellow
// and front particle colour is blue, then mixture which is red will be seen

const points = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(points);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()