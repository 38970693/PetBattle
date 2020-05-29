import GlobalData from "../Common/GlobalData";
import GameMgr from "../Manager/GameMgr";
import Camper from "../Common/Camper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainPage extends cc.Component {
    @property({type: cc.Node})
    userInfo: cc.Node = null;
    @property({type: cc.Node})
    btnSetting: cc.Node = null;
    @property({type: cc.Node})
    btnVS: cc.Node = null;
    @property({type: cc.Node})
    bottomBtnList: cc.Node = null;
    @property({type: cc.Node})
    leftBtnList: cc.Node = null;
    @property({type: cc.Node})
    rightBtnList: cc.Node = null;

    onLoad() {
        this.userInfo.x = -cc.winSize.width / 2 + 10;
        this.btnSetting.x = cc.winSize.width / 2 - 10;
        this.btnVS.x = cc.winSize.width / 2 - 10;
        this.bottomBtnList.x = -cc.winSize.width / 2 + 10;
        this.leftBtnList.x = -cc.winSize.width / 2 + 10;
        this.rightBtnList.x = -cc.winSize.width / 2 + 135;
        cc.loader.load(GlobalData.userInfo.avatarUrl, (err, texture) => {
            if (!err) {
                this.node.getChildByName("UserInfo")
                .getChildByName("HeadPhoto")
                .getChildByName("Avatar")
                .getComponent(cc.Sprite)
                .spriteFrame = new cc.SpriteFrame(texture);
            }
        });
        this.node.getChildByName("UserInfo").getChildByName("NameFrame").getChildByName("Label").getComponent(cc.Label).string = GlobalData.userInfo.nickname;
    }

    addPage(e: cc.Event.EventTouch, pageName: string) {
        if (pageName == "VSPage" && GlobalData.countEmbattleInfo() == 0) {
            Camper.getInstance().showToast("请至少上阵一只精灵");
            return;
        }
        let gm = GameMgr.getInstance();
        gm.addPage(pageName);
    }
}
