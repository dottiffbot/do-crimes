import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/RGBELoader.js'

// create a scene
const scene = new THREE.Scene()

// create camera

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2;



const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x000000, 0);

const canvas = document.querySelector("#canvas");
canvas.appendChild(renderer.domElement);

// const loader = new GLTFLoader().setDRACOLoader(
//     new DRACOLoader().setDecoderPath("/draco")
//   );
  
const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/do-crime-rmetal-blobby.gltf', (gltf) => {
      const root = gltf.scene;


      scene.add(root);
    //   const doCrimes = scene.getObjectByName(root)
    //   console.log(Object.keys(doCrimes));

    })

   
    // controls
    const controls = new OrbitControls( camera, renderer.domElement );

    const rgbeLoader = new RGBELoader()
    const texture = await rgbeLoader.loadAsync(
        "./assets/pretville_street_1k.hdr"
    )

texture.mapping = THREE.EquirectangularReflectionMapping;


scene.environment = texture;

// scene.background = new THREE.Color('transparent');

        // lights
        const ambientLight = new THREE.AmbientLight("#9090DA", 4)
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0x404040,2);
        directionalLight.position.set(0,-3 ,0);
    
        const directLighttwo = new THREE.DirectionalLight(
            "#9090DA",
            2);
        directLighttwo.position.set(0, -1, 0);
        scene.add(directionalLight, directLighttwo);
    
//     let doCrimes;

//  doCrimes = await loader.loadAsync(
//     './assets/do-crime-rmetal-blobby.gltf'
// )


// scene.add(doCrimes.scene)
window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

}

function animate(){

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

animate()