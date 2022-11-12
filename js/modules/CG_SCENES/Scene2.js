class CG_SCENE
{
    constructor()
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
        this.control = new function() 
        {
            // edit control instance @CG_SetUp.js
            this.rotationSpeed = 0.005;
        };
    }
}