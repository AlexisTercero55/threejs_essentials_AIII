/**
 * @author: Alexis Tercero
 * github: https://github.com/AlexisTercero55
 */
import {CG_BACKGROUND_SPACE} from './CG_BACKGROUND_SPACE.js';
import { THREE } from "./CG_THREE.js";
import { CG_LIGHTS } from './CG_LIGHTS.js';
import { CG_SPACE } from './CG_SPACE.js';

class CG_SCENE extends CG_SPACE
{
    constructor()
    {
        super();

        this.cube1();

        this.lights = new CG_LIGHTS(this);
        this.lights.spotLight1();

        console.log('CG_SCENE instantiated');
        this.rendering();
    }

    cube1()
    {
        let cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
        let cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0x00ff4a, 
            transparent:true, 
            opacity:0.6
        });
        
        /** @type {THREE.Material}
         * Next two line are used to add different colors to each face
         * of any geometry.
         */
        // var materialArray = applyFaceColors(cubeGeometry);
        // var cubeMaterial = new THREE.MeshFaceMaterial(materialArray);

        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.name='cube';
        // activate the shadows (emit shadows)
        cube.castShadow = true;
        this.add(cube);
        // return cube;
    }

    rendering()
    {
        this.animationLoop();
        super._render_CG_SPACE();
        requestAnimationFrame(this.rendering.bind(this));
    }

    animationLoop()
    {
        // animation: rotate camera around the scene (xz circle)
        let rotSpeed = 0.01;//by controls info
        this.camera.position.x = this.camera.position.x * Math.cos(rotSpeed) + this.camera.position.z * Math.sin(rotSpeed);
        this.camera.position.z = this.camera.position.z * Math.cos(rotSpeed) - this.camera.position.x * Math.sin(rotSpeed);
        this.camera.lookAt(this.position);
        this.getObjectByName('cube').material.opacity = 0.9;
    }
}

window.onload = () => {
    let a = new CG_SCENE();
    // a.rendering;
    console.log('rendering loop called');
}