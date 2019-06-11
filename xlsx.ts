import xlsx from 'node-xlsx';
var fs = require('fs')
class changTool {
    private typeIndex: number = 0 //类型索引
    private notationIndex: number = 1 //注释索引
    private keyIndex: number = 2 //key索引
    /**
     * 解析单张表
     * @param url 
     */
    public parseXlsxOne(url: string) {
        const workSheetsFromFile = xlsx.parse(fs.readFileSync(url));
        let xlsxName = url.replace(/(.*\/)*([^.]+).*/ig, "$2")
        let contentNamespace = ''
        workSheetsFromFile.forEach(biaoOne => {
            let contentClass = ''
            let hengOne = biaoOne.data
            let len = hengOne[this.keyIndex].length//数据的个数以key为准
            for (let i = 0; i < len; i++) {
                let type = hengOne[this.typeIndex][i]
                let notation = hengOne[this.notationIndex][i]
                let key = hengOne[this.keyIndex][i]
                contentClass += this.templateDetailed(notation, key, type)
            }
            contentNamespace += this.templateClass(biaoOne.name, biaoOne.name, contentClass)
        })
        let Namespace = this.templateNamespace(xlsxName, contentNamespace)
        let result = this.templateDefault(Namespace)
        return result
    }
    /**
     * 写入代码提示
     */
    public writeTs(str: string) {
        fs.writeFileSync('./TTT.d.ts', str)
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
        let str =
            `/**
     * ${spaceName}
     */
    export declare namespace ${spaceName} {
        ${content}
    }
    `
        return str
    }
    /**
     * 生成类名
     */
    private templateClass(notation: string, className: string, content: string) {
        let str =
            `/**
         * ${notation}
         */
        export class ${className} {
            ${content}
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
            static ${keyName}: ${type}
            `
        return str
    }
}
(function () {
    var _changTool = new changTool()
    let result = _changTool.parseXlsxOne(`C:/Users/lzlb/Desktop/world_boss.xls`)
    _changTool.writeTs(result)
})()


