const size={
    width:700,
    height:700
}
const canvas = document.querySelector('.webgl');

const scence = new THREE.Scene()

//Yellow Cube
const geometry = new THREE.BoxGeometry(1,1,1)  
const material = new THREE.MeshBasicMaterial({color:'yellow'})
const mesh = new THREE.Mesh(geometry, material)
scence.add(mesh)

//Camera
const camera = new THREE.PerspectiveCamera(70,size.width/size.height)  //View,Aspect Ratio
camera.position.x = 2.5
camera.position.y = 2.5
camera.position.z = 7
scence.add(camera)

const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(size.width,size.height)
renderer.render(scence,camera)