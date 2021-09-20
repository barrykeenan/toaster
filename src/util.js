import { WebGLRenderer, Vector3, Color, PerspectiveCamera, PCFSoftShadowMap } from 'three';

/**
 * Initialize a simple default renderer and binds it to the "webgl-output" dom
 * element.
 *
 * @param additionalProperties Additional properties to pass into the renderer
 */
export function initRenderer(additionalProperties) {
    var props =
        typeof additionalProperties !== 'undefined' && additionalProperties
            ? additionalProperties
            : {};
    var renderer = new WebGLRenderer(props);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;

    renderer.setClearColor(new Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('webgl-output').appendChild(renderer.domElement);

    return renderer;
}

/**
 * Initialize a simple camera and point it at the center of a scene
 *
 * @param {Vector3} [initialPosition]
 */
export function initCamera(initialPosition) {
    var position = initialPosition !== undefined ? initialPosition : new Vector3(0, 22, 50);

    var camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
    camera.lookAt(new Vector3(0, 0, 0));

    return camera;
}
