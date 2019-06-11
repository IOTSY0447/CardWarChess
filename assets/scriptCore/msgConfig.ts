/**
 * 系统级消息
 */
export class sysConfig {
    static loadScene:string = 'loadScene'//加载场景
}
/**
 * 场景用的消息
 * 名字必须与实际场景名字一致
 * 这部分内容考虑自动生成
 */
export class sceneConfig {
    static startScene: string = 'startScene'//游戏开始的场景
    static hotScene: string = 'hotScene'//热更场景
}
/**
 * 界面用的消息
 * 名字必须与实际预制名字一致
 * 这部分内容考虑自动生成
 * 与场景分离，考虑内存处理
 */
export class prefabConfig {
    
}
