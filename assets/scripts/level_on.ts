
import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = level_on
 * DateTime = Fri Oct 31 2025 10:29:47 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = level_on.ts
 * FileBasenameNoExtension = level_on
 * URL = db://assets/scripts/level_on.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('level_on')
export class level_on extends Component {
    // [1]
    // dummy = '';

    @property ({type:Node})
    private levelNode:Node = null;

    start () {
        this.node.on(Node.EventType.MOUSE_ENTER,this.onIn,this);
    }

    onIn () {
        director.emit('show',this.node.name);
        this.node.off(Node.EventType.MOUSE_ENTER,this.onIn,this);
        this.node.on(Node.EventType.MOUSE_LEAVE,this.onOut,this);
    }

    onOut () {
        director.emit('hide');
        this.node.off(Node.EventType.MOUSE_LEAVE,this.onOut,this);
        this.node.on(Node.EventType.MOUSE_ENTER,this.onIn,this);
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
