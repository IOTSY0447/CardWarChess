import { puremvc } from "./puremvc";
import { sysConfig } from "./msgConfig";
import { loadScene } from "./commonCommand";


const { ccclass, property } = cc._decorator;

@ccclass
export default class gameApp extends puremvc.Component {
    onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.registerCommand()
    }
    /**
     * 统一注册Command
     */
    registerCommand() {
        facade.registerCommand(sysConfig.loadScene, loadScene)
    }
}
