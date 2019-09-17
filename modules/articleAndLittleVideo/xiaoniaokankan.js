var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "小鸟看看",
    articleText: "今天",
    timerText: "来说两句吧",
    mainPageText: "推荐",
    scanTimes: 7
}

startSelect();
function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    while (true) {
        commonFunction.selectArticleById(joinConfig);
    }
}