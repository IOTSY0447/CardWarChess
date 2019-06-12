import xlsx from 'node-xlsx';
var fs = require('fs')
class changTool {
    private typeIndex: number = 0 //类型索引
    private notationIndex: number = 1 //注释索引
    private keyIndex: number = 2 //key索引
    private tableUrl: string = __dirname + '/xlsxConfig/test(测试用).xlsx'
    constructor() {
        let result = this.parseXlsxOne(this.tableUrl)
        this.writeTs(result)
    }
    /**
     * 解析单张表
     * @param url 
     */
    public parseXlsxOne(url: string) {
        const workSheetsFromFile = xlsx.parse(fs.readFileSync(url));
        let xlsxName = url.replace(/(.*\/)*([^.]+).*/ig, "$2")
        let contentNamespace = ''
        workSheetsFromFile.forEach(biaoOne => {
            let contentSheet = ''
            let hengOne = biaoOne.data
            let len = hengOne[this.keyIndex].length//数据的个数以key为准
            for (let i = 0; i < len; i++) {
                let type = hengOne[this.typeIndex][i]
                let notation = hengOne[this.notationIndex][i]
                let key = hengOne[this.keyIndex][i]
                contentSheet += this.templateDetailed(notation, key, type)
            }
            contentSheet = this.removeLineBreaks(contentSheet)
            contentNamespace += this.templateSheet(biaoOne.name, contentSheet)
        })
        contentNamespace = this.removeLineBreaks(contentNamespace)
        let Namespace = this.templateNamespace(xlsxName, contentNamespace)
        Namespace = this.removeLineBreaks(Namespace)
        let result = this.templateDefault(Namespace)
        Namespace = this.removeLineBreaks(result)
        return result
    }
    /**
     * 写入代码提示
     */
    public writeTs(str: string) {
        fs.writeFileSync('./configTable.d.ts', str)
    }
    /**
     * 生成默认代码
     * @param spaceName 
     */
    private templateDefault(code: string) {
        let str =
            `/**
 * 德玛西亚万岁
 */
export declare namespace configTable {
    ${code}
}
`
        return str
    }
    /**
     * 生成命名空间
     * @param spaceName 
     */
    private templateNamespace(spaceName: string, content: string) {
        let regex1 = "\\((.+?)\\)";    // () 小括号
        let arr1 = spaceName.match(regex1)
        let notation = arr1[1]
        let name = spaceName.replace(arr1[0], '')
        let str =
            `/**
     * ${notation}
     */
    export declare namespace ${name} {
        ${content}
    }
    `
        return str
    }
    /**
     * 生成单个分页
     */
    private templateSheet(className: string, content: string) {
        let regex1 = "\\((.+?)\\)";    // () 小括号
        let arr1 = className.match(regex1)
        let notation = arr1[1]
        let name = className.replace(arr1[0], '')
        let str =
            `/**
         * ${notation}
         */
        export var ${name} : {
            [id: number]: {//这个等数据类型确定了再定
                ${content}
            }
        }
        `
        return str
    }
    /**
     * 生成详情
     */
    private templateDetailed(notation: string, keyName: string, type: string) {
        let str =
            `/**
                 * ${notation}
                 */
                ${keyName}: ${type}
                `
        return str
    }
    /**
     * 去除换行
     * @param content 
     */
    removeLineBreaks(content: string) {
        return content.substr(0, content.lastIndexOf('\n'));
    }
}
new changTool()