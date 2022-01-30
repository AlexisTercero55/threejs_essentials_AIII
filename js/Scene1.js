/** DONE
 * Summary of ch 1.
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