
import { _decorator, Component, EventMouse, Node, director, Tween, tween,Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('AIicon_drag')
export class AIicon_drag extends Component {
    private flag = 0;
    private iconTween: Tween<Node> = null;

    @property ({type:Node})
    private AIiconNode:Node = null;

    start () {
        this.node.on(Node.EventType.MOUSE_DOWN,this.touch,this);
        this.node.on(Node.EventType.MOUSE_UP,this.click,this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    
    touch (event: EventMouse) {
        if(this.flag != 0) return;
        this.flag = 1;
        this.node.on(Node.EventType.MOUSE_MOVE,this.drag,this);
        this.node.on(Node.EventType.MOUSE_LEAVE,this.out,this);
    }

    drag (event: EventMouse) {
        this.flag = 2;
        let cur_x: number = event.getUILocationX()-640-290;
        let new_x: number = (cur_x>320)?320:((cur_x<-320)?-320:cur_x)
        let cur_y: number = event.getUILocationY()-360;
        let new_y: number = (cur_y>290)?290:((cur_y<-330)?-330:cur_y)
        this.iconTween = tween(this.AIiconNode)
            .to(0.01,{ position: new Vec3(new_x,new_y,0)})
            .call(() => {console.log(this.AIiconNode.position);console.log(event.getUILocation())})
            .start();
    }

    click () {
        if(this.flag == 1){
            director.emit('click2');
        }
        this.node.off(Node.EventType.MOUSE_MOVE,this.drag,this);
        this.node.off(Node.EventType.MOUSE_LEAVE,this.out,this);
        this.flag = 0;
    }

    out () {
        if(this.flag != 2)return;
        this.node.off(Node.EventType.MOUSE_MOVE,this.drag,this);
        this.node.off(Node.EventType.MOUSE_LEAVE,this.out,this);
        this.flag = 0;
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
