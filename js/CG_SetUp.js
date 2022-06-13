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
    // add controls
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