import { Stage } from "./Stage";
import { OverPanel } from "./OverPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(Stage)
    private stage: Stage = null;
    @property(cc.Label)
    private scoreLabel: cc.Label = null;
    @property(cc.Node)
    private oneButton: cc.Node = null;
    @property(cc.Node)
    private twoButton: cc.Node = null;
    @property(OverPanel)
    private overPanel: OverPanel = null;

    private score: number;

    protected start() {
        this.overPanel.init(this);
        this.overPanel.hide();
        this.startGame();
        this.addListeners();
    }

    private handleStep(step: number) {
        this.stage.playerJump(step);
    }

    public addScore(n: number) {
        this.score += n;
        this.scoreLabel.string = this.score + '';
    }

    public startGame() {
        this.score = 0;
        this.scoreLabel.node.active = true;
        this.scoreLabel.string = '0';
        this.stage.init(this);
    }

    public overGame() {
        cc.log('over');
        this.scoreLabel.node.active = false;
        this.overPanel.show(this.score);
    }

    private onBtnOne() {
        this.handleStep(1);
    }

    private onBtnTwo() {
        this.handleStep(2);
    }

    private addListeners() {
        this.oneButton.on(cc.Node.EventType.TOUCH_END, this.onBtnOne, this);
        this.twoButton.on(cc.Node.EventType.TOUCH_END, this.onBtnTwo, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event: cc.Event.EventKeyboard) => {
            if (event.keyCode === cc.macro.KEY.left) {
                this.handleStep(1);
            } else if (event.keyCode === cc.macro.KEY.right) {
                this.handleStep(2);
            }
        }, this);
    }

    private removeListeners() {

    }
}
