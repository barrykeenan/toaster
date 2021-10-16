import './sass/styles.scss';

import { Vector3 } from 'three';

import { initStats } from './components/stats.js';
import { initRenderer } from './components/renderer.js';
import { initCamera } from './components/camera.js';
import { SceneManager } from './sceneManager.js';
// import { ObjectPicker } from './components/objectPicker.js';
// import { Controls } from './components/controls.js';
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

// initComponents
const stats = initStats();
const renderer = initRenderer();
// TODO: fit camera method here?
const camera = initCamera(new Vector3(-20, 22, 62));

const sceneManager = new SceneManager(renderer, camera);
// const scene = sceneManager.scene;

// const gizmo = new TransformControls( camera, renderer.domElement );
// gizmo.addEventListener( 'change', render );

// gizmo.addEventListener( 'dragging-changed', function ( event ) {
//     orbitControls.enabled = ! event.value;
// } );

// const objectPicker = new ObjectPicker(sceneManager.scene, camera, sceneManager.pickableMeshes);
// const controls = new Controls(camera, sceneManager, orbitControls);


bindEvents();

// start loop
renderFrame();

function bindEvents() {
    window.addEventListener('resize', updateRenderSize, false);
}

function renderFrame() {
    stats.update();
    sceneManager.update();

    // objectPicker.update(controls.showRay);

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
