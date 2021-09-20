import { Clock, Vector3, MeshBasicMaterial, Color } from 'three';

import { initLoadingManager } from './components/loader.js';
import { initStats } from './components/stats.js';
import { initRenderer } from './components/renderer.js';
import { initCamera } from './components/camera.js';
import { SceneManager } from './components/sceneManager.js';
import { initLights } from './components/lights.js';
import { ObjectPicker } from './components/objectPicker.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'three/examples/jsm/libs/dat.gui.module';

function init() {
    const loadingManager = initLoadingManager();
    const stats = initStats();
    const renderer = initRenderer();
    const camera = initCamera(new Vector3(-20, 22, 48));

    // TODO: MaterialManager?
    const sceneManager = new SceneManager(loadingManager);
    const scene = sceneManager.scene;
    const lights = initLights(scene);
    var clock = new Clock();

    var orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = true;

    const objectPicker = new ObjectPicker(sceneManager.scene, camera, sceneManager.pickableMeshes);

    var step = 0;
    var controls;

    var redLaserMat = new MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.6 });

    // bindEvents
    window.addEventListener('resize', updateRenderSize, false);

    // initGUI();

    renderFrame();

    function initGUI() {
        controls = new (function () {
            this.heightScale = 0.2;
            this.bouncingSpeed = 0.04;

            this.outputObjects = function () {
                console.log(scene.children);
            };

            this.showRay = false;

            this.hemisphere = true;
            this.color = 0xb3a79f;
            this.groundColor = 0x635543;
            this.intensity = 0.4;
        })();

        const gui = new dat.GUI();
        // gui.add( camera.position , 'x', -50, 50 );
        // gui.add( camera.position , 'y', -50, 50 );
        // gui.add( camera.position , 'z', -100, 0 );
        // gui.add(material, 'metalness', 0, 1, 0.01);
        // gui.add(material, 'roughness', 0, 1, 0.01);
        // gui.add(controls, 'bouncingSpeed', 0, 0.5);
        // gui.add(controls, 'heightScale', 0, 3, 0.1);

        const debugFolder = gui.addFolder('Debug');
        debugFolder.add(controls, 'outputObjects');
        debugFolder.add(controls, 'showRay').onChange(function (e) {
            if (tube) scene.remove(tube);
        });
        debugFolder.add(mouse, 'x').step(0.01).name('mouse x').listen();
        debugFolder.add(mouse, 'y').step(0.01).name('mouse y').listen();
        // debugFolder.open();

        gui.add(controls, 'hemisphere').onChange(function (e) {
            if (!e) {
                hemiLight.intensity = 0;
            } else {
                hemiLight.intensity = controls.intensity;
            }
        });
        gui.addColor(controls, 'color').onChange(function (e) {
            hemiLight.color = new Color(e);
        });
        gui.addColor(controls, 'groundColor').onChange(function (e) {
            hemiLight.groundColor = new Color(e);
        });
        gui.add(controls, 'intensity', 0, 2, 0.1).onChange(function (e) {
            hemiLight.intensity = e;
        });
    }

    function renderFrame() {
        // update the stats and the controls
        stats.update();
        orbitControls.update(clock.getDelta());

        objectPicker.update(true);

        // bounce the toaster up and down
        // step += controls.bouncingSpeed;
        // const toaster = scene.getObjectByName( "toaster" );
        // if(toaster){
        //     toaster.position.y = controls.heightScale * Math.sin(step);
        // }

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
}

init();
