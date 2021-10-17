import {
    Group,
    MeshStandardMaterial,
    sRGBEncoding
} from 'three';

class Toaster {
    constructor(objLoader, textureLoader) {
        this.objLoader = objLoader;
        this.textureLoader = textureLoader;

        this.materials = {};
        this.rootObject = null;
        this.pickableMeshes = [];

        // for animation
        this.step = 0;

        this.initMaterials();
        this.initGeo();
    }

    /**
     * Create materials and load textures
     */
    initMaterials() {
        // TODO: compare size of packed map
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
    }

    /**
     * Create or load geometry
     */
    initGeo() {
        this.rootObject = new Group();
        this.rootObject.name = 'toaster';

        this.objLoader.load('models/toaster/toaster.obj', (group) => {
            const mesh = group.children[0];
            mesh.geometry.attributes.uv2 = mesh.geometry.attributes.uv; // second UV set needed for aoMap
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = this.materials.toaster;

            this.pickableMeshes.push(mesh);

            this.rootObject.add(mesh);
        });

        this.objLoader.load('models/toaster/toaster_body.obj', (group) => {
            const mesh = group.children[0];
            mesh.geometry.attributes.uv2 = mesh.geometry.attributes.uv; // second UV set needed for aoMap
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = this.materials.toasterBody;

            this.pickableMeshes.push(mesh);

            this.rootObject.add(mesh);
        });
    }

    /**
     * Updated on every frame
     */
    update() {
        // bounce the toaster up and down
        this.step += 0.05;
        this.rootObject.position.y = 0.15 * Math.sin(this.step);
    }

}

export { Toaster };
