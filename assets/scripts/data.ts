export class Globaldata{
    public static jsonData:constData = null;
    public static gamestateNumber = 0;//等于0时为全部操作禁止，等于1时左侧可以，等于2时右侧可以，等于3时均可以
    public static gameperiodNumber = 0;
    public static curlevelsNumber = 1;//直接测试时需手动调整

    /*public static passstatBoolean:boolean[] = [false,false,false,false,false];
    public static linesNumber: number[][] = [[],[5,6]];
    public static orgtextString: string[][][] = [
        [],
        [
            [' 1    #include<stdio.h>',
            ' 2    int main(){',
            ' 3        print("hello,world!");',
            ' 4        return 0;',
            ' 5    }'],
            [' 1    #include<iostream>',
            ' 2    #define int long long',
            ' 3    signed main(){',
            ' 4        std::cout<<"hello,"<<"world!";',
            ' 5        return 0;',
            ' 6    }'],
        ],
        
    ];
    public static altertextString: string[][][] = [
        [],
        [
            ['',
            '',
            ' 3        printf("hello,world!");',
            '',
            '',],
            [' 1    #include<stdio.h>',
            '',
            ' 3    int main(){',
            ' 4        printf("hello,world!");',
            '',
            ''],
        ]
    ];
    public static changeableArray: boolean[][][] = [
        [],
        [[false,false,true,false,false],[true,false,true,true,false,false]]
    ]
    public static answerArray: number[][][] = [
        [],
        [[0,0,1,0,0],[1,0,0,1,0,0]]
    ];
    public static filenameString: string[][] = [
        [],
        ['st3_hello_world.c','st2_hello_world.c']
    ]



    public static totalperiodNumber: number[] = [0,3];
    public static namesArray: string[] = ['whh','st1','st2','st3','st4'];
    public static dialoguesArray: [number,string[]][][] = [
        [],
        [
            [7,
            ['0 同学们，今天是程序设计课程的第一课。',
            '0 请大家按课程内容完成编译环境的配置，并完成第一个C语言的程序的编写。',
            '0 完成后请将源代码交至助教处进行检查。',
            '1 收到',
            '2 收到',
            '3 猪脚，我的代码怎么弄都编译错误，你能帮忙看看吗？已经发给你了',
            '0 稍等，我看一下']
            ],
            [5,
            ['0 大家注意了，C语言的标准输出函数是printf',
            '0 不是print或者别的什么',
            '3 收到，已经改正了',
            '2 助教，能看下我的吗',
            '0 OK']
            ],
            [4,
            [`0 @${this.namesArray[2]}，你写的是C++语法...`,
            '0 有C++基础的同学不要把C和C++弄混了',
            '0 考试写C++是没分的',
            '2 收到，谢谢助教提醒']
            ]
        ]
    ];
    public static choiceArray: [number, string[], string[][], boolean[][]][] = [ //存放关卡的选择题数目，问题内容，选项，与对错情况
        [0,[''],[['']],[[]]],
        [3,['','C语言的标准输出函数是？','包含C语言标准输出函数的头文件是？'],
            [
                [],
                ['print','printf','我不知道'],
                ['stdio.h','iostream','bits/stdc++.h']
            ],
            [
                [],
                [false,true,false],
                [true,false,false]
            ]
        ]
    ];*/
}

export interface constData{
    curlevelsNumber : number;
    linesNumber : number[];
    orgtextString: string[][];
    altertextString: string[][];
    changeableArray: boolean[][];
    choiceArray:[number, string[], string[][], boolean[][]];
    filenameString:string[];
    answerArray: number[][];
    errorinformationString: [number,string][][];

    dialoguesArray: [number,string[]][];
    namesArray: string[];
    totalperiodNumber: number;

    titleString:string;
    descriptionString:string;
    inputString:string;
    outputString:string;
}