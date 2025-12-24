
import { _decorator, AudioClip, Component, instantiate, Label, Node, Prefab, Vec3, EventMouse, director, resources, JsonAsset, error, UITransform, Size } from 'cc';
import { constData, Globaldata } from './data';
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
    jsonData:constData = null;
    curLevel:number = null;
    dialogues:[number,string[]][] = null;
    totalperiod: number =null;
    names:string[] = null;

    dialogsArray:string[] = null;
    loglenNumber:number = null;
    totallog:number = 0;
    logdownpointer:number = -20;

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
    @property ({type:Node})
    private rollNode:Node = null;

    onLoad () {
        this.curLevel = Globaldata.curlevelsNumber;
        // resources.load(`data/level${this.curLevel}`, (err: any, res: JsonAsset) => {
        //     if (err) {
        //         error(err.message || err);
        //         console.log('error');
        //         return;
        //     }
        //     this.jsonData = res.json as constData;
        // })
        console.log('onLoad');
        this.jsonData = Globaldata.jsonData;
        this.dialogues = this.jsonData.dialoguesArray;
        this.names = this.jsonData.namesArray;
        this.totalperiod = this.jsonData.totalperiodNumber;
    }

    start () {
        this.dialogLoad();
        console.log('start start');
        director.on('animation_finish',this.dialogLoad,this);
        this.rollNode.on(Node.EventType.MOUSE_WHEEL,this.roll,this);
        director.on('resumelog',this.dialogLoad,this);
        console.log('start end');
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    async dialogLoad () {
        if(this.jsonData == null){
            console.log('null!');
            return;
        }
        Globaldata.gamestateNumber = 0;
        this.dialogsArray = this.dialogues[Globaldata.gameperiodNumber][1];
        this.loglenNumber = this.dialogues[Globaldata.gameperiodNumber][0];
        await this.animation(this.loglenNumber);
        Globaldata.gamestateNumber = 3;
        if(Globaldata.gameperiodNumber == 0){
            director.off('animation_finish',this.dialogLoad,this);
            director.emit('dialogues_finished_base');
            console.log("firstlog finished")
        }
        else if(Globaldata.gameperiodNumber == this.totalperiod-1){
            director.emit('end_codearea');//待改
        }
        else{
            //console.log(Globaldata.gameperiodNumber,Globaldata.totalperiodNumber[Globaldata.curlevelsNumber])
            director.emit('next_codearea');
            director.emit('hide_answerarea');
        }
    }

    async animation(n:number){
        let flag:boolean = false;
        this.node.parent.getChildByName("rollarea").on(Node.EventType.MOUSE_DOWN,() => {flag = true},this);
        for(let i=0;i<n;i++){
            this.dialogLoadOnce(i);
            for(let j=0;j<10;j++){
                if(flag == false)await this.sleep(0.1);//按需调整
                else{
                    this.node.parent.getChildByName("rollarea").off(Node.EventType.MOUSE_DOWN,() => {flag = true},this);
                }
            }
        }
        if(flag)console.log("log:\tjump succeed");
    }

    sleep(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, duration);
        });
    }

    dialogLoadOnce (i:number){//
        //console.log(`load${i}`);
        let dialogNode = null;
        let nameindex = <number><any>this.dialogsArray[i].slice(0,1);
        let x:number,y:number;
        //console.log(nameindex);
        if(nameindex == 0){
            dialogNode = instantiate(this.dialogTAPrefab);
            x = 145;
        }
        else{
            dialogNode = instantiate(this.dialogSTPrefab);
            x = -145
        }
        this.dialogsNode.addChild(dialogNode);
        dialogNode.getChildByName("name").getComponent(Label).string = this.names[nameindex];
        dialogNode.getChildByName("textarea").getChildByName("text").getComponent(Label).string = this.dialogsArray[i].slice(2);
        dialogNode.getChildByName("textarea").getChildByName("text").getComponent(Label).updateRenderData(true);
        let logheight:number = <number><any>dialogNode.getChildByName("textarea").getChildByName("text").getComponent(UITransform).height;
        y = this.logdownpointer-20;
        dialogNode.setPosition(x,y,0);
        if(logheight>40){
            let sizea:Size = new Size(290,logheight+50);
            let sizeb:Size = new Size(200,logheight+10);
            dialogNode.getChildByName("textarea").getComponent(UITransform).setContentSize(sizeb);
            dialogNode.getComponent(UITransform).setContentSize(sizea);
            let x=dialogNode.getChildByName("downpart").position.x;
            dialogNode.getChildByName("downpart").position = new Vec3(x,-90-(logheight-30),0);
            this.logdownpointer-=110+logheight;
        }
        else{
            this.logdownpointer-=140;
        }
        if(this.logdownpointer+this.dialogsNode.getComponent(UITransform).height<0){
            let new_x = this.dialogsNode.position.x;
            let new_y = 360-this.logdownpointer-this.dialogsNode.getComponent(UITransform).height;
            
            this.dialogsNode.position = new Vec3(new_x,new_y,0);
            console.log(new_y,this.dialogsNode.position);
        }
        this.totallog+=1;
    }

    roll (event: EventMouse) {
        if(Globaldata.gamestateNumber == 0||Globaldata.gamestateNumber == 2)return;
        //console.log(this.dialogsNode.position);
        let abs: number = event.getScrollY();
        let flag: number;
        if (abs > 0) {
            flag = 1;
        }
        else {
            flag = -1;
            if(this.dialogsNode.position.y <= 360) return;//幻数待绑定
        }
        let new_pos = this.dialogsNode.position;
        let new_y = new_pos.y+flag*20;
        if(new_y+this.logdownpointer >= 360-this.dialogsNode.getComponent(UITransform).height)new_y = 360-this.logdownpointer-this.dialogsNode.getComponent(UITransform).height;
        if(new_y <= 360)new_y = 360;
        new_pos = new Vec3(new_pos.x,new_y,new_pos.z); 
        this.dialogsNode.setPosition(new_pos);
    }
    
    back () {
        if(Globaldata.gamestateNumber == 0||Globaldata.gamestateNumber == 2)return;
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
