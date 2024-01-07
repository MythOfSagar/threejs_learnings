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

const numberOfVertices = 3 //always
const galaxyParameters = {
    count: 267200,
    size: 0.01,
    radius: 6,
    branches: 3,
    spin:2,
    randomness:0.2,
    randomnessPower:4.5
}


let particlesGeometry;
let particlesMaterial;
let starsPositionsArray;
let starsColorArray
let points;

const outerColor = new THREE.Color('blue');
const innerColor = new THREE.Color('yellow')

const createGalaxy = () => {

    if (points) {
        particlesMaterial.dispose();
        particlesGeometry.dispose();
        scene.remove(points)
    }
    particlesGeometry = new THREE.BufferGeometry();
    starsPositionsArray = new Float32Array(galaxyParameters.count * numberOfVertices)
    starsColorArray = new Float32Array(galaxyParameters.count * numberOfVertices)
    for (let i = 0; i < galaxyParameters.count; i++) {
        const idx = i * 3;
        const radius = galaxyParameters.radius * Math.random() // Placing Particles Over the Single Raidus  Line
        const angle = (i % galaxyParameters.branches) / galaxyParameters.branches  * (2*Math.PI)// Placing Particles Over the branches

        const spinAngle = radius * galaxyParameters.spin
        
        const randomX = Math.pow((Math.random()) , galaxyParameters.randomnessPower) * (Math.random() <0.5 ? -1 : 1)
        const randomY = Math.pow((Math.random()) , galaxyParameters.randomnessPower) * (Math.random() <0.5 ? -1 : 1)
        const randomZ = Math.pow((Math.random()) , galaxyParameters.randomnessPower) * (Math.random() <0.5 ? -1 : 1)
        
        starsPositionsArray[idx + 0] = randomX + Math.sin(angle + spinAngle) * radius//x axis
        starsPositionsArray[idx + 1] = randomY      //y axis
        starsPositionsArray[idx + 2] = randomZ + Math.cos(angle + spinAngle) * radius  //z axis

        const mixedColor = innerColor.clone()
        mixedColor.lerp(outerColor,Math.random())

        starsColorArray[idx + 0] = mixedColor.r
        starsColorArray[idx + 1] = mixedColor.g
        starsColorArray[idx + 2] = mixedColor.b
    }

    particlesMaterial = new THREE.PointsMaterial({
        size: galaxyParameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositionsArray, numberOfVertices))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(starsColorArray, numberOfVertices))

    points = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(points)
}

gui.add(galaxyParameters, 'count').min(0).max(70000).step(100).onFinishChange(createGalaxy)

createGalaxy()

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
camera.position.x = 3
camera.position.y = 3
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