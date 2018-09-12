const { ccclass, property } = cc._decorator;

@ccclass
export class Block extends cc.Component {

    init(fallDuration: number, fallHeight: number, destroyTime: number, destroyCb: Function) {
        this.scheduleOnce(() => {
            let dieAction = cc.moveBy(fallDuration, cc.v2(0, -fallHeight));
            this.node.runAction(dieAction);
            destroyCb();
        }, destroyTime);
    }
}
