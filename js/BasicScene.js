/**
 * Alexis Tercero 
 * github: https://github.com/AlexisTercero55
 * email: alexistercero55@gmail.com
 * 
 * THIS IS AN INTERFACE
 * 
 * An script that launch the website's process 
 * (events, handlers, runtime)
 */

// global variables
var renderer;
var scene;
var camera;
var control;
var stats;
var cameraControl;

var cameraBG;
var sceneBG;
var composer;


/** METHOD | IMPLEMENTED IN CGenv class
 * SET POSITION AND ORIENTATION OF THE CAMERA.
 * @param {array} xyz - [x,y,z]
 * 
 * //# implement CGenv class that contains:
 * * the camera
 * * renderer or 3D space
 * * properties of the scene [background, lights, GUI, updaters, ...]
 */
function camView(xyz = [20,20,20])
{
    // set up the camera position and view
    camera.position.x = xyz[0];
    camera.position.y = xyz[1];
    camera.position.z = xyz[2];
    camera.lookAt(scene.position);
}

// METHOD | IMPLEMENTED IN CGenv class
    function BGPlane()
    {
        //# why depthTest: false is needed?
        var materialColor = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture("textures/starry_background.jpg"),depthTest: false});

        var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
        bgPlane.position.z = -100;
        bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);

        sceneBG.add(bgPlane);
    }

// METHOD | IMPLEMENTED IN CGenv class
    function backgroundSetUp()
    {
        camBG();
        sceneBG = new THREE.Scene();
        BGPlane();

        // setup the passes
        var bgPass = new THREE.RenderPass(sceneBG, cameraBG);
        var renderPass = new THREE.RenderPass(scene, camera);
        renderPass.clear = false;
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectCopy.renderToScreen = true;
        // add these passes to the composer
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(bgPass);
        composer.addPass(renderPass);
        composer.addPass(effectCopy);

        /**pp:52
         * In this example, we first define two THREE.RenderPass objects. With a Three.
            RenderPass object, you can render a scene with a specific camera, but the result
            isn't rendered directly to the screen but kept internally for further processing. The
            normal behavior of a Three.RenderPass object is to clear the current output from
            the renderer before rendering. This is why we need to set the renderPass.clear
            property on the second THREE.RenderPass object. If we don't do this, we'll only
            see the rotating earth and not the background.
        */
    }

//# functions above need to be move to another CG_desc.js file

/**
 * ------------ Main function -----------------------
 * 
 * this function is executed when the page is loaded.
 */
function main() 
{
    CGenv(); // set up the graphics environment

    Scene(); // set up the scene to be rendered

    // adding gui contros using dat.gui
    // control takes the object with the info of the scene()
    addControlGui(control);//# update function acording Scene

    // MUST BE THE LAST LINE
    render(); // render and animations
}
window.onload = main;
// for OOP aproach we need 
//  window.onload = GC_INTERFACE.render() (animate)

/**
 * It would be a method from a Scene class
 * Function handles the resize event. 
 * This make sure the CAMERA AND THE RENDERER
 * are UPDATED at the CORRECT MOMENT.
 */
function handleResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);
// for OOP aproach we need 
//  window.addEventListener('resize', GC_INTERFACE.handleResize, false);