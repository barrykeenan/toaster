import {
    PlaneGeometry,
    Mesh,
    ShadowMaterial,
} from 'three';

class ShadowCatcher {
    constructor(textureLoader) {
        this.textureLoader = textureLoader;

        this.materials = {};
        this.rootObject = null;
        this.pickableMeshes = [];

        this.initMaterials();
        this.initGeo();
    }

    /**
     * Create materials and load textures
     */
    initMaterials() {
        this.materials.shadowMaterial = new ShadowMaterial({ opacity: 0.6 });
    }

    /**
     * Create or load geometry
     */
    initGeo() {
        const planeGeometry = new PlaneGeometry(500, 500);
        planeGeometry.rotateX(-Math.PI / 2);

        this.rootObject = new Mesh(planeGeometry, this.materials.shadowMaterial);
        this.rootObject.name = 'shadow-catcher';

        this.rootObject.position.y = -38;
        this.rootObject.receiveShadow = true;
    }

    /**
     * Updated on every frame
     */
    update() {
    }

}

export { ShadowCatcher };
