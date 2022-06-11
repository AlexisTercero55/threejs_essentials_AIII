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
    addStatsObject();
    // add controls
    cameraControl = new THREE.OrbitControls(camera);

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
    gui.addColor(controlObject, 'color');
    gui.add(controlObject, 'opacity', 0, 1);
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
    renderLoop();
    // ----- Scene2.js
    // scene.getObjectByName('earth').rotation.y+=control.rotationSpeed;

    // ----------------------------------------------------------------------
    cameraControl.update();// update camera contros
    stats.update();//update statistic report

    // render using requestAnimationFame
    renderer.render(scene, camera); // renderer is a global variable
    // set up a render loop.
    requestAnimationFrame(render);
}