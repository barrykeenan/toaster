import { Vector2, Raycaster, CatmullRomCurve3, TubeGeometry, Mesh, MeshBasicMaterial } from 'three';

import * as dat from 'three/examples/jsm/libs/dat.gui.module';

class Controls {
    constructor(scene, materials, objectPicker) {
        this.scene = scene;
        this.materials = materials;

        this.gui = new dat.GUI();

        this.heightScale = 0.2;
        this.bouncingSpeed = 0.04;

        this.showRay = false;

        this.hemisphere = true;
        this.color = 0xb3a79f;
        this.groundColor = 0x635543;
        this.intensity = 0.4;

        // gui.add( camera.position , 'x', -50, 50 );
        // gui.add( camera.position , 'y', -50, 50 );
        // gui.add( camera.position , 'z', -100, 0 );

        this.gui.add(this.materials.materialOne, 'metalness', 0, 1, 0.01);
        this.gui.add(this.materials.materialOne, 'roughness', 0, 0.3, 0.001);

        this.gui.add(this, 'bouncingSpeed', 0, 0.5);
        this.gui.add(this, 'heightScale', 0, 3, 0.1);

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
        console.log(this.scene.children);
    }
}

export { Controls };
