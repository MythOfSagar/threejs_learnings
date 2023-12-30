import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 1.5
// mesh.position.y = -0.1
// mesh.position.z = 0.5
//Or.
mesh.position.set(1.5, -0.1, 0.5)

// mesh.scale.x = 1.5
// mesh.scale.y = 1.7
// mesh.scale.z = 0.5
//Or.
mesh.scale.set(0.1, 0.2, 0.4)

mesh.rotation.reorder('YXZ') // rotation happens in this order.
mesh.rotation.x = 1.5
mesh.rotation.y = 1.7
mesh.rotation.z = 0.5




const group = new THREE.Group()

const part1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }))
group.add(part1)
part1.position.x=1

const part2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffd00 }))
group.add(part2)

const part3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xfff0f0 }))
group.add(part3)
part3.position.x=1.5

group.rotation.z = 0.5
group.rotation.y = 0.9

scene.add(group)
scene.add(mesh)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 0.1

 camera.lookAt(group.position)

scene.add(camera)

const distanceBetweenCentreOfScenceAndMeshPosition = mesh.position.length()
const distanceBetweenCameraAndMeshPosition = mesh.position.distanceTo(camera.position)

//mesh.position.normalize() // it makes distanceBetweenCentreOfScenceAndMeshPosition = 1

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)