import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'three/examples/jsm/libs/dat.gui.module';

import * as util from './util';

function init() {
    // listen to the resize events
    window.addEventListener('resize', onResize, false);

    var stats = util.initStats();
    var renderer = util.initRenderer();
    var camera = util.initCamera();
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();

    // initialize controls
    var orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = true;

    initLights();

    var urls = [
        './assets/textures/cubemap/right.png',
        './assets/textures/cubemap/left.png',
        './assets/textures/cubemap/top.png',
        './assets/textures/cubemap/bottom.png',
        './assets/textures/cubemap/front.png',
        './assets/textures/cubemap/back.png'
    ];
  
    var cubeLoader = new THREE.CubeTextureLoader();
    var environmentMap = cubeLoader.load(urls);
    // scene.background = environmentMap;

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(9, 9, 9);
    var cubeMaterial = new THREE.MeshStandardMaterial({
        envMap: environmentMap,
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // cube.castShadow = true;
    scene.add(cube);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    render();

    function initLights() {
        // Ambient
        var ambienLight = new THREE.AmbientLight(0x353535);
        scene.add(ambienLight);

        var dirLight = new THREE.DirectionalLight(0xffffff);
        // dirLight.castShadow = true;
        dirLight.position.set(50, 10, 0);
        scene.add(dirLight);
    }

    function render() {
        // update the stats and the controls
        stats.update();
        orbitControls.update(clock.getDelta());

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }    
}

init();
