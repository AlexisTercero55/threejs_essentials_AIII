/**
 * Alexis Tercero 
 * github: https://github.com/AlexisTercero55
 * email: alexistercero55@gmail.com
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
    addStatsObject();//# TBI: to be implemented on CG_CORE.CG_SPACE
    
    // add orbit controls for camera
    cameraControl = new THREE.OrbitControls(camera);

    backgroundSetUp();// optional for each scene

    //# BE Aware on when you appendChild to html
    // add graphics to the web page (HTML)
    //# renderer.domElement should be added to any HTMl container like <div>
    document.body.appendChild(renderer.domElement);
}

/**
 * Make gui controls using dat.gui
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
function render() //- For each CG_SCENE.rendering() method
{
    // update scene by controls info
    // ----- Scene1.js
    // renderLoop();
    // ----- Scene2.js
    renderLoop();//- For each CG_SCENE.animationLoop()

    // ----------------------------------------------------------------------
    // Below code is placed on CG_SPACE._render_CG_SPACE() method
    cameraControl.update();// update camera controls pp:45
    
    stats.update();//update statistic report

    //# SWITCH CASE 2
    /**
     * When the scene has baground from the background plane, use
     * 
     *  composer.render()
     * 
     * and render the scene, renderer shouldn't autoclear, 
     * we let the composer steps do that themselves
     * rendering is now done through the composer, which executes the render steps
     */
    renderer.autoClear = false;
    composer.render();
    /**
     * instead of renderer.render(scene, camera);
     */
    // Below code is placed on CG_SPACE._render_CG_SPACE() method
    // renderer.render(scene, camera); // renderer is a global variable
    
    
    // render using requestAnimationFame
    // set up a render loop.
    /**
     * Note: Your callback routine must itself call requestAnimationFrame() 
     * again if you want to animate another frame at the next repaint. 
     * requestAnimationFrame() is 1 shot.
     */
    requestAnimationFrame(render);
}