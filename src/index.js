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
        metalness: 0.9,
        roughness: 0.1,
        // metalness: 0,
        // roughness: 1,
        // metalness: 1,
        // roughness: 0,
    });

    var loader = new OBJLoader();
    loader.load('../../assets/models/pinecone/pinecone.obj', function (mesh) {
        // loadedMesh is a group of meshes. For
        // each mesh set the material, and compute the information
        // three.js needs for rendering.
        mesh.children.forEach(function (child) {
            child.material = material;
            child.geometry.computeVertexNormals();
            child.geometry.computeFaceNormals();
        });

        mesh.scale.set(100, 100, 100);

        // call the default render loop.
        //   loaderScene.render(mesh, camera);
        scene.add(mesh);
    });

    // add the output of the renderer to the html element
    document.getElementById('webgl-output').appendChild(renderer.domElement);

    // var controls = new (function () {
    //     this.rotationSpeed = 0.02;
    //     this.bouncingSpeed = 0.03;
    // })();

    // var gui = new dat.GUI();
    // gui.add(controls, 'rotationSpeed', 0, 0.5);
    // gui.add(controls, 'bouncingSpeed', 0, 0.5);

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
