
import { _decorator, Component, director, Node } from 'cc';
import { game_start } from './game_start';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = base
 * DateTime = Mon Nov 03 2025 17:00:56 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = base.ts
 * FileBasenameNoExtension = base
 * URL = db://assets/scripts/base.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('base')
export class base extends Component {
    

    @property ({type:Node})
    private smallicon1Node = null;

    @property ({type:Node})
    private smallicon2Node = null;

    @property ({type:Node})
    private codeareaNode = null;

    @property ({type:Node})
    private logareaNode = null;

    start () {
        this.codeareaNode.active = false;
        this.smallicon1Node.active = false;
        this.smallicon2Node.active = false;
        director.on('dialogues_finished_base',this.show,this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    large1 () {
        this.smallicon1Node.active = false;
        this.codeareaNode.active = true;
    }

    large2 () {
        this.smallicon2Node.active = false;
        this.logareaNode.active = true;
    }

    show () {
        this.codeareaNode.active = true;
        director.off('dialogues_finished',this.show,this);
    }
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
