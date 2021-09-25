import { HemisphereLight, Color, PointLight, PointLightHelper, CameraHelper } from 'three';

export function initLights(scene) {
    // Ambient
    // TODO: not needed when using envMap
    const hemiLight = new HemisphereLight(0xb3a79f, 0x635543, 3);
    hemiLight.position.set(0, 150, 0);
    // hemiLight.intensity = 0.4;
    hemiLight.intensity = 0.6;
    scene.add(hemiLight);

    // Points
    const sphereSize = 2;

    const shadowLight = new PointLight(0xffffd9, 0);
    shadowLight.name = 'shadow';
    shadowLight.position.set(0, 150, 0); // scene origin is 1.5m off ground
    shadowLight.decay = 2;

    shadowLight.castShadow = true;
    shadowLight.shadow.camera.near = 5; // default
    shadowLight.shadow.camera.far = 500; // default
    shadowLight.shadow.radius = 20;
    shadowLight.shadow.mapSize.width = 1024; // default
    shadowLight.shadow.mapSize.height = 1024; // default

    scene.add(shadowLight);
    // scene.add(new PointLightHelper(shadowLight, sphereSize));

    var shadowHelper = new CameraHelper(shadowLight.shadow.camera);
    // scene.add(shadowHelper);

    const pointLight = new PointLight(0xffffd9, 50000);
    pointLight.position.set(180, 100, 200); // scene origin is 1.5m off ground
    pointLight.decay = 2;
    scene.add(pointLight);
    // scene.add( new PointLightHelper( pointLight, sphereSize ) );

    const pointLight2 = new PointLight(0xffffd9, 50000);
    pointLight2.position.set(-180, 120, 220); // scene origin is 1.5m off ground
    pointLight2.decay = 2;
    scene.add(pointLight2);
    // scene.add( new PointLightHelper( pointLight2, sphereSize ) );

    const pointLight3 = new PointLight(0xffffd9, 20000);
    pointLight3.position.set(190, 150, -250);
    pointLight3.decay = 2;
    scene.add(pointLight3);
    // scene.add( new PointLightHelper( pointLight3, sphereSize ) );

    const pointLight4 = new PointLight(0xffffd9, 20000);
    pointLight4.position.set(30, 150, -400);
    pointLight4.decay = 2;
    scene.add(pointLight4);
    // scene.add( new PointLightHelper( pointLight4, sphereSize ) );

    const pointLight5 = new PointLight(0xffffd9, 20000);
    pointLight5.position.set(-180, 150, -250);
    pointLight5.decay = 2;
    scene.add(pointLight5);
    // scene.add( new PointLightHelper( pointLight5, sphereSize ) );
}
