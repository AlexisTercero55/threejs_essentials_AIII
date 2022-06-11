/**
 * Alexis Tercero 
 * github: https://github.com/AlexisTercero55
 * email: alexistercero55@gmail.com
 */

// global variables
var renderer;
var scene;
var camera;
var control;
var stats;
var cameraControl;


/**
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
//# functions above need to be move to another CG_desc.js file

/**
 * ------------ Main function -----------------------
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

/**
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