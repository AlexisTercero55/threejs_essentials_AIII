/** materialTexture
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

    let Material = new THREE.MeshBasicMaterial();
    Material.map = Texture;
    Material.transparent = isTransparent;

    return Material;
}