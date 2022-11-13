/**
 * @author: Alexis Tercero
 * github: https://github.com/AlexisTercero55
 * 
 * Here is defined the background for a specific
 * Scene using a texture
 */

import {THREE} from './CG_THREE.js';
import {CG_SPACE} from './CG_SPACE.js';


/**
 * CG_BACKGROUND_SPACE
 * 
 * this = CG_SPACE
 * 
 * Some Scene instances need extend this class for
 * adding a background at your animations
 */
class CG_BACKGROUND_SPACE extends CG_SPACE
{

    constructor()
    {
        super();// create a graphing space
        this.#camBG();// enable background rendering
        // another graphics space for background
        this.sceneBG = new THREE.Scene();
        this.#BGPlane();// adds texture to background
        this.#setUpPasses();

        console.log('CG_BACKGROUND_SCENE instantiated');
    }

    /**
     * render_CG_BACKGROUND_SPACE
     * 
     * Some configuration for CG_SCENE.rendering() method
     * also called animation loop
     */
    render_CG_BACKGROUND_SPACE()
    {
        super._render_CG_SPACE(false);

        super.renderer.AutoClear = false;
        this.composer.render();
    }

    #camBG()
    {
        this.cameraBG = new THREE.OrthographicCamera
                        (
                            -window.innerWidth, //left This property defines the border for the leftmost position to be rendered
                            window.innerWidth, //right This property defines the border for the rightmost position to be rendered.
                            window.innerHeight, //top This property defines the border for the topmost position to be rendered
                            -window.innerHeight,// bottom This property defines the border for the bottommost position to be rendered
                            -10000, //near This property defines the point, based on the position of the camera, from where the scene will be rendered.
                            10000 //far This property defines the point, based on the position of the camera, to which the scene will be rendered.
                        );
        this.cameraBG.position.z = 50;
    }

    #BGPlane()
    {
        //# why depthTest: false is needed?
        let materialColor = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture("textures/starry_background.jpg"),depthTest: false});

        let bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
        bgPlane.position.z = -100;
        bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);

        this.sceneBG.add(bgPlane);
    }

    #setUpPasses()
    {
        this.bgPass = new THREE.RenderPass(this.sceneBG, this.cameraBG);
        this.renderPass = new THREE.RenderPass(this, this.camera);
        this.renderPass.clear = false;
        this.effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        this.effectCopy.renderToScreen = true;

        // add these passes to the composer
        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.addPass(this.bgPass);
        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.effectCopy);
    }

}

// let a = new CG_BACKGROUND_SPACE();
export {CG_BACKGROUND_SPACE};
