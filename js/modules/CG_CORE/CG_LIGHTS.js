/**
 * @author: Alexis Tercero
 * github: https://github.com/AlexisTercero55
 * 
 * Here is defined the math space where CG will
 * be proyected
 */

import { THREE } from "./CG_THREE.js";

class CG_LIGHTS
{
    constructor(object)
    {
        this.scene = object;
        console.log('CG_LIGHTS initialize')
    }

    directionalLight()
    {
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position = new THREE.Vector3(100, 10, -50);
        directionalLight.name = 'directional';
        this.scene.add(directionalLight);
    }

    ambientLight()
    {
        let ambientLight = new THREE.AmbientLight(0x111111);
        this.scene.add(ambientLight);
    }



    spotLight1()
    {
        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(10, 20, 20);
        
        spotLight.shadowCameraNear = 20;
        spotLight.shadowCameraFar = 50;
        
        spotLight.castShadow = true;
        this.scene.add(spotLight);
    }
}

export {CG_LIGHTS};