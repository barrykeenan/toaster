import { Vector2, Raycaster, CatmullRomCurve3, TubeGeometry, Mesh, MeshBasicMaterial } from 'three';

import * as dat from 'three/examples/jsm/libs/dat.gui.module';

class Controls {
    constructor(camera, sceneManager, orbitControls, objectPicker) {
        this.camera = camera;
        this.scene = sceneManager.scene;
        this.materials = sceneManager.materials;

        this.gui = new dat.GUI();

        this.heightScale = 0.2;
        this.bouncingSpeed = 0.04;

        this.showRay = false;

        this.hemisphere = true;
        this.color = 0xb3a79f;
        this.groundColor = 0x635543;
        this.intensity = 0.4;

        const cameraFolder = this.gui.addFolder('Camera');
        cameraFolder.add(this.camera.position, 'x', -50, 50);
        cameraFolder.add(this.camera.position, 'y', -50, 50);
        cameraFolder.add(this.camera.position, 'z', 20, 100);
        // cameraFolder.open();

        // this.gui.add(this.materials.chrome, 'metalness', 0, 1, 0.01);
        // this.gui.add(this.materials.chrome, 'roughness', 0, 0.3, 0.001);

        const shadowLight = this.scene.getObjectByName('shadow');

        // this.gui.add(shadowLight.position, 'y', 50, 150);
        // this.gui.add(shadowLight, 'intensity', 7000, 10000);
        // this.gui.add(shadowLight.shadow, 'radius', 10, 300);

        // pointLight.shadow.mapSize.width = 512; // default
        // pointLight.shadow.mapSize.height = 512; // default

        // this.gui.add(shadowLight.shadow.camera, 'near', 5, 50);
        // this.gui.add(shadowLight.shadow.camera, 'far', 50, 500);

        // const toaster = this.scene.getObjectByName('toaster');
        // this.gui.add(toaster.position, 'y', -50, 50);

        this.gui.add(this, 'bouncingSpeed', 0, 0.5);
        this.gui.add(this, 'heightScale', 0, 3, 0.1);

        // this.gui.add(orbitControls.target, 'y', -50, 50);

        const debugFolder = this.gui.addFolder('Debug');
        debugFolder.add(this, 'outputObjects');
        debugFolder.add(this, 'showRay');
        debugFolder.add(objectPicker.mouse, 'x').step(0.01).name('mouse x').listen();
        debugFolder.add(objectPicker.mouse, 'y').step(0.01).name('mouse y').listen();
        // debugFolder.open();

        // gui.add(controls, 'hemisphere').onChange(function (e) {
        //     if (!e) {
        //         hemiLight.intensity = 0;
        //     } else {
        //         hemiLight.intensity = controls.intensity;
        //     }
        // });
        // gui.addColor(controls, 'color').onChange(function (e) {
        //     hemiLight.color = new Color(e);
        // });
        // gui.addColor(controls, 'groundColor').onChange(function (e) {
        //     hemiLight.groundColor = new Color(e);
        // });
        // gui.add(controls, 'intensity', 0, 2, 0.1).onChange(function (e) {
        //     hemiLight.intensity = e;
        // });
    }

    outputObjects() {
        console.log(this.scene);
    }
}

export { Controls };
