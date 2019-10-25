var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "快看点",
    articleId: "comment_count",
    timerId: "comment_input",
    mainPageId: "channel_tab_item_name"
}

startSelect();
function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    while (true) {
        commonFunction.selectArticleById(joinConfig);
    }
}