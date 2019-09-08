var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "点点新闻",
    articleId: "image_1",
    startVideoBtnId: "iv_video_start",
    timerId: "back",
    mainPageId: "home",
    scanTimes: 6     //浏览次数
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