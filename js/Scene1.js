/** DONE
 * Summary of ch 1.
 * 
 * - 3DObjects
 * - Lights
 * - controlObjects
 */
function Scene()
{
    // drawings
    var cube = cube1(); // set up the cube
    addVertices(cube); // show the vertices
    plane1(); // set up the plane
    // camera view
    camView();
    // set up the light
    spotLight1();

    // control constructor
    control = new function() 
    {
        this.rotationSpeed = 0.005;
        this.opacity = 0.6;
        this.color = cube.material.color.getHex();
    };
}

function renderLoop()
{
    // animation: rotate camera around the scene (xz circle)
    var rotSpeed = control.rotationSpeed;//by controls info
    camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
    camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);
    scene.getObjectByName('cube').material.opacity = control.opacity;
    scene.getObjectByName('cube').material.color = new THREE.Color(control.color);
}