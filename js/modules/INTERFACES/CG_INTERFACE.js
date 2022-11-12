/**
 * @author: Alexis Tercero
 * @github: https://github.com/AlexisTercero55
 * @email: alexistercero55@gmail.com
 * @date: 11/11/2022
 */

/** INTERFACES:
 * 
    Interfaces are defined by different configurations of CG pipelines element:

    - Perspective
    - camera (s)
    - background (it may be change latter)
    - transformations
    - render engine
    - metrics or menus
    - animation loop
    - etc.  //# (1) need constant inprove

    together they build a class that provides the way to vizualize the render and animations.
 */

// crate a class that runs on its constructor the following methods: CGenv, Scene, addControlGui, render

class GC_INTERFACE
{
    constructor(Scene) //Scene:CG_SCENE
    {
        this.CGenv();
        this.CG_Scene = Scene; // set of animation instructions
        this.addControlGui(this.CG_Scene.control);//callback for manipulate animations
        //this.render();
    }

    // Methods

    /**
     * CGenv()
     * 
     * Set up the initial graphics pipeline
     * - Math space
     * - Perspective and view
     * - Render engine and its internal configurations
     */
    CGenv()
    {
        // graphics space (math)
        this.scene = new THREE.Scene();

        // camera settings (perspective and view)
        this.camera = new THREE.PerspectiveCamera(   45, 
                                                window.innerWidth / window.innerHeight, 
                                                0.1, 
                                                1000
                                            );

        // render settings (drawing)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000, 1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // enable shadows rendering
        this.renderer.shadowMapEnabled = true;

        // add statistic report of frame rate
        this.addStatsObject();
        // add orbit controls for camera
        this.cameraControl = new THREE.OrbitControls(this.camera);

        this.backgroundSetUp();

        // add graphics to the web page (HTML)
        //# renderer.domElement should be added to any HTMl container like <div>
        document.body.appendChild(this.renderer.domElement);
    }

    /**
     * Make statistic report of frame rate.
     */
    addStatsObject() 
    {
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        document.body.appendChild( this.stats.domElement );
    }

    backgroundSetUp()
    {
        // Enable background like texture
        this.camBG();
        this.sceneBG = new THREE.Scene();
        this.BGPlane();

        // setup the passes
        this.bgPass = new THREE.RenderPass(sceneBG, cameraBG);
        this.renderPass = new THREE.RenderPass(scene, camera);
        this.renderPass.clear = false;
        this.effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        this.effectCopy.renderToScreen = true;
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

    BGPlane()
    {
        //# why depthTest: false is needed?
        this.materialColor = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture("textures/starry_background.jpg"),depthTest: false});

        this.bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
        this.bgPlane.position.z = -100;
        this.bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);

        this.sceneBG.add(this.bgPlane);
    }

    camBG()
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

    render() 
    {
        // update scene by controls info
        // ----- Scene1.js
        // renderLoop();
        // ----- Scene2.js
        this.CG_Scene.renderLoop();

        // ----------------------------------------------------------------------
        this.cameraControl.update();// update camera controls pp:45
        this.stats.update();//update statistic report

        /**
         * when the scene has baground from the background plane,
         * use
         */
        // and render the scene, renderer shouldn't autoclear, we let the composer steps do that themselves
        // rendering is now done through the composer, which executes the render steps
        this.renderer.autoClear = false;
        this.composer.render(); // from backgroundSetUp()
        /**
         * instead of renderer.render(scene, camera);
         */
        // render using requestAnimationFame
        // renderer.render(scene, camera); // renderer is a global variable


        // set up a render loop.
        /**
         * Note: Your callback routine must itself call requestAnimationFrame() 
         * again if you want to animate another frame at the next repaint. 
         * requestAnimationFrame() is 1 shot.
         */
        requestAnimationFrame(this.render);
    }

    handleResize() 
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Make gui controls using dat.gui
     * @param {Function} controlObject 
     */
    addControlGui(controlObject) 
    {
        this.gui = new dat.GUI();
        this.speed = 0.09;
        this.gui.add(controlObject, 'rotationSpeed', -this.speed, this.speed);
        // gui.addColor(controlObject, 'color');
        // gui.add(controlObject, 'opacity', 0, 1);
    }
}