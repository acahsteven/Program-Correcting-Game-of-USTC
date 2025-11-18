
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

    line: number = 5;
    AI_assist:number = 0;

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

    onLoad () {
        this.curLevel = Globaldata.curlevelsNumber;
        resources.load(`data/level${this.curLevel}`, (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            this.jsonData = res.json as constData;
        })
    }

    start () {
        console.log(this.jsonData);
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
        Globaldata.gamestateNumber = 3;
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
        console.log(this);
        if(Globaldata.gamestateNumber <= 2)return;
        console.log("run start");
        let ac = true;
        for(let i = 0;i<this.line;i++){
            if(this.statArray[i]!=this.answerArray[i]) ac = false;
        }
        if(ac){
            //this.finishNode.active = true;
            this.animation();
        }
        else{
            console.log("WA");
        }
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
                    if(this.AI_assist == 1){
                        if(this.statArray[index] == this.answerArray[index]){
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

    AIcheck () {
        if(Globaldata.gamestateNumber <= 2)return;
        if(this.AI_assist == 0){
            let children = this.codelinesNode.children;
            children.forEach(childNode => {
                let index: number = <number> <unknown>childNode.name.slice(8) - 1;
                if(this.changeableLines[index] == true){
                    if(this.statArray[index] == this.answerArray[index]){
                        childNode.getComponent(Label).color = new Color(0,255,0,255);
                    }
                    else{
                        childNode.getComponent(Label).color = new Color(255,0,0,255);
                    }
                }
            });
        }
        else{
            let children = this.codelinesNode.children;
            children.forEach(childNode => {
                let index: number = <number> <unknown>childNode.name.slice(8);
                if(this.changeableLines[index-1] == true){
                    childNode.getComponent(Label).color = new Color(0,0,0,255);
                }
            });
        }
        this.AI_assist = this.AI_assist ^ 1;
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

    async animation () {
        this.runstatusNode.active = true;
        this.codelinesNode.active = false;
        this.AINode.active = false;
        let ani = this.runstatusNode.getChildByName("Ani").getComponent(Animation);
        console.log(ani.clips[0]);
        ani.play();
        await this.sleep(ani.clips[0].duration/ani.clips[0].speed);//speed测试完记得改回去#
        Globaldata.gameperiodNumber++;
        director.emit('resume');
        console.log("AC");
    }

    sleep(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, duration);
        });
    }
}