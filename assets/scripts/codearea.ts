
import { _decorator, Component, director, EventMouse, Node, Vec3, Label, Color, instantiate, Prefab, EventTarget, JsonAsset, resources, error, Animation} from 'cc';
import { Globaldata,constData } from './data';
const { ccclass, property } = _decorator;
const eventTarget = new EventTarget();
 
@ccclass('codearea')
export class codearea extends Component {
    jsonData:constData = null;
    fileName:string[] = null;
    orgText:string[][] = null;
    alterText:string[][] = null;
    lines:number[] = null;
    changeableArray: boolean[][] = null;
    answer: number[][] = null;
    curLevel: number = 0;
    errorInformation:[number,string][] = null;

    line: number = 5;
    AI_assist:number = 1;

    changeableLines: boolean[];

    answerArray: number[];

    statArray: number[] = new Array;

    textArray: string[][];

    @property ({type:Node})
    private areaNode = null;
    @property ({type:Node})
    private codelinesNode = null;
    @property ({type:Node})
    private smalliconNode = null;
    @property ({type:Prefab})
    private codePrefab:Prefab = null;
    @property ({type:Node})
    private finishNode:Node = null;
    @property ({type:Label})
    private filenameLabel:Label = null;
    @property ({type:JsonAsset})
    private dataJson:JsonAsset = null!;
    @property ({type:Node})
    private runstatusNode:Node = null;
    @property ({type:Node})
    private AINode:Node = null;
    @property ({type:Label})
    private errorinfNode:Node = null;

    onLoad () {
        
        // resources.load(`data/level${this.curLevel}`, (err: any, res: JsonAsset) => {
        //     if (err) {
        //         error(err.message || err);
        //         return;
        //     }
        //     this.jsonData = res.json as constData;
        // })
        this.curLevel = Globaldata.curlevelsNumber;
        this.jsonData = Globaldata.jsonData;
        console.log("onload");
        console.log("start start");
        this.fileName = this.jsonData.filenameString;
        this.orgText = this.jsonData.orgtextString;
        this.alterText = this.jsonData.altertextString;
        this.lines = this.jsonData.linesNumber;
        this.changeableArray =this.jsonData.changeableArray;
        this.answer = this.jsonData.answerArray;
        this.finishNode.active = false;

        this.initialize();

        this.node.on(Node.EventType.MOUSE_WHEEL,this.roll,this);
        director.on('click',this.clickJudge,this);
        director.on('click2',this.AIcheck,this);
        director.on('next_codearea',this.next,this);
        director.on('end_codearea',this.end,this);//待改

        console.log('start end');
    }

