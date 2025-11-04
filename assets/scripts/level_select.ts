
import { _decorator, Component, director, EventMouse, Node, Label} from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = level_select
 * DateTime = Tue Oct 28 2025 20:27:25 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = level_select.ts
 * FileBasenameNoExtension = level_select
 * URL = db://assets/scripts/level_select.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('level_select')
export class level_select extends Component {
    @property ({type:Node})
    private EscNode: Node = null;

    @property ({type:Node})
    private ContentsNode: Node = null;

    @property ({type:Node})
    private levelsNode: Node = null;

    @property ({type:Label})
    private informationLabel: Label = null;
    start () {
        director.on('show',this.stringShow,this);
    }

    quit () {
        this.ContentsNode.active = false;
    }

    begin ( num:string ) {

    }

    stringShow (name) {
        this.informationLabel.string = name;
        director.off('show',this.stringShow,this);
        director.on('hide',this.stringHide,this);
    }

    stringHide () {
        this.informationLabel.string = null;
        director.off('hide',this.stringHide,this);
        director.on('show',this.stringShow,this);
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
