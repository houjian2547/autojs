var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "精彩头条",
    startVideoBtnDesc: "video_play_btn",
    timerText:"我来说两句",
    mainPageText: "搜索感兴趣的内容",
    scanTimes: 6
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
            commonFunction.scanVideoNotIn(joinConfig);
        }
    }
}


