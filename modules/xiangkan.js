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
            commonFunction.selectArticleById(joinConfig);
        }
    } else if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.videoModuleName) {
        while (true) {
            commonFunction.scanVideoIn(joinConfig);
        }
    }
}