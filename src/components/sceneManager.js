import {
    Scene,
    Group,
    Mesh,
    MeshStandardMaterial,
    TextureLoader,
    EquirectangularReflectionMapping,
    PlaneGeometry,
    ShadowMaterial,
    GridHelper,
    sRGBEncoding
} from 'three';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

class SceneManager {
    constructor(loadingManager) {
        this.scene = new Scene();

        this.objLoader = new OBJLoader(loadingManager);
        this.objLoader.setPath('assets/');

        this.textureLoader = new TextureLoader(loadingManager);
        this.textureLoader.setPath('assets/');

        this.materials = {
            shadowMaterial: new ShadowMaterial({ opacity: 0.6 }),
            chrome: new MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.15,
                roughness: 0.05,
            }),
        };

        this.pickableMeshes = [];

        // this.grid();

        const planeGeometry = new PlaneGeometry(500, 500);
        planeGeometry.rotateX(-Math.PI / 2);
        const shadowCatcher = new Mesh(planeGeometry, this.materials.shadowMaterial);
        shadowCatcher.position.y = -52;
        shadowCatcher.receiveShadow = true;
        this.scene.add(shadowCatcher);

        // this.cube();
        this.toaster();

        // this.skybox();
        this.environmentMap();
    }

    grid() {
        const helper = new GridHelper(50, 10);
        helper.material.transparent = true;
        helper.material.opacity = 0.25;
        this.scene.add(helper);
    }

    skybox() {
        const backgroundTexture = this.textureLoader.load('environments/CT-office-2k-sharper-90.webp');
        backgroundTexture.mapping = EquirectangularReflectionMapping;
        this.scene.background = backgroundTexture;
    }

    // TODO: move to lights?
    environmentMap() {
        const environmentMap = this.textureLoader.load('environments/CT-office-2k-sharper-90.webp', (tx) => {
            tx.mapping = EquirectangularReflectionMapping;
            tx.encoding  = sRGBEncoding;
            // linear? also try 4k demo
            this.scene.environment = tx;
        });
    }

    cube() {
        this.objLoader.load('cube/cube1m.obj', (mesh) => {
            mesh.name = 'cube-1m';

            mesh.traverse(function (child) {
                child.castShadow = true;
            });
            mesh.children.forEach((child) => {
                child.material = this.materials.chrome;

                this.pickableMeshes.push(child);
            });
            mesh.scale.set(0.2, 0.2, 0.2);
            this.scene.add(mesh);
        });
    }

    toaster() {
        // const occlusionRoughnessMetallic = this.textureLoader.load('models/toaster/textures/v2/webp/toaster_low_material_OcclusionRoughnessMetallic.webp');

        // trim initial
        this.materials.toaster = new MeshStandardMaterial({
            normalMap: this.textureLoader.load('models/toaster/textures/v2/jpg/toaster_low_material_Normal.jpg'),
            metalnessMap: this.textureLoader.load('models/toaster/textures/v2/jpg/toaster_low_material_Metallic.jpg'),
            metalness: 1,
            roughnessMap: this.textureLoader.load('models/toaster/textures/v2/jpg/toaster_low_material_Roughness.jpg'),
            aoMap: this.textureLoader.load('models/toaster/textures/v2/jpg/toaster_low_material_Occlusion.jpg'),
            aoMapIntensity: 0.75,
            map: this.textureLoader.load('models/toaster/textures/v2/jpg/toaster_low_material_BaseColor.jpg'),
            // envMapIntensity: 0.5,
        });
        this.materials.toaster.map.encoding = sRGBEncoding;

        // body initial
        this.materials.toasterBody = this.materials.toaster.clone();
        this.materials.toasterBody.roughness = 1.05;
        this.materials.toasterBody.color.setStyle('#d3e4e6');

        const toaster = new Group();
        toaster.name = 'toaster';
        this.scene.add(toaster);

        this.objLoader.load('models/toaster/toaster.obj', (group) => {
            const mesh = group.children[ 0 ];
            mesh.geometry.attributes.uv2 = mesh.geometry.attributes.uv; // second UV set needed for aoMap
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = this.materials.toaster;

            this.pickableMeshes.push(mesh);

            toaster.add(mesh);
        });

        this.objLoader.load('models/toaster/toaster_body.obj', (group) => {
            const mesh = group.children[ 0 ];
            mesh.geometry.attributes.uv2 = mesh.geometry.attributes.uv; // second UV set needed for aoMap
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = this.materials.toasterBody;

            this.pickableMeshes.push(mesh);

            toaster.add(mesh);
        });
    }
}

export { SceneManager };
