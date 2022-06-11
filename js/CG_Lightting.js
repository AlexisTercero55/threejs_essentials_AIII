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