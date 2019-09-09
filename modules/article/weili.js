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
            closeAd();
            commonFunction.selectArticleById(joinConfig);
        }
    } else if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.videoModuleName) {
        while (true) {
            closeAd();
            commonFunction.scanVideoIn(joinConfig);
        }
    }
}


function closeAd(){
    //微鲤
    let readAwardId = "text_open";
    let readTimeNoticeId = "text_ok";
    let readTimeBtnId = "bt_ok";
    commonFunction.clickById(readAwardId);
    commonFunction.clickById(readTimeNoticeId);
    commonFunction.clickById(readTimeBtnId);
}