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
    // commonFunction.clickByText("领金币");//首页领金币按钮
    commonFunction.clickById("more_minute_btn");//更多时间提醒
    commonFunction.clickById("fudai_icon");//福袋icon id
    // commonFunction.clickById("rec_task_btn");//首页领金币按钮
}
