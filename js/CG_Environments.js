/** Alexis Tercero 
 * github: https://github.com/AlexisTercero55
 * email: alexistercero55@gmail.com
 */


/** CLASS | CG3Denv
 * CGenv is the pipeline for the 3D scene.
 * 
 */
class CG3Denv 
{
    // properties of the scene class
    scene; // graphics space (math)
    camera; // camera settings (perspective and view)
    renderer; // render settings (drawing)
    cameraControl; // camera control
    stats; // statistic report of rendering time
    // for background: 
    cameraBG;
    sceneBG;
    composer;

    // methods of the scene class

    /** constructor
     * @param {bool} shadows enable shadows rendering
     */
    constructor(shadows = false) 
    {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(   
                            45, 
                            window.innerWidth / window.innerHeight, 
                            0.1, 
                            1000
                            );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000, 1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = shadows;//(optional)

        // add statistic report of frame rate
        // (optional)
        this.#addStatsObject();

        // add orbit controls for camera
        // (optional)
        this.cameraControl = new THREE.OrbitControls(camera);

        this.#backgroundSetUp();//*# issue

        // add graphics to the web page (HTML)
        //# renderer.domElement should be added to any HTMl container like <div>
        document.body.appendChild(this.renderer.domElement);
    }

    /**
     * BGPlane
     * 
     * @param {String} texture path to the texture file
     */
    #BGPlane(texture = "textures/starry_background.jpg")
    {
        //# why depthTest: false is needed?
        let materialColor = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture(texture),depthTest: false});

        let bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
        bgPlane.position.z = -100;
        bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);

        this.sceneBG.add(bgPlane);
    }

    #backgroundSetUp()
    {
        this.#camBG();
        this.sceneBG = new THREE.Scene();
        this.#BGPlane();

        // setup the passes
        let bgPass = new THREE.RenderPass(this.sceneBG, this.cameraBG);
        let renderPass = new THREE.RenderPass(this.scene, this.camera);
        renderPass.clear = false;
        let effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectCopy.renderToScreen = true;
        // add these passes to the composer
        this.composer = new THREE.EffectComposer(renderer);
        this.composer.addPass(bgPass);
        this.composer.addPass(renderPass);
        this.composer.addPass(effectCopy);

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

    /** 
     * camBG
     * 
     * Ortographic camera for background
     * using ortographic camera to set up scene background.
     */
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


    /** 
     * Stats of rendering 
     * 
     * Make statistic report of frame rate.
     * and add it to the BODY web page.
     */
    #addStatsObject() 
    {
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        document.body.appendChild(this.stats.domElement );
    }
}