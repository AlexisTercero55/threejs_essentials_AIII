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

function render() 
{
    // animation: rotate camera around the scene (xz circle)
    var rotSpeed = control.rotationSpeed;//by controls info
    camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
    camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);

    // update scene by controls info
    scene.getObjectByName('cube').material.opacity = control.opacity;
    scene.getObjectByName('cube').material.color = new THREE.Color(control.color);

    stats.update();//update statistic report

    // render using requestAnimationFame
    renderer.render(scene, camera);
    // set up a render loop.
    requestAnimationFrame(render);
}