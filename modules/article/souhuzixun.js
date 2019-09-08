var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "搜狐资讯",
    articleId: "article_time",
    startVideoBtnId: "start",
    timerId: "counting_img",
    mainPageId: "animation_view"
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
            commonFunction.scanVideoNotIn(joinConfig);
        }
    }
}

function closeAd() {
    var readAwardId = "energy_open";
    var btnReceiveId = "btn_receive";
    var cancleDialogIvId = "cancle_dialog_iv";
    //点击能量红包
    commonFunction.clickById(readAwardId);
    sleep(500);
    //点击接受
    commonFunction.clickById(btnReceiveId);
    sleep(500);
    commonFunction.clickById(cancleDialogIvId);
    sleep(500);
}
