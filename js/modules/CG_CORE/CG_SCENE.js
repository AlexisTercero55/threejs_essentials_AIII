import {CG_BACKGROUND_SPACE} from './CG_BACKGROUND_SPACE.js';

class CG_SCENE extends CG_BACKGROUND_SPACE
{
    rendering()
    {
        this.animationLoop();
        this._render_CG_BACKGROUND_SPACE();


        requestAnimationFrame(this.rendering);
    }

    animationLoop()
    {

    }
}