
import { _decorator, Component, director, EventMouse, Node, Vec3, Label, Color, instantiate, Prefab, EventTarget} from 'cc';
import { Globaldata } from './data';
const { ccclass, property } = _decorator;
const eventTarget = new EventTarget();
 
@ccclass('codearea')
export class codearea extends Component {

    curlevelNumber: number = 0;
    lines: number = 5;
    AI_assist:number = 0;

    changeableArray: boolean[];

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

    onLoad () {
        this.finishNode.active = false;
        this.initialize(Globaldata.curlevelsNumber);
        this.node.on(Node.EventType.MOUSE_WHEEL,this.roll,this);
        director.on('click',this.clickJudge,this);
        director.on('click2',this.AIcheck,this);
        director.on('next_codearea',this.next,this);
        director.on('end_codearea',this.end,this);//待改
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    initialize (cur_l) {
        this.curlevelNumber = cur_l;
        // console.log('initialize start');
        // console.log(cur_l);
        this.filenameLabel.string = Globaldata.filenameString[cur_l][Globaldata.gameperiodNumber];
        this.textArray = [Globaldata.orgtextString[cur_l][Globaldata.gameperiodNumber],Globaldata.altertextString[cur_l][Globaldata.gameperiodNumber]];
        this.lines = Globaldata.linesNumber[cur_l][Globaldata.gamestateNumber];
        this.changeableArray = Globaldata.changeableArray[cur_l][Globaldata.gameperiodNumber];
        this.answerArray = Globaldata.answerArray[cur_l][Globaldata.gameperiodNumber];
        let cur_y=300;
        for(let i=0;i<this.lines;i++){
            let codeline = instantiate(this.codePrefab);
            codeline.name = `codeline${i+1}`;
            this.codelinesNode.addChild(codeline);
            codeline.getComponent(Label).string = this.textArray[0][i];
            let pos = new Vec3(0,cur_y-40*i,0);
            codeline.position = pos;
            this.statArray.push(0);
        }
        //console.log(this.codelinesNode);
    }
    roll (event: EventMouse) {
        if(Globaldata.gamestateNumber == 0)return;
        let abs: number = event.getScrollY();
        let flag: number;
        if (abs < 0) {
            flag = 1;
            if(this.codelinesNode.position.y >= 40*(this.lines-17)) return;
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
        if(Globaldata.gamestateNumber == 0)return;
        console.log("run start");
        let ac = true;
        for(let i = 0;i<this.lines;i++){
            if(this.statArray[i]!=this.answerArray[i])ac = false;
        }
        if(ac){
            //this.finishNode.active = true;
            Globaldata.gameperiodNumber++;
            director.emit('resume');
            //console.log("AC");
        }
        else{
            //console.log("WA");
        }
    }

    clickJudge (name: string) {
        if(Globaldata.gamestateNumber == 0)return;
        let children = this.codelinesNode.children;
        children.forEach(childNode => {
            if(childNode.name == name){
                let index: number = <number> <unknown>name.slice(8) - 1;
                let stat = this.statArray[index];
                if(this.changeableArray[index] == true){
                    // console.log(this.textArray);
                    // console.log(this.textArray[stat^1]);
                    // console.log(this.textArray[stat^1][index]);
                    childNode.getComponent(Label).string = this.textArray[stat^1][index];
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
        if(Globaldata.gamestateNumber == 0)return;
        this.areaNode.active = false;
        this.smalliconNode.active = true;
    }

    AIcheck () {
        if(Globaldata.gamestateNumber == 0)return;
        if(this.AI_assist == 0){
            let children = this.codelinesNode.children;
            children.forEach(childNode => {
                let index: number = <number> <unknown>childNode.name.slice(8) - 1;
                if(this.changeableArray[index] == true){
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
                if(this.changeableArray[index-1] == true){
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
        this.initialize(Globaldata.curlevelsNumber);
    }

    end () {
        Globaldata.gamestateNumber = 0;
        this.finishNode.active = true;
    }
}