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

    // specular map for lighting management pp 56
    texture = "textures/earthspec4k.jpg"
    let specularMap = THREE.ImageUtils.loadTexture(texture);
    earthMaterial.specularMap = specularMap;
    earthMaterial.specular = new THREE.Color(0x262626);

    // normal map for relief management
    texture =  "textures/earth_normalmap_flat4k.jpg";
    let normalMap = THREE.ImageUtils.loadTexture(texture);

    earthMaterial.normalMap = normalMap;
    /** //# Issue: add this to notes as material.properties.anyname = value;
     * pp #55
     * You can play around with how
     * large the effect of this normal map is by using the normalScale property, where the
     * first property defines scaling along the x axis and the second one along the y axis.
     */
    // earthMaterial.normalScale = new THREE.Vector2(0.5, 0.7);

    return earthMaterial;   // return the material texture with normal map
}