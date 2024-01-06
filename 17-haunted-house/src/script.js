import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

const rendererColor = 'lightblue'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * House
 */
const house = new THREE.Group();
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ color: 'red' })
)


walls.position.y = 1.25
house.add(walls)

const coneRoof = new THREE.Mesh(
    new THREE.ConeGeometry(3, 2, 4),
    new THREE.MeshStandardMaterial({ color: 'red' })
)
coneRoof.position.y = 3.5
coneRoof.rotation.y = Math.PI * 0.25
house.add(coneRoof)

gui.add(coneRoof.rotation, 'y').min(0).max(10).step(0.1)

const graveGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
const graveMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });

for (let i = 0; i < 50; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    const angle = Math.PI * Math.random() * 2;
     const radius = 3 + Math.random() * 6
    const x =Math.sin(angle) * radius;
    const y =Math.cos(angle) * radius;
    grave.position.x = x
    grave.position.z = y
    if(!i){
        const graveFolder = gui.addFolder('Grave')
        graveFolder.add(grave.position, 'x').min(0).max(10).step(0.1)
        graveFolder.add(grave.position, 'y').min(0).max(10).step(0.1)
        graveFolder.add(grave.position, 'z').min(0).max(10).step(0.1)
    }
    scene.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

const doorLight = new THREE.PointLight('yellow', 0.7, 7)
house.add(doorLight)
doorLight.position.x = 0
doorLight.position.y = 2.3
doorLight.position.z = 1.9
const doorLightFolder = gui.addFolder('doorLight')
doorLightFolder.add(doorLight, 'intensity').min(0).max(10).step(0.1)
doorLightFolder.add(doorLight.position, 'x').min(0).max(10).step(0.1)
doorLightFolder.add(doorLight.position, 'y').min(0).max(10).step(0.1)
doorLightFolder.add(doorLight.position, 'z').min(0).max(10).step(0.1)


const fog = new THREE.Fog(rendererColor, 1, 15)
//scene.fog = fog
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor(rendererColor)
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