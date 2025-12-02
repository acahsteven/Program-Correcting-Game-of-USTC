
import { _decorator, Animation, Component, director, error, instantiate, JsonAsset, Label, Node, Prefab, resources, sys } from 'cc';
import { Globaldata,constData } from './data';
const { ccclass, property } = _decorator;


/**
 * Predefined variables
 * Name = base
 * DateTime = Mon Nov 03 2025 17:00:56 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = base.ts
 * FileBasenameNoExtension = base
 * URL = db://assets/scripts/base.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('base')
export class base extends Component {
    tmpstate:number = null;
    jsonData:constData = null;
    curLevel:number = null;
    description:string = null;
    input:string = null;
    output:string = null;
    title:string = null;
    configPath:string = null;

    @property ({type:Node})
    private broswercanvasNode = null;
    @property ({type:Node})
    private windowsNode = null;
    @property ({type:Node})
    private browserNode = null;
    @property ({type:Node})
    private exitNode = null;
    @property ({type:Node})
    private smallicon1Node = null;
    @property ({type:Node})
    private smallicon2Node = null;
    @property ({type:Node})
    private codeareaNode = null;
    @property ({type:Node})
    private logareaNode = null;
    @property ({type:Node})
    private startAnimationNode = null;
    @property ({type:Prefab})
    private browserbarfab:Prefab = null;

    onLoad () {
        if(sys.isNative == true){
            try{
                //jsb.fileUtils.createDirectory("C://");
            }
            catch{
                console.log("creating users_configuration fails");
            }
        }//文件管理，待完成#
        //console.log(sys);
        this.curLevel = Globaldata.curlevelsNumber;
        // resources.load(`data/level${this.curLevel}`, (err: any, res: JsonAsset) => {
        //     if (err) {
        //         error(err.message || err);
        //         return;
        //     }
        //     Globaldata.jsonData = res.json as constData;
        // })
        this.jsonData = Globaldata.jsonData;
    }

    start () {
        this.exitNode.active = false;
        this.codeareaNode.active = false;
        this.startAnimationNode.active = false;
        this.smallicon1Node.active = false;
        this.smallicon2Node.active = false;

        this.description = this.jsonData.descriptionString;
        this.input = this.jsonData.inputString;
        this.output = this.jsonData.outputString;
        this.title = this.jsonData.titleString;

        this.problembarinitialize();
        this.animation();
        console.log('start end');
        director.on('dialogues_finished_base',this.show,this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    problembarinitialize () {
        let barNode:Node = instantiate(this.browserbarfab);
        this.broswercanvasNode.addChild(barNode);
        barNode.getChildByName("urlcolumn").getChildByName("url").getComponent(Label).string+=this.curLevel.toString();
        barNode.getChildByName("title").getComponent(Label).string=this.title;
        barNode.getChildByName("content").getChildByName("description").getComponent(Label).string=this.description;
        barNode.getChildByName("I_O").getChildByName("input").getComponent(Label).string=this.input;
        barNode.getChildByName("I_O").getChildByName("output").getComponent(Label).string=this.output;
        barNode.active = false;
        //this.browserNode.children[0].active = false;
    }

    sleep(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, duration);
        });
    }
    async animation () {
        console.log('animation start');

        this.logareaNode.active = false;
        this.startAnimationNode.active = true;
        let text = this.startAnimationNode.getComponent(Label);
        text.string = `Week ${Globaldata.curlevelsNumber}`;
        let ani = this.startAnimationNode.getComponent(Animation);
        ani.play('showweek');
        await this.sleep(2.5);
        this.logareaNode.active = true;
        this.startAnimationNode.active = false;
        director.emit('animation_finish');

        console.log('animation finish');
    }
    large1 () {
        if(Globaldata.gamestateNumber == 0)return;
        this.smallicon1Node.active = false;
        this.codeareaNode.active = true;
    }

    large2 () {
        if(Globaldata.gamestateNumber == 0)return;
        this.smallicon2Node.active = false;
        this.logareaNode.active = true;
    }

    show () {
        this.codeareaNode.active = true;
        Globaldata.gamestateNumber = 3;
        director.off('dialogues_finished',this.show,this);
    }

    turn_off () {
        if(Globaldata.gamestateNumber == 0)return;
        this.exitNode.active = true;
        this.tmpstate = Globaldata.gamestateNumber;
        Globaldata.gamestateNumber = 0;
    }

    exit (event,data) {
        if(data == 1){
            Globaldata.curlevelsNumber = 0;
            Globaldata.gameperiodNumber = 0;
            Globaldata.gamestateNumber = 0;
            director.loadScene("game_start");
        }
        else{
            this.exitNode.active = false;
            Globaldata.gamestateNumber = this.tmpstate;
        }
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
