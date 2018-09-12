import { Game } from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export class OverPanel extends cc.Component {

    @property(cc.Label)
    private scoreLabel: cc.Label = null;
    @property(cc.Node)
    private restartButton: cc.Node = null;

    private game: Game;

    public init(game: Game) {
        this.game = game;
        this.restartButton.on(cc.Node.EventType.TOUCH_END, () => {
            this.hide();
            cc.director.loadScene('game');
        }, this);
    }

    public show(score: number) {
        this.scoreLabel.string = score + '';
        this.node.active = true;
    }

    public hide() {
        this.node.active = false;
    }

}
