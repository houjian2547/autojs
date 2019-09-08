var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "掌上热点",
    articleId: "tv_date",
    startVideoBtnId: "",
    timerId: "iv_red_package",
    mainPageId: "ll_search"
}

startSelect();
function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    while (true) {
        commonFunction.selectArticleById(joinConfig);
    }
}