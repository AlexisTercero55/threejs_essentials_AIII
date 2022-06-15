/**
 * @author Alexis Tercero
 * @email alexistercero55@gmail.com
 * @github AlexisTercero55
 */

/** Material texture | MeshPhongMaterial
 * @implentation : texture material creation.
 * 
 * @param {String} file 
 * @param {boolean} transparent 
 * 
 * @returns {THREE.MeshBasicMaterial} material
 */
function materialTexture(file, isTransparent=false)
{
    // 4096 is the maximum width for maps
    let Texture = THREE.ImageUtils.loadTexture(file);

    // MeshBasicMaterial doesn't react to light sources
    // let Material = new THREE.MeshBasicMaterial();

    // MeshPhongMaterial
    // This material reacts to light sources pp:48
    let Material = new THREE.MeshPhongMaterial();

    Material.map = Texture;
    Material.transparent = isTransparent;

    return Material;
}

/** Earth material | texture & normal map
 * 
 */
function createEarthMaterial() 
{
    // create material texture from image
    let texture = 'textures/earthmap4k.jpg'; //UWU IMG LOADER IS WORKING WELL
    let earthMaterial = materialTexture(texture);

    texture =  "textures/earth_normalmap_flat4k.jpg";
    var normalMap = THREE.ImageUtils.loadTexture(texture);

    earthMaterial.normalMap = normalMap;
    earthMaterial.normalScale = new THREE.Vector2(0.5, 0.7);

    return earthMaterial;   // return the material texture with normal map
}