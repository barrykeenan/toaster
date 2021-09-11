// import * as THREE from 'three';
import {
    Scene,
    Clock,
    MeshLambertMaterial,
    AmbientLight,
    DirectionalLight,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    CubeTextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as dat from 'three/examples/jsm/libs/dat.gui.module';

import * as util from './util';

function init() {
    // listen to the resize events
    window.addEventListener('resize', onResize, false);

    var stats = util.initStats();
    var renderer = util.initRenderer();
    var camera = util.initCamera();
    var scene = new Scene();
    var clock = new Clock();

    // initialize controls
    var orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = true;

    initLights();

    var urls = [
        '../../assets/textures/cubemap/flowers/right.png',
        '../../assets/textures/cubemap/flowers/left.png',
        '../../assets/textures/cubemap/flowers/top.png',
        '../../assets/textures/cubemap/flowers/bottom.png',
        '../../assets/textures/cubemap/flowers/front.png',
        '../../assets/textures/cubemap/flowers/back.png',
    ];

    var cubeLoader = new CubeTextureLoader();
    var environmentMap = cubeLoader.load(urls);
    // scene.background = environmentMap;

    var material = new MeshStandardMaterial({
        envMap: environmentMap,
        color: 0xffffff,
        metalness: 0.6,
        roughness: 0.1,
    });

    var loader = new OBJLoader();
    loader.load('../../assets/models/smeg-toaster/smeg-toaster-body.obj', function (mesh) {
        mesh.name = "toaster-body";
        mesh.children.forEach(function (child) {
            child.material = material;
            // child.geometry.castShadow = true;
        });
        scene.add(mesh);
    });

    // add the output of the renderer to the html element
    document.getElementById('webgl-output').appendChild(renderer.domElement);

    var step = 0;

    var controls = new function () {
        this.heightScale = 0.2;
        this.bouncingSpeed = 0.04;

        this.outputObjects = function () {
            console.log(scene.children);
        }
    };

    var gui = new dat.GUI();
    // gui.add( camera.position , 'x', -50, 50 );
    // gui.add( camera.position , 'y', -50, 50 );
    // gui.add( camera.position , 'z', -100, 0 );
    // gui.add(material, 'metalness', 0, 1, 0.01);
    // gui.add(material, 'roughness', 0, 1, 0.01);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    gui.add(controls, 'heightScale', 0, 3, 0.1);
    gui.add(controls, 'outputObjects');

    render();

    function initLights() {
        // Ambient
        var ambienLight = new AmbientLight(0x353535);
        scene.add(ambienLight);

        var dirLight = new DirectionalLight(0xffffff);
        // dirLight.castShadow = true;
        dirLight.position.set(50, 10, 0);
        scene.add(dirLight);
    }

    function render() {
        // update the stats and the controls
        stats.update();
        orbitControls.update(clock.getDelta());

        // bounce the toaster up and down
        step += controls.bouncingSpeed;
        const toaster = scene.getObjectByName( "toaster-body" );
        if(toaster){
            toaster.position.y = controls.heightScale * Math.sin(step);
        }

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
