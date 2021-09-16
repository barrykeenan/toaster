import {
    Scene,
    Clock,
    Vector2,
    Vector3,
    Group,
    Mesh,
    TubeGeometry,
    MeshBasicMaterial,
    MeshStandardMaterial,
    TextureLoader,
    EquirectangularReflectionMapping,
    PMREMGenerator,
    Raycaster,
    CatmullRomCurve3,
    AmbientLight,
    DirectionalLight,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as dat from 'three/examples/jsm/libs/dat.gui.module';

import * as util from './util';

function init() {
    // listen to the resize events
    window.addEventListener('resize', onResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    var stats = util.initStats();
    var renderer = util.initRenderer();
    var camera = util.initCamera(new Vector3(-20, 22, 48));
    var scene = new Scene();
    var clock = new Clock();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    // initialize controls
    var orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;

    var step = 0;
    var controls;
    const pickableMeshes = [];
    const toaster = new Group();

    initLights();

    const textureLoader = new TextureLoader();
    const pmremGenerator = new PMREMGenerator(renderer);

    const environmentMap = textureLoader.load(
        'assets/textures/photosphere/HDR_110_Tunnel_Bg.jpg',
        (tx) => {
            scene.environment = pmremGenerator.fromEquirectangular(tx).texture;
        }
    );
    environmentMap.mapping = EquirectangularReflectionMapping;

    scene.background = environmentMap;

    var material = new MeshStandardMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0,
    });

    var redLaserMat = new MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.6 });

    initGUI();

    initScene();

    // add the output of the renderer to the html element
    document.getElementById('webgl-output').appendChild(renderer.domElement);
    render();

    function initScene() {
        toaster.name = 'toaster';
        scene.add(toaster);
        // console.log('Added toaster group: ', toaster);

        var loader = new OBJLoader();

        loader.load('assets/models/cube/cube1m.obj', function (mesh) {
            mesh.name = 'cube-1m';
            mesh.children.forEach(function (child) {
                child.material = material;
                pickableMeshes.push(child);
            });
            mesh.scale.set(0.2, 0.2, 0.2);
            toaster.add(mesh);
        });

        // loader.load('assets/models/smeg-toaster/smeg-toaster-body.obj', function (mesh) {
        //     mesh.name = "toaster-body";
        //     mesh.children.forEach(function (child) {
        //         child.material = material;
        //         child.geometry.castShadow = true;
        //         child.geometry.receiveShadow = true;
        //         pickableMeshes.push(child);
        //     });
        //     toaster.add(mesh);
        // });

        // loader.load('assets/models/smeg-toaster/smeg-toaster-lever.obj', function (mesh) {
        //     mesh.name = "toaster-lever";
        //     mesh.children.forEach(function (child) {
        //         child.material = material;
        //         child.geometry.castShadow = true;
        //         child.geometry.receiveShadow = true;
        //         pickableMeshes.push(child);
        //     });
        //     toaster.add(mesh);
        // });
    }

    function initLights() {
        // Ambient
        var ambienLight = new AmbientLight(0x353535);
        scene.add(ambienLight);

        var dirLight = new DirectionalLight(0xffffff);
        // dirLight.castShadow = true;
        dirLight.position.set(50, 10, 0);
        scene.add(dirLight);
    }

    function initGUI() {
        controls = new (function () {
            this.heightScale = 0.2;
            this.bouncingSpeed = 0.04;

            this.outputObjects = function () {
                console.log(scene.children);
            };

            this.showRay = false;
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
    }

    function render() {
        // update the stats and the controls
        stats.update();
        orbitControls.update(clock.getDelta());

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // detect objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(pickableMeshes);

        if (intersects.length > 0) {
            // offset source of line to just below camera
            var cameraPosition = camera.position.clone();
            cameraPosition.y = cameraPosition.y - 0.2;

            var points = [];
            points.push(cameraPosition);
            points.push(intersects[0].point);

            var tubeGeometry = new TubeGeometry(new CatmullRomCurve3(points), 60, 0.001);

            if (tube) {
                scene.remove(tube);
            }

            if (controls.showRay) {
                tube = new Mesh(tubeGeometry, redLaserMat);
                scene.add(tube);
            }
        }

        // bounce the toaster up and down
        step += controls.bouncingSpeed;
        // const toaster = scene.getObjectByName( "toaster" );
        // if(toaster){
        //     toaster.position.y = controls.heightScale * Math.sin(step);
        // }

        // render using requestAnimationFrame
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    var tube;

    function onDocumentMouseDown(event) {
        var vector = new Vector3(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5
        );
        vector = vector.unproject(camera);

        var raycaster = new Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(pickableMeshes);

        if (intersects.length > 0) {
            // console.log(intersects[0]);
            console.log('Picked:', intersects[0].object);
            // intersects[0].object.material.transparent = true;
            // intersects[0].object.material.opacity = 0.1;
        }
    }

    function onDocumentMouseMove(event) {
        // update mouse position in normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

init();
