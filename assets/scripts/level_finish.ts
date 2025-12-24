
import { _decorator, Component, director, error, JsonAsset, Node, resources } from 'cc';
import { constData, Globaldata } from './data';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = level_finish
 * DateTime = Tue Nov 04 2025 17:25:42 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = level_finish.ts
 * FileBasenameNoExtension = level_finish
 * URL = db://assets/scripts/level_finish.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('level_finish')
export class level_finish extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    async onClick (event,data) {
        Globaldata.gamestateNumber = 0;
        Globaldata.gameperiodNumber = 0;
        if(data == 1){
            Globaldata.curlevelsNumber++;
            resources.load(`data/level${Globaldata.curlevelsNumber}`, (err: any, res: JsonAsset) => {
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
        else if(data == 2){
            Globaldata.curlevelsNumber = 0;
            director.loadScene('game_start');
        }
    }

    sleep(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, duration);
        });
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
