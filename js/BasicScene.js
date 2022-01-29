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

function addControlGui(controlObject) 
{
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
    gui.add(controlObject, 'opacity', 0.1, 1);
    gui.addColor(controlObject, 'color');
}

function camView()
{
    // set up the camera position and view
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 13;
    camera.lookAt(scene.position);
}

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
 * ------------ Main function ----------------
 * this function is executed when the page is loaded.
 */
function main() 
{
    CGenv(); // set up the graphics environment

    // draw the scene
    plane1();
    var cube = cube1(); // set up the cube
    addVertices(cube); // add small spheres on each of the vertices of the cube
    // camera view
    camView();
    // set up the light
    spotLight1();

    /**
     * adding gui contros using dat.gui
     */
    control = new function() 
    {
        this.rotationSpeed = 0.005;
        this.opacity = 0.6;
        this.color = cube.material.color.getHex();
    };
    addControlGui(control);

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