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
 * Set position and orientation of the camera.
 * @param {array} xyz - [x,y,z]
 */
function camView(xyz = [20,20,20])
{
    // set up the camera position and view
    camera.position.x = xyz[0];
    camera.position.y = xyz[1];
    camera.position.z = xyz[2];
    camera.lookAt(scene.position);
}

/**
 * Set spotlight on the scene.
 */
function spotLight1()
{
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    
    spotLight.castShadow = true;
    scene.add(spotLight);
}

/**
 * ------------ Main function -----------------------
 * this function is executed when the page is loaded.
 */
function main() 
{
    CGenv(); // set up the graphics environment

    Scene(); // set up the scene
    // adding gui contros using dat.gui
    // control takes the object with the info of the scene()
    addControlGui(control);//# update function acording Scene
    addStatsObject();// add statistic report of frame rate
    // add controls
    cameraControl = new THREE.OrbitControls(camera);

    // add graphics to the web page (HTML)
    document.body.appendChild(renderer.domElement);
    render(); // render and animations
}
window.onload = main;

/**
 * Function handles the resize event. This make sure the camera and the renderer
 * are updated at the correct moment.
 */
function handleResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);