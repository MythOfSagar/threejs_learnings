import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const texture = new THREE.TextureLoader()

const alphaTexture = texture.load('/textures/door/alpha.jpg');
const matcapTexture = texture.load('/textures/matcaps/1.png');

const gradientTexture = texture.load('/textures/gradients/5.jpg');
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const doorColorTexture = texture.load('/textures/door/color.jpg');
const doorAmbientTexture = texture.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = texture.load('/textures/door/height.jpg');
const doorNormalexture = texture.load('/textures/door/normal.jpg');

const cubeTexture = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTexture.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
]);

////MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({color:'red'})
// // material.transparent = true
// // material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide  // enabling both sides to view
// //Setting Colors
// material.color.set('yellow')
// material.color =new THREE.Color("pink")

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// //MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial() //mauntains light shadow for geometry,
// material.matcap = matcapTexture

//MeshDepthMaterial
 //const material = new THREE.MeshDepthMaterial()//more closer it is to cameram, more white it gets 
 
//MeshLambertMaterial  // reacts average to light, but less load put on GPU
 //const material = new THREE.MeshLambertMaterial()

 //MeshPhongMaterial   // reacts good to light, but more load put on GP
 //const material = new THREE.MeshPhongMaterial();

//  //MeshToonMaterial  // Caertoonish
//  const material = new THREE.MeshToonMaterial();
//  material.gradientMap = gradientTexture

//  material.shininess = 199
//  material.specular = new THREE.Color('blue') // shining colour visible on mesh

const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture;
// material.aoMap = doorAmbientTexture;
// material.aoMapIntensity = 1
// material.side = THREE.DoubleSide  // enabling both sides to view

// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;

// material.normalMap = doorNormalexture;

// material.alphaMap = alphaTexture;
// material.transparent = true

material.envMap = environmentMapTexture
material.metalness = 0.7;
material.roughness = 0;

 
//Geometries
const torusGeometry = new THREE.TorusGeometry( 0.3, 0.1, 16, 32 )
const torus = new THREE.Mesh( torusGeometry, material)

const planeGeometry = new THREE.PlaneGeometry( 1, 1 ,100,100);
const plane = new THREE.Mesh( planeGeometry, material );
plane.position.x = -1

plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)
)

const sphereGeometry = new THREE.SphereGeometry( 0.5, 16, 16 ); 
const sphere = new THREE.Mesh( sphereGeometry, material );
sphere.position.x = 1

//Lights
const ambientLight = new THREE.AmbientLight('silver',0.5)
const pointLight = new THREE.PointLight('silver',0.5)
pointLight.position.x = 2
pointLight.position.x = 3
pointLight.position.x = 4




// Scene
const scene = new THREE.Scene()

scene.add(ambientLight,pointLight)
scene.add(torus,plane,sphere)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()