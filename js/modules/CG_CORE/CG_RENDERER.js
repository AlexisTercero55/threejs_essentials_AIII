/**
 * @author: Alexis Tercero
 * github: https://github.com/AlexisTercero55
 * 
 * Here is defined initial configuration for
 * render engine.
 */
 import {THREE} from './CG_THREE.js';

 /**
  * CG_RENDER (render engine set up)
  * 
  * this = THREE.WebGLRenderer
  * 
  * Here is defined initial configuration for
  * render engine.
  * 
  * - background color and its alpha value
  * - size of the render
  * - Shadows enabled
  */
class CG_RENDERER extends THREE.WebGLRenderer
{
    constructor()
    {
        // render settings (drawing)
        super();//THREE.WebGLRenderer = this
        this.setClearColor(0x000000, 1.0);
        this.setSize(window.innerWidth, window.innerHeight);
        // enable shadows rendering
        this.shadowMapEnabled = true;
        
        // add graphics to the web page (HTML)
        //# renderer.domElement should be added to any HTMl container like <div>
        document.body.appendChild(this.domElement);
        
        console.log('CG_REDNERER instantiated');
    }
}

export {CG_RENDERER};