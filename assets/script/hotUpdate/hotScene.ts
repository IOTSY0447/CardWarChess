import { sceneConfig, sysConfig } from "../../scriptCore/msgConfig";
import { puremvc } from "../../scriptCore/puremvc";


const {ccclass, property} = cc._decorator;

@ccclass
export default class hotScene extends puremvc.Component {
    start () {
        cc.log('未实现热更')
        facade.sendNotification(sysConfig.loadScene,sceneConfig.startScene)
    }
}
