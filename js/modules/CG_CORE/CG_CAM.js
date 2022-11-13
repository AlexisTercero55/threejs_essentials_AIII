/**
 * @author: Alexis Tercero
 * github: https://github.com/AlexisTercero55
 * 
 * Here is defined PerspectiveCamera settings and
 * methots
 */

import {THREE} from './CG_THREE.js';

/**
 * CG_CAM (Perspective Camera)
 * 
 * Enables:
 * 
 * - THREE.PerspectiveCamera object
 * - THREE.OrbitControls
 * - camView (set up a new POV)
 */
class CG_CAM extends THREE.PerspectiveCamera
{
    constructor()
    {
        super();
        // some GUI for camera controls available
        this.#camControls();
        console.log('CG_CAM instantiated');
    }

    /**
     * camView (set up a new POV)
     * @param {THREE.Object3D} object - Object to view
     * @param {Array} xyz - coordinates from camera will be viewed
     */
    camView(object,xyz = [20,20,20])
    {
        // set up the camera position and view
        this.position.x = xyz[0];
        this.position.y = xyz[1];
        this.position.z = xyz[2];
        this.lookAt(object.position);
    }

    #camControls()
    {
        /**
         * Enables THREE.OrbitControls
         */
        this.controls = new THREE.OrbitControls(this);
    }
}

export {CG_CAM};