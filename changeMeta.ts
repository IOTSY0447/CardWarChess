var fs = require('fs')
class changeMate {
    private plistUrl = __dirname + '/assets/root/game_ermj/plist/allImg.plist'
    private imgDirUrl = __dirname + '/assets/root/game_ermj'
    private assets = __dirname + '/assets'//全局搜引用
    private subMetas: { [imgName: string]: { uuid: string } } = null//合图里面的所有图片名跟uuid
    private brokenImgMap: { [imgName: string]: { uuid: string, arrRepeat?: string[], path: string } } = {} //碎图
    constructor() {
        this.generateSubMetas()
        this.generateBrokenImgMap()
        this.checkAllFire()
    }
    /**
     * 通过plist的meta文件生成subMetas
     */
    generateSubMetas() {
        let meta = fs.readFileSync(this.plistUrl + '.meta', 'utf-8')
        this.subMetas = JSON.parse(meta)['subMetas']
    }
    /**
     * 获取对应的碎图
     */
    generateBrokenImgMap() {
        let checkCb = (fillName: string, newPath: string) => {
            if (fillName.endsWith('.png')) {//如果是图片
                let brokenImgOne = this.brokenImgMap[fillName]
                let keyName = fillName.replace(/(.*\/)*([^.]+).*/ig, "$2")
                if (!brokenImgOne) {
                    let meta = fs.readFileSync(newPath + '.meta', 'utf-8')
                    let uuid: string = JSON.parse(meta)['subMetas'][keyName]['uuid']
                    this.brokenImgMap[fillName] = { uuid: uuid, path: newPath }
                } else {
                    if (!brokenImgOne.arrRepeat) {
                        brokenImgOne.arrRepeat = [brokenImgOne.path]
                    }
                    brokenImgOne.arrRepeat.push(newPath)
                }
            }
        }
        this.readDirOneByOne(this.imgDirUrl, checkCb)
        for (const imgName in this.brokenImgMap) {
            if (this.brokenImgMap[imgName].arrRepeat) {
                console.log('重复资源', this.brokenImgMap[imgName].arrRepeat)
            }
        }
    }
    /**
     * 循环读取 可传非文件夹，直接检查该文件
     * @param dirPath 
     */
    readDirOneByOne(dirPath: string, checkCb: (fillName: string, newPath: string) => void) {
        if (fs.statSync(dirPath).isDirectory()) {//如果是文件
            let dir: string[] = fs.readdirSync(dirPath)
            for (let i = 0; i < dir.length; i++) {
                const fillName = dir[i];
                let newPath = dirPath + '/' + fillName
                checkCb(fillName, newPath)
                this.readDirOneByOne(newPath, checkCb)
            }
        }else{
            let lastIndex = dirPath.lastIndexOf('/')
            let fillName = dirPath.substr(lastIndex + 1)
            checkCb(fillName, dirPath)
        }
    }
    /**
     * 替换
     * @param url 
     */
    checkFire(url: string) {
        let fire: string = fs.readFileSync(url, 'utf-8')
        for (const imgName in this.subMetas) {
            let beforeUuid = null
            if (this.brokenImgMap[imgName]) {
                beforeUuid = this.brokenImgMap[imgName].uuid
            }
            let newUuid = this.subMetas[imgName].uuid
            if (beforeUuid) {
                fire = fire.replace(new RegExp(beforeUuid, 'g'), newUuid)
                console.log(url, '替换', imgName)
            }
        }
        fs.writeFileSync(url, fire)
    }
    /**
     * 检查所有的场景
     */
    checkAllFire() {
        let checkCb = (fillName: string, newPath: string) => {
            if (fillName.endsWith('.fire') || fillName.endsWith('.prefab')) {//如果是场景或者预制！！预制没测
                this.checkFire(newPath)
            }
        }
        this.readDirOneByOne(this.assets, checkCb)
    }
    /**
     * 删除合图包含内容
     */
    //还是手动吧
}
new changeMate()