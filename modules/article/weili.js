var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "微鲤",
    articleId: "tv_chat_room_tag",
    startVideoBtnId: "tv_count",
    timerId: "iv_coin",
    mainPageId: "iv_tab_1"
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

