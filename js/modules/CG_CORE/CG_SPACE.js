/**
 * @author: Alexis Tercero
 * github: https://github.com/AlexisTercero55
 * 
 * Here is defined the math space where CG will
 * be proyected
 */

import {THREE} from './CG_THREE.js';
import {CG_CAM} from './CG_CAM.js';
import {CG_RENDERER} from './CG_RENDERER.js';

/**
 * CG_SPACE (graphics space)
 * 
 * this = THREE.Scene
 * 
 * This is where you place OBJECTS, LIGHTS and CAMERAS.
 * Due mathematical approach CG_SPACE contains all 
 * configurations needed to render setting up the
 * graphics pipeline after geometry management.
 * 
 * Items that are already set up
 * - Scene
 * - Camera
 * - render
 */
class CG_SPACE extends THREE.Scene 
{
    constructor()
    {
        super();// this = THREE.Scene

        // crate an standard camera
        this.camera = new CG_CAM();
        // initial POV at first render
        this.camera.camView(this);

        // draw settings | renderer
        this.renderer = new CG_RENDERER();

        console.log('CG_SPACE instantiated');
        // this.rendering();
    }

    // Methods

    // getter for this.renderer.autoClear propertie
    
    // to add 3D Objects to the scene just using this.add(object) method    

    /**
     * _render_CG_SPACE
     * 
     * @param {Boolean} RW
     * 
     * Some configuration for CG_SCENE.rendering() method
     * also called animation loop
     * 
     * - update camera controls
     * - RW Enables or disables Render Way (Standard render) 
     */
    _render_CG_SPACE(RW = true)
    {
        // this.camera.controls.update()
        if(RW)//Standard render
        {
            this.renderer.render(this, this.camera);
        }
    }

    rendering()
    {
        this._render_CG_SPACE();
        requestAnimationFrame(this.rendering);
    }


}

// let a = new CG_SPACE();

// window.onload = () => {
//     let a = new CG_SPACE();
// }

export {CG_SPACE};