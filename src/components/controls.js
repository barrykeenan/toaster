import { Vector2, Raycaster, CatmullRomCurve3, TubeGeometry, Mesh,Color, MeshBasicMaterial, MathUtils } from 'three';

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

        // const cameraFolder = this.gui.addFolder('Camera');
        // cameraFolder.add(this.camera.position, 'x', -50, 50);
        // cameraFolder.add(this.camera.position, 'y', -50, 50);
        // cameraFolder.add(this.camera.position, 'z', 20, 100);
        // cameraFolder.open();

        // this.gui.add(this.materials.toasterBody, 'metalness', 0, 1, 0.01);
        // this.gui.add(this.materials.chrome, 'roughness', 0, 0.3, 0.001);

        const shadowLight = this.scene.getObjectByName('shadow');

        // this.gui.add(shadowLight.position, 'y', 50, 150);
        // this.gui.add(shadowLight, 'intensity', 7000, 10000);
        // this.gui.add(shadowLight.shadow, 'radius', 10, 300);

        // pointLight.shadow.mapSize.width = 512; // default
        // pointLight.shadow.mapSize.height = 512; // default

        // this.gui.add(shadowLight.shadow.camera, 'near', 5, 50);
        // this.gui.add(shadowLight.shadow.camera, 'far', 50, 500);

        const pivotRotate = this.scene.getObjectByName('pivotRotate');
        if(pivotRotate){


            this.gui.add(pivotRotate.rotation, 'y', -MathUtils.degToRad(360), MathUtils.degToRad(360)).name('rotate y').step(0.001);

            const pivotHeight = this.scene.getObjectByName('pivotHeight');
            this.gui.add(pivotHeight.rotation, 'x', 0, MathUtils.degToRad(360)).name('height').step(0.001);
    
            const lightArm = this.scene.getObjectByName('lightArm');
            this.gui.add(lightArm.position, 'y', 150, 500).name('arm distance');
            
            const spotLight = this.scene.getObjectByName('spotLight1');

            const lightControls = new function () {
                this.pointColor = spotLight.color.getStyle();
                this.intensity = 1;
                this.distance = 0;
                this.angle = 0.1;
                this.shadowDebug = false;
                this.castShadow = true;
                this.penumbra = 0;
              };

            // this.gui.addColor(spotLight, 'color').listen();
            this.gui.addColor(lightControls, 'pointColor').onChange(function (e) {
                spotLight.color = new Color(e);
            });
            this.gui.add(spotLight, 'intensity', 1000, 100000).step(1000);
            // this.gui.add(spotLight, 'power', 0, 50000).step(500);
            this.gui.add(spotLight, 'angle', 0, Math.PI * 2).step(0.1);
            this.gui.add(spotLight, 'penumbra', 0, 1).step(0.01);
            this.gui.add(spotLight, 'castShadow', true);
            this.gui.add(spotLight.shadow.camera, 'near', 400, 500).onChange(() => spotLight.shadow.camera.updateProjectionMatrix());;
            this.gui.add(spotLight.shadow.camera, 'far', 500, 1000).onChange(() => spotLight.shadow.camera.updateProjectionMatrix());;
            this.gui.add(spotLight.shadow, 'focus', 0, 10);

        }
        
        


        // const toaster = this.scene.getObjectByName('toaster');
        // this.gui.add(toaster.position, 'y', -50, 50);

        // this.gui.add(this, 'bouncingSpeed', 0, 0.5);
        // this.gui.add(this, 'heightScale', 0, 3, 0.1);

        // this.gui.add(orbitControls.target, 'y', -50, 50);

        const debugFolder = this.gui.addFolder('Debug');
        // debugFolder.add(this, 'outputObjects');
        // debugFolder.add(this, 'showRay');
        // debugFolder.add(objectPicker.mouse, 'x').step(0.01).name('mouse x').listen();
        // debugFolder.add(objectPicker.mouse, 'y').step(0.01).name('mouse y').listen();
        debugFolder.add(window, 'innerWidth').listen();
        debugFolder.add(window, 'innerHeight').listen();
        debugFolder.add(window, 'devicePixelRatio').listen();
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
