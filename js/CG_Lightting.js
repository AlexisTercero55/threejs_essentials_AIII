/** DIRECTIONAL LIGHT
 * Add the directional light, 
 * which represents the sun in our case. 
 */
function directionalLight()
{
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position = new THREE.Vector3(100, 10, -50);
    directionalLight.name = 'directional';
    scene.add(directionalLight);
}

/** Ambient light
 * 
 */
function ambientLight()
{
    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
}



/**
 * Set spotlight on the scene.
 */
 function spotLight1()
 {
     var spotLight = new THREE.SpotLight(0xffffff);
     spotLight.position.set(10, 20, 20);
     
     spotLight.shadowCameraNear = 20;
     spotLight.shadowCameraFar = 50;
     
     spotLight.castShadow = true;
     scene.add(spotLight);
 }