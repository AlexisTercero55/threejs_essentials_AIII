/**
 * Earth with clouds and realistic lighting.
 */

/** //# ISSUE: Scene must be a class and needs to initialize
 * 
 */
function Scene()
{
    //light
    directionalLight();
    ambientLight();
    
    // drawings
    earth();
    clouds();

    // camera view
    camView([35,36,33]);

    // control constructor
    control = new function() 
    {
        // edit control instance @CG_SetUp.js
        this.rotationSpeed = 0.005;
    };
}

function renderLoop()
{
    scene.getObjectByName('earth').rotation.y+=control.rotationSpeed;
}