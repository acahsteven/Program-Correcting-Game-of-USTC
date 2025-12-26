
import { _decorator, AudioClip, AudioSource, Component, director, Node, resources, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('AudioManager')
export class AudioManager extends Component {
    bgmstatus = 1;

    @property ({type:Node})
    private bgmbutton = null;
    @property ({type:AudioClip})
    private clickClip:AudioClip = null;

    private clipSource:AudioSource = null;

    start () {
        this.bgmbutton.active = false;
        director.on("animend",this.show,this);
    }

    show () {
        this.bgmbutton.active = true;
        this.clipSource = this.getComponent(AudioSource);
        resources.load("bgmpausebutton/spriteFrame", SpriteFrame, (err, spriteframe) => {
            this.bgmbutton.getComponent(Sprite).spriteFrame = spriteframe;
        });
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    clicksound () {
        this.clipSource.playOneShot(this.clickClip);
    }

    changebgm () {
        if(this.bgmstatus == 1){
            resources.load("bgmonbutton/spriteFrame", SpriteFrame, (err, spriteframe) => {
                this.bgmbutton.getComponent(Sprite).spriteFrame = spriteframe;
            });
        }
        else{
            resources.load("bgmpausebutton/spriteFrame", SpriteFrame, (err, spriteframe) => {
                this.bgmbutton.getComponent(Sprite).spriteFrame = spriteframe;
            });
        }
        this.bgmstatus ^= 1;
    }
}

