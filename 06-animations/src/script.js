import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

let time = Date.now();
const clock = new THREE.Clock()

gsap.to(mesh.position, {duration:1,delay:1,x:2})
gsap.to(mesh.position, {duration:1,delay:1,x:1})

const animation = () =>{
    const currentTime = Date.now();
    const multplier = currentTime - time;
    // multplier Used for maintaining animation speed across devices.

    const elapsedTime = clock.getElapsedTime()
    // elapsedTime also Used for maintaining animation speed across devices.


    mesh.rotation.x += 0.001 * multplier
    mesh.rotation.y =  elapsedTime
    
    mesh.position.x =  Math.tan(elapsedTime)
    mesh.position.y =  Math.sin(elapsedTime)
    mesh.position.z =  Math.cos(elapsedTime)

    time = currentTime
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}
animation()
renderer.render(scene, camera)

