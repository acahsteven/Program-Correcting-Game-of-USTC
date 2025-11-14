
import { _decorator, Component, Node, Input, input, director, game, } from 'cc';
import { Globaldata } from './data';
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

    
    @property({ type:Node })
    private button2Node: Node = null;

    @property({ type:Node })
    private button1Node: Node = null;

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
        //console.log(Globaldata.levels);
        this.contentsNode.active=false;
        
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
        game.end();
    }

    levelButtonClick () {
        this.contentsNode.active = true;
        this.startNode.active = false;
        this.endNode.active = false;
    }

    quit () {
        this.contentsNode.active = false;
        this.startNode.active = true;
        this.endNode.active = true;
    }

    begin (event,lvl) {
        // console.log(lvl);
        // console.log('onload');
        Globaldata.curlevelsNumber = lvl;
        director.loadScene('game_main');
    }
}