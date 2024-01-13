import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import CANNON, { Vec3 } from 'cannon'






// Cannon JS

const world = new CANNON.World()
const earthGravity = -9.82
world.gravity.set(0,earthGravity,0)

world.allowSleep = true  // Optimaztion of collision checking of rest object
world.broadphase = new CANNON.SAPBroadphase(world) // Optimizing performance of objects checking  collision with other objects

const sphereRadius = 0.5

const sphereShape = new CANNON.Sphere(sphereRadius)
const sphereBody = new CANNON.Body({
    mass: 1,
    position:new CANNON.Vec3(0,3,0),
    shape:sphereShape
})
const forceOf150InXDirection = new CANNON.Vec3(-150,10,10)
const forceInCenter = new CANNON.Vec3(0,0,0)
sphereBody.applyForce(
    forceOf150InXDirection,
    forceInCenter
)


const onCollision =(e)=>{
    console.log('Do this on Collision of force' ,e.contact.getImpactVelocityAlongNormal())

}

sphereBody.addEventListener('collide',onCollision)

world.addBody(sphereBody)













const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body({
    mass: 0,  //mass 0  means body wont move or damaged any how like a floor
    shape:floorShape
})
floorBody.quaternion.setFromAxisAngle(
    new Vec3(-1,0,0),
    Math.PI*0.5
)
world.addBody(floorBody)






const floorMaterial = new CANNON.Material('floor')
const sphereMaterial = new CANNON.Material('sphere')

floorBody.material  = floorMaterial
sphereBody.material = sphereMaterial

const floorAndSphereContactInteraction =
new CANNON.ContactMaterial(
    floorMaterial,
    sphereMaterial,
    {
        friction: 1,
        restitution:0.7
    }
)
world.addContactMaterial(floorAndSphereContactInteraction)






/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * Test sphere
 */
const sphereGeometry =  new THREE.SphereGeometry(1, 32, 32)
const sphere = new THREE.Mesh(
    sphereGeometry,
    new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
    })
)
sphere.scale.set(sphereRadius,sphereRadius,sphereRadius)
sphere.castShadow = true
sphere.position.y = 0.5
scene.add(sphere)


//Removing Sphere from THREEJW as well ass cannon
// setTimeout(()=>{
//     world.remove(sphereBody);
//     scene.remove(sphere)
//     sphereBody.removeEventListener('collide',onCollision)
// },3000)





/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let prevElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - prevElapsedTime
    prevElapsedTime = elapsedTime
    const FPS =60

    //update cannon
    world.step(1/FPS,deltaTime,3)

    sphere.position.copy(sphereBody.position)
    sphere.quaternion.copy(sphereBody.quaternion) // For managing falling of non spherical shape object


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



