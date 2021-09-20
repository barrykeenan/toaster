import { Vector2, Raycaster, CatmullRomCurve3, TubeGeometry, Mesh, MeshBasicMaterial } from 'three';

class ObjectPicker {
    constructor(scene, camera, pickableMeshes) {
        this.scene = scene;
        this.camera = camera; // for origin position of ray
        this.mouse = new Vector2();
        this.raycaster = new Raycaster();

        this.pickableMeshes = pickableMeshes;

        // visible ray
        this.rayMaterial = new MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.6,
        });
        this.ray = null;

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', this.updateMousePosition.bind(this), false);
        document.addEventListener('mousedown', this.pickObject.bind(this), false);
    }

    /**
     * Update mouse position in normalized device coordinates (-1 to +1)
     *
     * @param {*} event
     */
    updateMousePosition(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    pickObject(event) {
        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // detect objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.pickableMeshes);

        if (intersects.length > 0) {
            // console.log(intersects[0]);
            console.log('Picked:', intersects[0].object);
            // intersects[0].object.material.transparent = true;
            // intersects[0].object.material.opacity = 0.1;
        }
    }

    /**
     * call from render function
     */
    update(showRay) {
        if (!showRay) {
            return;
        }

        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // detect objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.pickableMeshes);

        if (intersects.length > 0) {
            if (this.ray) {
                this.scene.remove(this.ray);
            }

            // offset source of line to just below camera
            const cameraPosition = this.camera.position.clone();
            cameraPosition.y = cameraPosition.y - 0.2;

            const points = [];
            points.push(cameraPosition);
            points.push(intersects[0].point);

            const rayGeo = new TubeGeometry(new CatmullRomCurve3(points), 60, 0.001);

            this.ray = new Mesh(rayGeo, this.rayMaterial);
            this.scene.add(this.ray);
        }
    }
}

export { ObjectPicker };
