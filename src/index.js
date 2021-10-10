import './sass/styles.scss';

import { Clock, Vector3, MathUtils } from 'three';

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

document.addEventListener('DOMContentLoaded', function () {
    // initComponents
    const loadingManager = initLoadingManager();
    const stats = initStats();
    const renderer = initRenderer();
    // TODO: fit camera to screen aspect
    const camera = initCamera(new Vector3(-20, 22, 62));

    // TODO: MaterialManager?
    const sceneManager = new SceneManager(loadingManager);
    const scene = sceneManager.scene;
    const clock = new Clock();

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.y = -5; // pan up
    orbitControls.enablePan = false;
    // Dolly limits.
    orbitControls.minDistance = 35;
    orbitControls.maxDistance = 120;
    // Vertical orbit limits.
    orbitControls.minPolarAngle = MathUtils.degToRad(30);
    orbitControls.maxPolarAngle = MathUtils.degToRad(120);

    // orbitControls.autoRotate = true;
    orbitControls.enableDamping = true;

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
});
