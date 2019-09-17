var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "淘最热点",
    articleText: "看过",
    timerText: "2019-",
    mainPageText: "热点",
    scanTimes: 15,
    swipeStart: 5 / 6,     //上滑起始点
    swipeEnd: 1 / 6     //上滑结束点
}

startSelect();
function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    while (true) {
        commonFunction.selectArticleById(joinConfig);
    }
}