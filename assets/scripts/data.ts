export class Globaldata{
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
}