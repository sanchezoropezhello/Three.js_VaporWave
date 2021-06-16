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

  
renderer.render(scene, camera);

  // adicionar um obejto de exemplo
  const geometry = new THREE.BoxGeometry( 10, 10, 10 , 4, 4, 4);
  const material = new THREE.MeshBasicMaterial( {color: 0xCB0C0C, wireframe:true} );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

//fazer render do site
function animate() {
    //dizer browser que queremos fazer uma animacao
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    cube.rotation.z += 0.01;

    renderer.render(scene, camera);
  }
  
  animate();