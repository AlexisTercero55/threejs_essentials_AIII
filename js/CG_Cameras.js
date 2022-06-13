/**
 * using ortographic camera to set up scene background.
 */
function camBG()
{
    cameraBG = new THREE.OrthographicCamera
                    (
                        -window.innerWidth, //left This property defines the border for the leftmost position to be rendered
                        window.innerWidth, //right This property defines the border for the rightmost position to be rendered.
                        window.innerHeight, //top This property defines the border for the topmost position to be rendered
                        -window.innerHeight,// bottom This property defines the border for the bottommost position to be rendered
                        -10000, //near This property defines the point, based on the position of the camera, from where the scene will be rendered.
                        10000 //far This property defines the point, based on the position of the camera, to which the scene will be rendered.
                    );
    cameraBG.position.z = 50;
}