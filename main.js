import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

/**
 *  z\ y|
 *    \ |
 *     \|
 *      \_______x 
*/
    // a camera estva no meio entao metemos de lado
camera.position.setZ(30);
camera.position.setX(0);
camera.position.setY(10);
camera.rotateX(-0.25);

    // Os objetos
const geometry = new THREE.BoxGeometry( 10, 10, 10);
const material = new THREE.MeshStandardMaterial( {color: 0x77C8FF} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const geometry2 = new THREE.CircleGeometry( 250, 250 );
const material2 = new THREE.MeshMatcapMaterial( { color: 0xFF2294 } );
const circle = new THREE.Mesh( geometry2, material2 );
circle.position.setZ(-800);
scene.add( circle );

const planeTexture = new THREE.TextureLoader().load('floor.png');
const planeT = new THREE.Mesh(
    new THREE.PlaneGeometry(555, 555),
    new THREE.MeshMatcapMaterial({ map: planeTexture }));
planeT.rotation.x -= 1.57;
//planeT.rotation.z += 3;
scene.add(planeT);

    //Adicionar light source
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0,-45);

const ambientLight = new THREE.AmbientLight(0xccccc);
scene.add(pointLight, ambientLight);


    //background
const background = new THREE.TextureLoader().load('background.png');
scene.background = background;
    
    //Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);

    //Listener of mouse controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
        //dizer browser que queremos fazer uma animacao
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    cube.rotation.x += 0.01;

        //atualizar a alteração do nosso orbitControls
    controls.update();

    renderer.render(scene, camera);
  }
  
  /** 
function addStuff(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFF577 });
    const star = new THREE.Mesh(geometry, material);
  
    //gerar random positions of stars
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStuff);
*/

animate();