/**
 * Alexis Tercero 
 * github: https://github.com/AlexisTercero55
 * email: alexistercero55@gmail.com
 */
/** //# issue
 * CGenv must be a class and needs to initialize 
 * the scene components:
 * - Scene
 * - Camera
 * - Renderer
 * - setClearColor
 * - setSize
 * - lights
 * - shadowMapEnabled (optional)
 * - addStatsObject (optional)
 * - cameraControl (optional)
 * - renderer.domElement to the DOM
 */

class CGenv 
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

    /**
     * @param {bool} shadows enable shadows rendering
     */
    constructor(shadows = false) 
    {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(   45, 
                                                    window.innerWidth / window.innerHeight, 
                                                    0.1, 
                                                    1000
                                                );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000, 1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = shadows;

        // add statistic report of frame rate
        this.addStatsObject();

        // add orbit controls for camera
        this.cameraControl = new THREE.OrbitControls(camera);

        this.#backgroundSetUp();//*# issue

        // add graphics to the web page (HTML)
        //# renderer.domElement should be added to any HTMl container like <div>
        document.body.appendChild(this.renderer.domElement);
    }

    BGPlane(texture = "textures/starry_background.jpg")
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
        this.BGPlane();

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

    /** Ortographic camera for background
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


    /** Stats of rendering 
     * Make statistic report of frame rate.
     * and add it to the web page.
     */
    addStatsObject() 
    {
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        document.body.appendChild(this.stats.domElement );
    }
}

function CGenv()
{
    // graphics space (math)
    scene = new THREE.Scene();
    // camera settings (perspective and view)
    camera = new THREE.PerspectiveCamera(   45, 
                                            window.innerWidth / window.innerHeight, 
                                            0.1, 
                                            1000
                                        );
    // render settings (drawing)
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // enable shadows rendering
    renderer.shadowMapEnabled = true;

    // add statistic report of frame rate
    addStatsObject();
    // add orbit controls for camera
    cameraControl = new THREE.OrbitControls(camera);

    backgroundSetUp();

    // add graphics to the web page (HTML)
    //# renderer.domElement should be added to any HTMl container like <div>
    document.body.appendChild(renderer.domElement);
}

/**
 * Make gui contros using dat.gui
 * @param {object} controlObject 
 */
 function addControlGui(controlObject) 
 {
    var gui = new dat.GUI();
    let speed = 0.09;
    gui.add(controlObject, 'rotationSpeed', -speed, speed);
    // gui.addColor(controlObject, 'color');
    // gui.add(controlObject, 'opacity', 0, 1);
 }
 
 /**
  * Make statistic report of frame rate.
  */
 function addStatsObject() 
 {
     stats = new Stats();
     stats.setMode(0);
     stats.domElement.style.position = 'absolute';
     stats.domElement.style.left = '0px';
     stats.domElement.style.top = '0px';
     document.body.appendChild( stats.domElement );
 }

 /**
  * Update and render loop
  */
function render() 
{
    // update scene by controls info
    // ----- Scene1.js
    // renderLoop();
    // ----- Scene2.js
    renderLoop();

    // ----------------------------------------------------------------------
    cameraControl.update();// update camera controls pp:45
    stats.update();//update statistic report

    /**
     * when the scene has baground from the background plane,
     * use
     */
    // and render the scene, renderer shouldn't autoclear, we let the composer steps do that themselves
    // rendering is now done through the composer, which executes the render steps
    renderer.autoClear = false;
    composer.render();
    /**
     * instead of renderer.render(scene, camera);
     */
    // render using requestAnimationFame
    // renderer.render(scene, camera); // renderer is a global variable


    // set up a render loop.
    requestAnimationFrame(render);
}