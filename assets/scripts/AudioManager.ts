
import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('AudioManager')
export class AudioManager extends Component {
    // [1]
    // dummy = '';

    @property ({type:AudioClip})
    private clickClip:AudioClip = null;

    private clipSource:AudioSource = null;

    start () {
        this.clipSource = this.getComponent(AudioSource);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    clicksound () {
        this.clipSource.playOneShot(this.clickClip);
    }
}

