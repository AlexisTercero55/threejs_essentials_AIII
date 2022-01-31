/**
 * Earth
 */
function Scene()
{
    // drawings
    earth();
    //clouds();
    // camera view
    camView([35,36,33]);

    // control constructor
    control = new function() 
    {
        // edit control instance @CG_SetUp.js
        this.rotationSpeed = 0.005;
    };
}