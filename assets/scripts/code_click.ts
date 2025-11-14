
import { _decorator, Component, director, Node, Label, EventTarget } from 'cc';
const { ccclass, property } = _decorator;
const eventtarget = new EventTarget();

/**
 * Predefined variables
 * Name = code_click
 * DateTime = Sat Nov 01 2025 11:36:23 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = code_click.ts
 * FileBasenameNoExtension = code_click
 * URL = db://assets/scripts/code_click.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('code_click')
export class code_click extends Component {

    @property ({type:Label})
    private codelineNode: Label = null;

    start () {
        this.node.on(Node.EventType.MOUSE_DOWN,this.onClick,this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClick () {
        director.emit('click',this.node.name);
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
