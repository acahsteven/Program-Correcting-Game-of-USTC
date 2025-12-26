
import { _decorator, Animation, Component, Node, Input, input, director, game, resources, JsonAsset, error, Vec3, Label, Color, Button, Sprite, SpriteFrame, } from 'cc';
import { Globaldata,constData} from './data';
import { AudioManager } from './AudioManager';
//import * as fs from 'fs';
const { ccclass, property } = _decorator;
/**
 * Predefined variables
 * Name = game
 * DateTime = Fri Oct 24 2025 13:50:06 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = game.ts
 * FileBasenameNoExtension = game_start
 * URL = db://assets/scripts/game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('game_start')
export class game_start extends Component {
    
    public level_which = 0;
    private sta = 1;

    
    @property({ type:Node })
    private button2Node: Node = null;

    @property({ type:Node })
    private selectionNode: Node = null;
    @property({ type:Node })
    private titleNode: Node = null;

    @property({ type:Node })
    private contentsNode: Node = null;
    @property({ type:Node })
    private startNode: Node = null;
    @property({ type:Node })
    private endNode: Node = null;
    @property({type:AudioManager})
    private audioManager: AudioManager = null;
    @property ({type:Node})
    private EscNode: Node = null;

    start () {
        console.log(this.titleNode);
        //console.log(Globaldata.levels);
        this.contentsNode.active=false;
        this.selectionNode.active=false;
        this.startNode.active=false;
        this.endNode.active=false;
        this.startAnimation();
        this.contentUpdate();
        // let remoteUrl = "./save.txt";
        // assetManager.loadRemote(remoteUrl, function (err, textAsset) {
        
        // });
    }

    onLoad () {
        //input.on(Input.EventType.TOUCH_START,this.destroy,this.button2Node);
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
    end (){
        if(this.sta == 0)return;
        console.log("end");
        game.end();
    }

    contentUpdate () {
        console.log(Globaldata.unlockstatus);
        let children = this.contentsNode.getChildByName("levels").children;
        children.forEach(childNode =>{
            let f = childNode.name.indexOf('_');
            let index;
            if(f != -1){
                index = <number><any>childNode.name.slice(5,f);
            }
            else index = <number><any>childNode.name.slice(5);
            let unlock = Globaldata.unlockstatus[index];
            childNode.getComponent(Button).interactable = unlock;
            if(unlock == true){
                resources.load("levelunlocked/spriteFrame", SpriteFrame,(err: any, res: SpriteFrame) => {
                    if (err) {
                        error(err.message || err);
                        return;
                    }
                    childNode.getComponent(Sprite).spriteFrame = res;
                });
            }
            else{
                resources.load("levellocked/spriteFrame", SpriteFrame,(err: any, res: SpriteFrame) => {
                    if (err) {
                        error(err.message || err);
                        return;
                    }
                    childNode.getComponent(Sprite).spriteFrame = res;
                });
            }
        });
    }

    async startAnimation () {
        this.sta = 0;
        let flag=false;
        this.node.on(Node.EventType.MOUSE_DOWN,()=>{flag=true;},this);
        let ani:Animation = this.titleNode.getComponent(Animation);
        ani.play("beginninganimation");
        for(let i=0;i<20;i++){
            if(flag==false)await this.sleep(0.1);
            else{
                this.node.off(Node.EventType.MOUSE_DOWN,()=>{flag=true;},this);
                ani.stop();
                this.titleNode.position = new Vec3(0,270,0);
                this.titleNode.getComponent(Label).color = new Color(0,0,0,255);
            }
        }
        for(let i=0;i<3;i++){
            for(let j=0;j<10;j++){
                if(flag==false)await this.sleep(0.1);
                else{this.node.off(Node.EventType.MOUSE_DOWN,()=>{flag=true;},this);break;}
            }
            switch(i){
                case 0:{this.startNode.active=true;break;}
                case 1:{this.selectionNode.active=true;break;}
                case 2:{this.endNode.active=true;break;}
            }
        }
        this.sta = 1;
        director.emit("animend");
    }

    levelButtonClick () {
        if(this.sta == 0)return;
        this.contentsNode.active = true;
        this.startNode.active = false;
        this.endNode.active = false;
    }

    quit () {
        if(this.sta == 0)return;
        this.contentsNode.active = false;
        this.startNode.active = true;
        this.endNode.active = true;
    }

    async begin (event,lvl) {
        if(this.sta == 0)return;
        // console.log(lvl);
        // console.log('onload');
        Globaldata.curlevelsNumber = lvl;
        resources.load(`data/level${lvl}`, (err: any, res: JsonAsset) => {
                    if (err) {
                        error(err.message || err);
                        return;
                    }
                    Globaldata.jsonData = res.json as constData;
        })
        while(Globaldata.jsonData == null){await this.sleep(0.1);}
        console.log(Globaldata.jsonData != null);
        await this.sleep(0.1)
        director.loadScene('game_main');
    }

    sleep(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, duration);
        });
    }
}