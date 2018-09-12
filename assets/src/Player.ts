const { ccclass, property } = cc._decorator;

@ccclass
export class Player extends cc.Component {

    public index: number;
    private jumpDistance: number;
    private jumpHeight: number;
    private jumpDuration: number;
    private fallDuration: number;
    private fallHeight: number;
    public canJump: boolean;

    public init(jumpDistance: number, jumpHeight: number, jumpDuration: number, fallDuration: number, fallHeight: number) {
        this.jumpDistance = jumpDistance;
        this.jumpHeight = jumpHeight;
        this.jumpDuration = jumpDuration;
        this.fallDuration = fallDuration;
        this.fallHeight = fallHeight;
        this.index = 0;
        this.canJump = true;
    }

    public jump(step: number) {
        this.canJump = false;
        this.index += step;
        let jumpAction = cc.jumpBy(this.jumpDuration, cc.v2(step * this.jumpDistance, 0), this.jumpHeight, 1);
        let finish = cc.callFunc(() => {
            this.canJump = true;
        });
        this.node.runAction(cc.sequence(jumpAction, finish);
    }

    public die() {
        this.canJump = false;
        let dieAction = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallHeight));
        this.node.runAction(dieAction);
    }
}
