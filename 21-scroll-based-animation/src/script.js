import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const material = new THREE.MeshBasicMaterial({ color: 'red' });

const coneGeometry = new THREE.ConeGeometry(0.5, 2, 3.2);
const cone = new THREE.Mesh(coneGeometry, material);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.3, 3, 20);
const torus = new THREE.Mesh(torusGeometry, material);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphere = new THREE.Mesh(sphereGeometry, material);

const objects = [cone, torus, sphere]
const disatnceBetweenObjects = 4
scene.add(...objects);

objects[0].position.y = disatnceBetweenObjects * 0
objects[1].position.y = disatnceBetweenObjects * -1
objects[2].position.y = disatnceBetweenObjects * -2

let scrollY = 0

const cursor = {}

window.addEventListener('scroll', (e) => {
    scrollY = window.scrollY
})

window.addEventListener('mousemove', (e) => {
    cursor.x = (e.clientX / sizes.width) - 0.5
    cursor.y = (e.clientY / sizes.height) - 0.5
})


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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6

const cameraGroup = new THREE.Group()
cameraGroup.add(camera)

scene.add(cameraGroup)

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

    camera.position.y = -((scrollY / sizes.height) * (disatnceBetweenObjects))

    const parallaX= cursor.x
    const parallaY= -(cursor.y)

    cameraGroup.position.x =parallaX //(parallaX - cameraGroup.position.x) * 0.03
    cameraGroup.position.y =parallaY //(parallaY - cameraGroup.position.y) * 0.03

    for (let object of objects) {
        object.rotation.x = Math.sin(elapsedTime) * 0.5
        object.rotation.z = Math.cos(elapsedTime) * 0.5
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()