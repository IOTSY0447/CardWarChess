import { puremvc } from "./puremvc";


export class loadScene extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        cc.director.loadScene(notification.getBody());
    }
}
