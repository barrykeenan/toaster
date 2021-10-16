import './sass/styles.scss';

import { Clock, Vector3, MathUtils, Box3, LoadingManager } from 'three';

import { initLoadingManager } from './components/loader.js';
import { initStats } from './components/stats.js';
import { initRenderer } from './components/renderer.js';
import { initCamera } from './components/camera.js';
import { SceneManager } from './components/sceneManager.js';
import { LightManager } from './components/lights.js';
import { ObjectPicker } from './components/objectPicker.js';
// import { Controls } from './components/controls.js';
import { ColourPicker } from './components/colour-picker.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

// TODO: actually SceneManager

// initComponents
// const loadingManager = initLoadingManager();
const loadingManager = new LoadingManager();
const stats = initStats();
const renderer = initRenderer();
// TODO: fit camera to screen aspect
const camera = initCamera(new Vector3(-20, 22, 62));
// const camera = initCamera(new Vector3(0,0,0));

// TODO: MaterialManager?
const sceneManager = new SceneManager(loadingManager);
const scene = sceneManager.scene;
const clock = new Clock();

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enablePan = false;
// Vertical orbit limits.
orbitControls.minPolarAngle = MathUtils.degToRad(30);
orbitControls.maxPolarAngle = MathUtils.degToRad(120);

orbitControls.autoRotate = true;
orbitControls.enableDamping = true;

// const toaster = scene.getObjectByName('toaster');
// console.log('toaster', toaster.children);
// fitCameraToSelection(camera, orbitControls, toaster.children);

// const gizmo = new TransformControls( camera, renderer.domElement );
// gizmo.addEventListener( 'change', render );

// gizmo.addEventListener( 'dragging-changed', function ( event ) {
//     orbitControls.enabled = ! event.value;
// } );

const lights = new LightManager(scene);

// const objectPicker = new ObjectPicker(sceneManager.scene, camera, sceneManager.pickableMeshes);
// const controls = new Controls(camera, sceneManager, orbitControls);

const colourPicker = new ColourPicker(sceneManager.materials);

let step = 0;


loadingManager.onLoad = function () {
    console.log('Loading complete!');
    // TODO: spinner
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');

    // optional: remove loader from DOM via event listener
    loadingScreen.addEventListener('transitionend', onTransitionEnd);

    // // TODO emit an event, or pass in components to be notified here instead

    // TODO: call color-picker
    const el = document.querySelector('[data-color-picker]');
    const swatches = document.querySelectorAll('[data-swatch]');

    el.classList.remove("hidden");

    swatches.forEach((swatch) => {
        swatch.classList.add('appear');
    });

    // TODO: call toaster
    const toaster = scene.getObjectByName('toaster');
    fitCameraToSelection(camera, orbitControls, toaster.children);
};

function onTransitionEnd(event) {
    const element = event.target;
    element.remove();
}

// wait for loaded
function fitCameraToSelection( camera, controls, selection, fitOffset = 1.1 ) {
  
    const box = new Box3();
    
    for( const object of selection ){
        box.expandByObject( object )
    };

    const size = box.getSize( new Vector3() );
    const center = box.getCenter( new Vector3() );

    const maxSize = Math.max( size.x, size.y, size.z );
    const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );
    
    const direction = controls.target.clone()
      .sub( camera.position )
      .normalize()
      .multiplyScalar( distance );
  
    controls.minDistance = distance / 2;
    controls.maxDistance = distance * 3;
    controls.target.copy( center );
    controls.target.y = -4; // pan up
    
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();
  
    camera.position.copy( controls.target ).sub(direction);
    
    controls.update();
}

bindEvents();

// start loop
renderFrame();

function bindEvents() {
    window.addEventListener('resize', updateRenderSize, false);
}

function renderFrame() {
    const delta = clock.getDelta();

    // update the stats and the controls
    stats.update();
    orbitControls.update(delta);
    lights.update();
    // objectPicker.update(controls.showRay);

    // bounce the toaster up and down
    // step += controls.bouncingSpeed;
    step += 0.05;
    const toaster = sceneManager.scene.getObjectByName('toaster');
    if (toaster) {
        // toaster.position.y = controls.heightScale * Math.sin(step);
        toaster.position.y = 0.15 * Math.sin(step);
    }

    // render frame
    renderer.render(sceneManager.scene, camera);

    // keep looping
    window.requestAnimationFrame(renderFrame);
}

function updateRenderSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
