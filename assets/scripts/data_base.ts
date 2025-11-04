
import { _decorator, Component, Node } from 'cc';
import { game_start } from './game_start';
const { ccclass, property } = _decorator;

const TextArray: string[][] = [
    [
        ' 1    #include<stdio.h>',
        ' 2    int main(){',
        ' 3    printf("hello,world!");',
        ' 4    return 0;',
        ' 5    }'
    ],
    [

    ]
]

/**
 * Predefined variables
 * Name = data_base
 * DateTime = Mon Nov 03 2025 17:00:56 GMT+0800 (GMT+08:00)
 * Author = RE_DoR
 * FileBasename = data_base.ts
 * FileBasenameNoExtension = data_base
 * URL = db://assets/scripts/data_base.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('data_base')
export class data_base extends Component {
    

    @property ({type:Node})
    private smalliconNode = null;

    @property ({type:Node})
    private areaNode = null;

    start () {
        this.smalliconNode.active = false;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    large () {
        this.smalliconNode.active = false;
        this.areaNode.active = true;
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
