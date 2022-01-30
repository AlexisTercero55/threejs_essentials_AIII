/**
 * Alexis Tercero 
 * github: https://github.com/AlexisTercero55
 * email: alexistercero55@gmail.com
 */


function sphere1()
{
    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(15, 30, 30);
    var sphereMaterial = new THREE.MeshNormalMaterial();
    var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'earth';
    scene.add(earthMesh);
}
 

/**
 * Applies coloring to each individual face and updates the geometry so
 * the materialIndex points to the correct face
 *
 * @param geometry the geometry to create facecolor for
 * @return an array of materials
 */
function applyFaceColors(geometry) 
{
    var result = [];

    var faceCount = 0;
    geometry.faces.forEach(function(face) 
    {
            face.materialIndex = faceCount++;
            result.push(new THREE.MeshBasicMaterial({
                color: Math.random()*0xFFFFFF,
                transparent:true, 
                opacity:0.6
            }));
        });

    return result;
}

/**
 * set up simple box mesh (geometry and material)
 * @returns {THREE.Mesh}
 */
function cube1()
{
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0x00ff4a, 
        transparent:true, 
        opacity:0.6
    });
    // var materialArray = applyFaceColors(cubeGeometry);
    // var cubeMaterial = new THREE.MeshFaceMaterial(materialArray);
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name='cube';
    // activate the shadows (emit shadows)
    cube.castShadow = true;
    scene.add(cube);
    return cube;
}

function plane1()
{
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // activate the shadows (recieve shadows)
    plane.receiveShadow = true;
    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -2;
    plane.position.z = 0;
    scene.add(plane);
}

/**
 * Add small spheres on each of the vertices of the supplied mesh.
 * @param {THREE.Mesh} mesh
 */
function addVertices(mesh) 
{
    var vertices = mesh.geometry.vertices;
    var vertexMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});

    // for each vertex, add a sphere
    vertices.forEach(function (vertex) {
        var vertexSphere = new THREE.SphereGeometry(0.15);
        var vertexMesh = new THREE.Mesh(vertexSphere, vertexMaterial);
        vertexMesh.position = vertex;
        scene.add(vertexMesh);
    });
}