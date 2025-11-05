
import { _decorator, AudioClip, Component, instantiate, Label, Node, Prefab, Vec3, EventMouse, director } from 'cc';
import { Globaldata } from './data';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = logarea
 * DateTime = Wed Nov 05 2025 16:21:21 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = logarea.ts
 * FileBasenameNoExtension = logarea
 * URL = db://assets/scripts/logarea.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('logarea')
export class logarea extends Component {
    count:number = 1;
    cur_lvlNumber:number = null;
    dialogsArray:string[] = null;
    loglenNumber:number = null;

    @property ({type:Node})
    private logareaNode:Node = null;
    @property ({type:Node})
    private dialogsNode:Node = null;
    @property ({type:AudioClip})
    private textClip:AudioClip = null;
    @property ({type:Prefab})
    private dialogSTPrefab:Prefab = null;
    @property ({type:Prefab})
    private dialogTAPrefab:Prefab = null;
    @property ({type:Node})
    private smalliconNode:Node = null;

    start () {
        this.cur_lvlNumber = Globaldata.curlevelsNumber;
        this.dialogsArray = Globaldata.dialoguesArray[this.cur_lvlNumber];
        this.loglenNumber = <number><any>this.dialogsArray[0];
        this.dialogLoad();
        this.node.on(Node.EventType.MOUSE_WHEEL,this.roll,this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    async dialogLoad () {
        for(let i=1;i<=this.loglenNumber;i++){
            await this.sleep(0.1);//按需调整
            this.dialogLoadOnce(i);
        }
        Globaldata.gamestateNumber = 1;
        director.emit('dialogues_finished');
    }

    sleep(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, duration);
        });
    }

    dialogLoadOnce (i:number){
        //console.log(`load${i}`);
        let dialogNode = null;
        let nameindex = <number><any>this.dialogsArray[i].slice(0,1);
        //console.log(nameindex);
        if(nameindex == 0){
            dialogNode = instantiate(this.dialogTAPrefab);
            dialogNode.setPosition(145,300-100*i,0);
        }
        else{
            dialogNode = instantiate(this.dialogSTPrefab);
            dialogNode.setPosition(-145,300-100*i,0);
        }
        this.dialogsNode.addChild(dialogNode);
        console.log(`log${i}:${dialogNode.position}`)
        dialogNode.getChildByName("name").getComponent(Label).string = Globaldata.namesArray[nameindex];
        dialogNode.getChildByName("textarea").getChildByName("text").getComponent(Label).string = this.dialogsArray[i].slice(2);
        if(i>=6){
            let new_x = this.dialogsNode.position.x;
            let new_y = this.dialogsNode.position.y+100;
            this.dialogsNode.position = new Vec3(new_x,new_y,0);
        }
        this.count+=1;
    }

    roll (event: EventMouse) {
        let abs: number = event.getScrollY();
        let flag: number;
        if (abs > 0) {
            flag = 1;
            if(this.dialogsNode.position.y >= 110+100*(this.loglenNumber-5)) return;//幻数待绑定
        }
        else {
            flag = -1;
            if(this.dialogsNode.position.y<=110) return;//幻数待绑定
        }
        let new_pos = this.dialogsNode.position;
        let new_y = new_pos.y+flag*100;
        new_pos = new Vec3(new_pos.x,new_y,new_pos.z); 
        this.dialogsNode.setPosition(new_pos);
    }
    
    back () {
        if(Globaldata.gamestateNumber == 0)return;
        this.logareaNode.active = false;
        this.smalliconNode.active = true;
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
