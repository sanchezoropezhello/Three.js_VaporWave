import './style.css'

import * as THREE from 'three';

// holds all lights & objects 
const scene = new THREE.Scene();

// arguments: Fov, user aspect ratio, last 2 arguments: Controlar quais sao os objetos visiveis 
//                                                          dependente da posicao da camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
  
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// a camera estva no meio entao metemos de lado
camera.position.setZ(30);
camera.position.setX(-3);
camera.position.setY(5);

// adicionar um obejto de exemplo
const geometry = new THREE.BoxGeometry( 10, 10, 10 , 4, 4, 4);
const material = new THREE.MeshStandardMaterial( {color: 0xCB0C0C} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//Adicionar light source
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight(0xccccc);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

//Show a grid in the center
/**
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
*/

/**
 *  z\ y|
 *    \ |
 *     \|
 *      \_______x 
*/
function animate() {
    //dizer browser que queremos fazer uma animacao
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    cube.rotation.x += 0.01;

    renderer.render(scene, camera);
  }
  
animate();