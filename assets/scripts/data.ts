export class Globaldata{
    public static jsonData:constData = null;
    public static gamestateNumber = 0;//等于0时为全部操作禁止，等于1时左侧可以，等于2时右侧可以，等于3时均可以
    public static gameperiodNumber = 0;
    public static curlevelsNumber = 1;//直接测试时需手动调整
    public static unlockstatus = [null,true,true,true,true,false];
    public static tollevels = 5;
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
    errorinformationString: [number,string][][];//0 AC, 1 CE, 2 part WA, 3 ALL WA, 4 RE, 5 TLE, 6 MLE

    dialoguesArray: [number,string[]][];
    namesArray: string[];
    totalperiodNumber: number;

    titleString:string;
    descriptionString:string;
    inputString:string;
    outputString:string;
}