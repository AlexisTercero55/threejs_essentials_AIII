/**
 * Alexis Tercero 
 * github: https://github.com/AlexisTercero55
 * email: alexistercero55@gmail.com
 * 
 * @description 3D Objects:
 *  Here you can find snippets of code that create 3D objects from funtions.
 * 
 * @issues List of issues:
 * - work with classes instead of functions.
 * - Create a basic 3D object class.
 * - Each 3D object must have {name, geometry, material, mesh}.
 */

/**Class 3D Object
 * @param {string} name
 * @param {THREE.Geometry} geometry
 * @param {THREE.Material} material
 * @param {THREE.Mesh} mesh
 * @constructor
 * @property {string} name
 * @property {THREE.Geometry} geometry
 * @property {THREE.Material} material
 * @property {THREE.Mesh} mesh
 * @property {THREE.Object3D} object
 */
class Object3D 
{
    constructor(name, geometry, material, mesh) 
    {
        this.name = name;
        this.geometry = geometry;
        this.material = material;
        this.mesh = mesh;
        this.object = new THREE.Object3D();
        this.object.add(this.mesh);
    }
}

/** sphere function
 * built a 3D sphere from THREE library
 * and adds it to the scene
 * @param {number} r 
 * @param {number} ws 
 * @param {number} hs 
 * @param {THREE.materialObject} material 
 * @param {string} name 
 * 
 * //# ISSUE:
 * THIS FUNCTION MUST BE A METHOD OF A CLASS CHILD OF THREE.OBJECT3D
 * @returns {THREE.Mesh}
 */
function sphere(r=1, ws=15, hs=15, material, name)
{
    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(r, ws, hs);
    // var sphereMaterial = new THREE.MeshNormalMaterial();
    var sphereMesh = new THREE.Mesh(sphereGeometry, material);
    sphereMesh.name = name;
    /** //# issue
     * make this process to add 3d objects to the scene
     * as an internal process of Scene class
     * method: add
     * @param {THREE.Object3D} object
     * objects[object.name] = object;
     * this.scene.add(objects[name]);
     *  */ 
    scene.add(sphereMesh);
}

/** earth function
 *  set up earth from sphere and clouds
 * 
 * //# ISSUE:
 * THIS FUNCTION MUST BE A METHOD OF A CLASS CHILD OF THREE.OBJECT3D
 * @returns {THREE.Mesh}
 */
function earth()
{
    // create material texture from image
    let texture = 'textures/earthmap4k.jpg';
    let material = materialTexture(texture);
    // create a sphere
    sphere(15,60,60,material, 'earth');
}
 
function clouds()
{
    //# inprogress
}

/** | applyFaceColors | function |
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
            result.push(new THREE.MeshBasicMaterial
                        ({
                            color: Math.random()*0xFFFFFF,
                            transparent:true, 
                            opacity:0.6
                        })
            );
    });

    return result;
}

/** Cube function
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
    
    /** @type {THREE.Material}
     * Next two line are used to add different colors to each face
     * of any geometry.
     */
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
    color: 0xaf5300
    });

    // var material = new THREE.MeshNormalMaterial(planeGeometry);

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
    vertices.forEach(function (vertex) 
    {
        var vertexSphere = new THREE.SphereGeometry(0.15);
        var vertexMesh = new THREE.Mesh(vertexSphere, vertexMaterial);
        vertexMesh.position = vertex;
        scene.add(vertexMesh);
    });
}