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
    camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000);
    // render settings (drawing)
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // enable shadows rendering
    renderer.shadowMapEnabled = true;
}

/**
 * Make gui contros using dat.gui
 * @param {object} controlObject 
 */
 function addControlGui(controlObject) 
 {
    var gui = new dat.GUI();
    let speed = 0.01;
    gui.add(controlObject, 'rotationSpeed', -speed, speed);
    //  gui.add(controlObject, 'opacity', 0.1, 1);
    //  gui.addColor(controlObject, 'color');
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
    // animation: rotate camera around the scene (xz circle)
    // var rotSpeed = control.rotationSpeed;//by controls info
    // camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
    // camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
    // camera.lookAt(scene.position);
    // scene.getObjectByName('cube').material.opacity = control.opacity;
    // scene.getObjectByName('cube').material.color = new THREE.Color(control.color);

    // ----- Scene2.js
    scene.getObjectByName('earth').rotation.y+=control.rotationSpeed;

    cameraControl.update();// update camera contros

    stats.update();//update statistic report

    // render using requestAnimationFame
    renderer.render(scene, camera);
    // set up a render loop.
    requestAnimationFrame(render);
}