export class Globaldata{
    public static gamestateNumber = 0;
    public static curlevelsNumber = 1;
    public static passstatBoolean:boolean[] = [false,false,false,false,false];
    public static linesNumber: number[] = [0,5];
    public static orgtextString: string[][] = [
        [],
        [
            ' 1    #include<stdio.h>',
            ' 2    int main(){',
            ' 3    print("hello,world!");',
            ' 4    return 0;',
            ' 5    }'
        ],
        
    ];
    public static altertextString: string[][] = [
        [],
        [
            '',
            '',
            ' 3    printf("hello,world!");',
            '',
            '',
        ]
    ];
    public static changeableArray: boolean[][] = [
        [],
        [false,false,true,false,false]
    ]
    public static answerArray: number[][] = [
        [],
        [0,0,1,0,0]
    ];

    public static dialoguesArray: string[][] = [
        [],
        [
            '6',
            '0 同学们，今天是程序设计课程的第一课。',
            '0 请大家按课程内容完成编译环境的配置，并完成第一个C语言的程序的编写。',
            '0 完成后请将源代码交至助教处进行检查。',
            '1 收到',
            '2 收到',
            '3 猪脚，我的代码怎么弄都编译错误，你能帮忙看看吗？已经发给你了',
        ]
    ];
    public static namesArray: string[] = ['whh','st1','st2','st3','st4'];
}