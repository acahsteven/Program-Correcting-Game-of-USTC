
import { _decorator, Canvas, Component, Node } from 'cc';
import { Globaldata } from './data';
const { ccclass, property } = _decorator;


 
@ccclass('browser_control')
export class browser_control extends Component {

    start () {
        if(this.node.name == "problembar"){
            this.node.on(Node.EventType.MOUSE_DOWN,()=>{return;},this);
            this.node.on(Node.EventType.MOUSE_WHEEL,()=>{return;},this);
            this.node.on(Node.EventType.MOUSE_UP,()=>{return;},this);
        }
    }


    large () {
        if(Globaldata.gamestateNumber == 0)return;
        this.node.getChildByName("problembar").active = true;
    }

    esc () {
        this.node.active = false;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
