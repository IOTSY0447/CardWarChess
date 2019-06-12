/**
 * 管理加载 頭疼
 */
class loadManage {
    openingInterfacePool: { [url: string]: { asset: cc.Prefab, usCount: number } } = {} //以打开的界面
    interfaceUseAssetPool: { [uuid: string]: { [url: string]: number } } = {} //记录预制使用的资源
    resourcePool: { [url: string]: resourceOne } = {}//管理已加载资源
    /**
     * 加载资源
     * @param url 
     * @param type 
     * @param callBack 
     * @param uuid 
     */
    load(url: string, type: typeof cc.Asset, callBack: (asset: cc.Asset) => void, uuid: string) {
        if (this.resourcePool[url]) {
            let asset = this.resourcePool[url].asset
            callBack(asset)
            this.addInterfaceUse(uuid, url)
            return
        }
        cc.loader.loadRes(url, type, (err, asset: cc.Asset) => {
            if (err) {
                cc.error(err)
            } else {
                callBack(asset)
                this.resourcePool[url] = new resourceOne(asset, url, this.resourcePool)
                this.addInterfaceUse(uuid, url)
            }
        });
    }
    /**
     * 针对界面作引用统计
     * @param uuid 
     * @param url 
     */
    addInterfaceUse(uuid: string, url: string) {
        if (!this.interfaceUseAssetPool[uuid]) {
            this.interfaceUseAssetPool[uuid] = {}
        }
        if (!this.interfaceUseAssetPool[uuid][url]) {
            this.interfaceUseAssetPool[uuid][url] = 0
            this.resourcePool[url].addUseCount()
        }
        this.interfaceUseAssetPool[uuid][url]++
    }
    /**
     * 当界面关闭
     * @param node 
     * @param uuid 
     */
    onInterfaceClose(node: cc.Node, uuid: string) {
        node.getComponentsInChildren(cc.Sprite).forEach(sprite => {
            sprite.spriteFrame = null
        })
        Object.keys(this.interfaceUseAssetPool[uuid]).forEach(url => {
            this.resourcePool[url].reduceUseCount()
        })
        node.removeFromParent()
        node.destroy()
        if(node['url']){
            this.resourcePool[node['url']].reduceUseCount()
        }else{
            cc.error('界面未找到对应的路径，无法释放！',node)
        }
        cc.sys.garbageCollect();
    }
}
class resourceOne {
    asset: cc.Asset = null //对应资源
    private useCount: number = 0 //引用次数
    private isNeedRelease: boolean = false//是否需要释放，目前只测试过 图片、预制
    private resourcePool: { [url: string]: resourceOne } = null //管理器的资源
    private url: string = null//路径
    constructor(asset: cc.Asset, url: string, resourcePool: { [url: string]: resourceOne }) {
        this.asset = asset
        this.resourcePool = resourcePool
        this.url = url
        this.isNeedRelease = asset instanceof cc.Prefab || asset instanceof cc.SpriteFrame
    }
    /**
     * 增加引用次数
     */
    addUseCount() {
        this.useCount++
    }
    /**
     * 减少引用次数，如果没引用了，就清理掉
     */
    reduceUseCount() {
        this.useCount--
        if (this.useCount <= 0 && this.isNeedRelease) {
            var deps = cc.loader.getDependsRecursively(this.asset);
            cc.loader.release(deps);
            delete this.resourcePool[this.url]
        }
    }
}
export default new loadManage()


