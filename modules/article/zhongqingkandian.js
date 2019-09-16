var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "中青看点",
    articleText: "阅读",
    startVideoBtnText: "播放",
    timerText: "评论",
    mainPageText: "推荐"
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

function preHandle() {
    // commonFunction.clickById("x2");//首页领取金币按钮
    commonFunction.clickById("kn");//首页广告，关闭按钮
}
