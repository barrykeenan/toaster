import { WebGLRenderer, PCFSoftShadowMap } from 'three';

/**
 * Initialize a simple default renderer and binds it to the body dom element.
 *
 * @param additionalProperties Additional properties to pass into the renderer
 */
export function initRenderer(additionalProperties) {
    var props = typeof additionalProperties !== 'undefined' && additionalProperties ? additionalProperties : {};

    // var renderer = new WebGLRenderer(props);
    const renderer = new WebGLRenderer({ alpha: true });
    // const renderer = new WebGLRenderer({ antialias: true });
    // renderer.setPixelRatio(window.devicePixelRatio); // perf hit

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;

    // TODO if dom element param, otherwise document.body.appendChild(renderer.domElement)
    document.getElementById('webgl-output').appendChild(renderer.domElement);

    return renderer;
}