    start () {
        
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    initialize () {
        console.log('initialize start');
        this.runstatusNode.active = false;
        this.codelinesNode.active = true;
        this.AINode.active = true;
        this.filenameLabel.string = this.fileName[Globaldata.gameperiodNumber];
        this.textArray = [this.orgText[Globaldata.gameperiodNumber],this.alterText[Globaldata.gameperiodNumber]];
        this.line = this.lines[Globaldata.gameperiodNumber];
        this.changeableLines = this.changeableArray[Globaldata.gameperiodNumber];
        this.answerArray = this.answer[Globaldata.gameperiodNumber];
        this.errorInformation = this.jsonData.errorinformationString[Globaldata.gameperiodNumber];
        let cur_y=300;
        for(let i=0;i<this.line;i++){
            let codeline = instantiate(this.codePrefab);
            codeline.name = `codeline${i+1}`;
            this.codelinesNode.addChild(codeline);
            codeline.getComponent(Label).string = ` ${i+1}    `+this.textArray[0][i];
            let pos = new Vec3(0,cur_y-40*i,0);
            codeline.position = pos;
            this.statArray.push(0);
        }
        //console.log(this.codelinesNode);
    }
    roll (event: EventMouse) {
        if(Globaldata.gamestateNumber <= 2)return;
        let abs: number = event.getScrollY();
        let flag: number;
        if (abs < 0) {
            flag = 1;
            if(this.codelinesNode.position.y >= 40*(this.line-17)) return;
        }
        else {
            flag = -1;
            if(this.codelinesNode.position.y<=0) return;
        }
        let new_pos = this.codelinesNode.position;
        let new_y = new_pos.y+flag*40;
        new_pos = new Vec3(new_pos.x,new_y,new_pos.z); 
        this.codelinesNode.setPosition(new_pos);
    }

    run () {
        if(Globaldata.gamestateNumber <= 2)return;
        console.log("run start");
        let ac:number = 0;
        for(let i = 0;i<this.line;i++){
            if(this.changeableLines[i] == true && this.answerArray[i]!=-1)ac = ac*2+this.statArray[i]^this.answerArray[i];//压缩状态
        }
        this.animation(ac);
    }

    clickJudge (name: string) {
        if(Globaldata.gamestateNumber <= 2)return;
        let children = this.codelinesNode.children;
        children.forEach(childNode => {
            if(childNode.name == name){
                let index: number = Number(name.slice(8)) - 1;
                let stat = this.statArray[index];
                if(this.changeableLines[index] == true){
                    // console.log(this.textArray);
                    // console.log(this.textArray[stat^1]);
                    // console.log(this.textArray[stat^1][index]);
                    childNode.getComponent(Label).string = ` ${childNode.name.slice(8)}    `+this.textArray[stat^1][index];
                    this.statArray[index] = stat^1;
                    if(this.AI_assist == 2){
                        if(this.statArray[index] == this.answerArray[index] || this.answerArray[index] == -1){
                            childNode.getComponent(Label).color = new Color(0,255,0,255);
                        }
                        else{
                            childNode.getComponent(Label).color = new Color(255,0,0,255);
                        }
                    }
                }
            }
        });
    }

    back () {
        if(Globaldata.gamestateNumber <= 2)return;
        this.areaNode.active = false;
        this.smalliconNode.active = true;
    }

    AIcheck (event: EventMouse) {
        console.log("AIcheck "+`${Globaldata.gamestateNumber}`);
        if(Globaldata.gamestateNumber <= 2)return;
        let stat = event.getButton();
        console.log(stat);
        let children = this.codelinesNode.children;
        if(stat == 0||stat == 2){
            if(this.AI_assist == stat)this.AI_assist = 1;
            else this.AI_assist = stat;
            children.forEach(childNode => {
                let index: number = <number> <unknown>childNode.name.slice(8) - 1;
                if(this.changeableLines[index] == true){
                    if(this.AI_assist == 1){childNode.getComponent(Label).color = new Color(0,0,0,255);}
                    else if(stat == 0){
                        childNode.getComponent(Label).color = new Color(0,0,255,255);
                    }
                    else{
                        if(this.statArray[index] == this.answerArray[index] || this.answerArray[index] == -1){
                            childNode.getComponent(Label).color = new Color(0,255,0,255);
                        }
                        else{
                            childNode.getComponent(Label).color = new Color(255,0,0,255);
                        }
                    }
                }
            });
        }
    }

    next () {
        for(let child of this.codelinesNode.children){
            child.destroy();
        }
        this.codelinesNode.setPosition(new Vec3(0,0,0));
        this.statArray = [];
        this.initialize();
    }

    end () {
        Globaldata.gamestateNumber = 0;
        this.finishNode.active = true;
    }

    async animation (ac: number) {
        this.runstatusNode.active = true;
        this.codelinesNode.active = false;
        this.AINode.active = false;
        this.errorinfNode.getComponent(Label).string = null;
        let ani = this.runstatusNode.getChildByName("Ani").getComponent(Animation);
        let err:string;
        let ind:number;//0 AC,1 CE,2 part WA,3 ALL WA,4 RE,5 TLE,6 MLE
        console.log(ac);
        err = this.errorInformation[ac][1];
        ind = this.errorInformation[ac][0];
        console.log(ani.clips[ind],ind,ac);
        let pre_sta:number = Globaldata.gamestateNumber;
        Globaldata.gamestateNumber = 1;
        ani.play(`runstatus${ind+1}`);
        await this.sleep(ani.clips[ind].duration/ani.clips[ind].speed);//speed测试完记得改回去#
        if(ac == 0){
            Globaldata.gameperiodNumber++;
            director.emit('resume');
        }
        else{
            console.log(this.errorInformation);
            if(err != null)this.errorinfNode.getComponent(Label).string = err;
            this.runstatusNode.on(Node.EventType.MOUSE_DOWN,this.back_to_codelines,this);
            Globaldata.gamestateNumber = pre_sta;
        }
        //console.log("AC");
    }

    back_to_codelines () {
        this.runstatusNode.off(Node.EventType.MOUSE_DOWN,this.back_to_codelines,this);
        this.errorinfNode.getComponent(Label).string = null;
        this.runstatusNode.active = false;
        this.codelinesNode.active = true;
        this.AINode.active = true;
    }

    sleep(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, duration);
        });
    }
}