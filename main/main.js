import * as THREE from 'three';
import sceneAdd from './add';
import { GUI } from 'dat.gui';

const scene = new THREE.Scene()
const gui = new GUI()
const cubeControl = gui.addFolder('cubecontrol')
const spherecontrol = gui.addFolder('spherecontrol')
const planecontrol = gui.addFolder('planecontrol')
const scenecontrol = gui.addFolder('scenecontrol')
const parameters = {
  rotationSpeed: 0.01,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  SpherepositionX: -3,
  SpherepositionY: 3,
  SpherepositionZ: 0,
  wireFrame: false,
  sphereColor: '#a12140',
  rectColor: '#fff',
  sceneBGC: '#000',
  spotLight: true,
  cube:true,
  plane:true,
  option:'all',
  selectMesh:['all','cube']
};
cubeControl.add(parameters, 'rotationSpeed', 0, 0.5)
cubeControl.add(parameters, 'positionX', -17.5, 17.5)
cubeControl.add(parameters, 'positionY', 0, 20)
cubeControl.add(parameters, 'positionZ', -10, 10)
spherecontrol.add(parameters, 'SpherepositionX', -17.5, 17.5)
spherecontrol.add(parameters, 'SpherepositionY', -10, 10)
spherecontrol.add(parameters, 'SpherepositionZ', -10, 10)
spherecontrol.add(parameters, 'wireFrame', true, false)
spherecontrol.addColor(parameters, 'sphereColor')
planecontrol.addColor(parameters, 'rectColor')
scenecontrol.addColor(parameters, 'sceneBGC')
scenecontrol.add(parameters, 'spotLight', true, false)
scenecontrol.add(parameters, 'cube', true, false)
scenecontrol.add(parameters, 'plane', true, false)
scenecontrol.add(parameters,'option',parameters.selectMesh)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 3000)
camera.position.z = 20
const planeRect = new THREE.Mesh(new THREE.PlaneGeometry(34, 12), new THREE.MeshBasicMaterial({ color: `skyblue`, side: THREE.DoubleSide }))
const cubeBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshLambertMaterial({ color: `pink` }))
const light = new THREE.PointLight('#fff', 1.5)
const ambientLight = new THREE.AmbientLight( '#fff' ,0.5);
const CubeSphere = new THREE.Mesh(new THREE.SphereGeometry(2.5), new THREE.MeshLambertMaterial({ color: 'green' }))
cubeBox.position.z = 4
planeRect.rotation.x = -Math.PI * 0.45
planeRect.position.y = -3
light.position.set(-100, -100, 200)
sceneAdd([camera, planeRect, light, cubeBox.add(CubeSphere),ambientLight], scene)
CubeSphere.position.set(2, 2, 2)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)

function cubeVisible(key){
  switch(key){
    case 'all':
      CubeSphere.visible=true;
      break;
    case 'cube':
      CubeSphere.visible=false;
      break;
  }
}
function animation() {

  cubeBox
    .rotateX(parameters.rotationSpeed)
  cubeBox
    .rotateY(parameters.rotationSpeed)
  cubeBox.position.x = parameters.positionX
  cubeBox.position.y = parameters.positionY
  cubeBox.position.z = parameters.positionZ
  CubeSphere.position.x = parameters.SpherepositionX
  CubeSphere.position.y = parameters.SpherepositionY
  CubeSphere.position.z = parameters.SpherepositionZ
  CubeSphere.material.wireframe = parameters.wireFrame
  CubeSphere.material.color.set(parameters.sphereColor)
  planeRect.material.color.set(parameters.rectColor)
  scene.background = new THREE.Color(parameters.sceneBGC)
  light.visible = parameters.spotLight
  cubeBox.visible = parameters.cube
  planeRect.visible=parameters.plane
  renderer.render(scene, camera)
  cubeVisible(parameters.option)
  requestAnimationFrame(animation)
}
animation()