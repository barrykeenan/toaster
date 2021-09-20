import {
    Scene,
    Group,
    MeshStandardMaterial,
    TextureLoader,
    EquirectangularReflectionMapping,
    PMREMGenerator,
} from 'three';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

class SceneManager {
    constructor(loadingManager) {
        this.scene = new Scene();

        this.objLoader = new OBJLoader(loadingManager);
        this.objLoader.setPath('assets/models/');

        this.textureLoader = new TextureLoader(loadingManager);
        this.textureLoader.setPath('assets/textures/');

        this.materials = {
            materialOne: new MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.9,
                roughness: 0.05,
            }),
        };

        this.pickableMeshes = [];

        // this.cube();
        this.toaster();

        // this.skybox();
        this.environmentMap();
    }

    skybox() {
        const backgroundTexture = this.textureLoader.load('photosphere/CT-office.jpg');
        backgroundTexture.mapping = EquirectangularReflectionMapping;
        this.scene.background = backgroundTexture;
    }

    // TODO: move to lights?
    environmentMap() {
        const environmentMap = this.textureLoader.load(
            'photosphere/CT-office-2k-sharper-90.webp',
            (tx) => {
                tx.mapping = EquirectangularReflectionMapping;
                // linear? also try 4k demo
                this.scene.environment = tx;
            }
        );
    }

    cube() {
        this.objLoader.load('cube/cube1m.obj', (mesh) => {
            mesh.name = 'cube-1m';
            mesh.children.forEach((child) => {
                child.material = this.materials.materialOne;
                this.pickableMeshes.push(child);
            });
            mesh.scale.set(0.2, 0.2, 0.2);
            this.scene.add(mesh);
        });
    }

    toaster() {
        const toaster = new Group();
        toaster.name = 'toaster';
        this.scene.add(toaster);

        this.objLoader.load('smeg-toaster/smeg-toaster-body.obj', (mesh) => {
            mesh.name = 'toaster-body';
            mesh.children.forEach((child) => {
                child.material = this.materials.materialOne;
                child.geometry.castShadow = true;
                child.geometry.receiveShadow = true;

                this.pickableMeshes.push(child);
            });
            toaster.add(mesh);
        });

        this.objLoader.load('smeg-toaster/smeg-toaster-lever.obj', (mesh) => {
            mesh.name = 'toaster-lever';
            mesh.children.forEach((child) => {
                child.material = this.materials.materialOne;
                child.geometry.castShadow = true;
                child.geometry.receiveShadow = true;

                this.pickableMeshes.push(child);
            });
            toaster.add(mesh);
        });
    }
}

export { SceneManager };
