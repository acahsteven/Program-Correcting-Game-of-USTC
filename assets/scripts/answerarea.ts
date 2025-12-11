
import { _decorator, Component, Node, EventTarget, Label, Toggle, Sprite, Color, director, resources, error, JsonAsset, SpriteFrame } from 'cc';
import { constData, Globaldata } from './data';

const { ccclass, property } = _decorator;
const eventTarget = new EventTarget();
/**
 * Predefined variables
 * Name = answerarea
 * DateTime = Thu Nov 06 2025 17:10:10 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = answerarea.ts
 * FileBasenameNoExtension = answerarea
 * URL = db://assets/scripts/answerarea.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('answerarea')
export class answerarea extends Component {
    checkArray = [0,0,0];
    period = 0;
    choiceArray = null;

    @property ({type:Node})
    answerareaNode:Node = null;
    @property ({type:Node})
    panelNode:Node = null;
    @property ({type:Node})
    enterNode:Node = null;
    @property ({type:SpriteFrame})
    tick:SpriteFrame = null;
    @property ({type:SpriteFrame})
    cross:SpriteFrame = null;

    onLoad () {
        this.enterNode.active = false;
        this.panelNode.active = false;
        // resources.load(`data/level${Globaldata.curlevelsNumber}`, (err: any, res: JsonAsset) => {
        //         if (err) {
        //             console.log('error')
        //             error(err.message || err);
        //             return;
        //     }
        //     const jsonData = res.json as constData;
        //     console.log(jsonData.choiceArray);
        //     this.choiceArray = jsonData.choiceArray;
        // })
        this.choiceArray = Globaldata.jsonData.choiceArray;
    }

    start () {
        console.log('start end');
        director.on('resume',this.next,this);
    }

    next () {
        //console.log(this);
        Globaldata.gamestateNumber = 1;
        this.period = Globaldata.gameperiodNumber-1;
        this.panelNode.active = true;
        this.restore(1);
    }

    checked (event,index) {
        if(Globaldata.gamestateNumber == 0 || Globaldata.gamestateNumber == 2){
            let toggle = this.panelNode.getComponentsInChildren(Toggle);
            let flag = toggle[index].isChecked;
            if(flag == true){
                toggle[index].isChecked = false;
            }
            else toggle[index].isChecked = true;
            return;
        }
        this.checkArray[index] = this.checkArray[index]^1;
        for(let i=0;i<3;i++){
            let c:string = String.fromCharCode(65+i);
            //console.log(this.checkArray,index);
            this.panelNode.getChildByName("Toggle "+c).getChildByName('result').getComponent(Sprite).spriteFrame = null;
        }
        if(this.checkArray[0]+this.checkArray[1]+this.checkArray[2] == 1)this.enterNode.active = true;
        else this.enterNode.active = false;
    }

    entered () {
        for(let i=0;i<3;i++){
            if(this.checkArray[i] == 1){
                let c = String.fromCharCode(65+i);
                if(this.choiceArray[3][this.period][i] == true){
                    this.panelNode.getChildByName("Toggle "+c).getChildByName('result').getComponent(Sprite).spriteFrame = this.tick;
                    this.enterNode.active = false;
                    director.emit("resumelog");
                }
                else{
                    this.panelNode.getChildByName("Toggle "+c).getChildByName('result').getComponent(Sprite).spriteFrame = this.cross;
                    this.restore(0);
                    return;
                }
            }
        }
        director.on('hide_answerarea',this.hide,this);
    }

    hide () {
        for(let i=0;i<3;i++){
            let c:string = String.fromCharCode(65+i);
            this.panelNode.getChildByName("Toggle "+c).getChildByName('result').getComponent(Sprite).color = new Color(255,255,255,255);
        }
        this.panelNode.active = false;
        director.off('hide_answerarea',this.hide,this);
    }

    restore (stat) {
        this.enterNode.active = false;
        this.checkArray[0] = this.checkArray[1] = this.checkArray[2] = 0;
        let ToggleA = this.panelNode.getChildByName("Toggle A");
        let ToggleB = this.panelNode.getChildByName("Toggle B");
        let ToggleC = this.panelNode.getChildByName("Toggle C");
        ToggleA.getComponent(Toggle).isChecked = false;
        ToggleB.getComponent(Toggle).isChecked = false;
        ToggleC.getComponent(Toggle).isChecked = false;
        if(stat == 1){
            this.panelNode.getChildByName("question").getComponent(Label).string = this.choiceArray[1][this.period];
            ToggleA.getChildByName("answerA").getComponent(Label).string = this.choiceArray[2][this.period][0];
            ToggleB.getChildByName("answerB").getComponent(Label).string = this.choiceArray[2][this.period][1];
            ToggleC.getChildByName("answerC").getComponent(Label).string = this.choiceArray[2][this.period][2];
        }
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
