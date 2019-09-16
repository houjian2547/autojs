var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "想看",
    articleId: "tvInfo",
    startVideoBtnId: "video_item_play_btn",
    timerId: "coin_img_big",
    mainPageId: "tab_icon"
}

startSelect();
function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    joinConfig.moduleNameArray = [joinConfig.articleModuleName, joinConfig.videoModuleName];
    let moduleIndex = commonFunction.selectModule(joinConfig);
    if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.articleModuleName) {
        while (true) {
            preHandle();
            commonFunction.selectArticleById(joinConfig);
        }
    } else if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.videoModuleName) {
        while (true) {
            commonFunction.scanVideoIn(joinConfig);
        }
    }
}

//文章内前置处理
function preHandle() {
    //想看
    let fudai_btn_id = "rec_task_btn";//首页领金币按钮
    let fudai_btn_text = "领金币";//首页领金币按钮
    let more_minute_btn_id = "more_minute_btn";//更多时间提醒
    let fudai_icon_id = "fudai_icon";//福袋icon id
    commonFunction.clickByText(fudai_btn_text);
    commonFunction.clickById(more_minute_btn_id);
    commonFunction.clickById(fudai_icon_id);
    commonFunction.clickById(fudai_btn_id);
}
