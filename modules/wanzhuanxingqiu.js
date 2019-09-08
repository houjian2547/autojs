var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "玩赚星球",
    articleId: "img_item3",
    startVideoBtnId: "",
    timerId: "img_red_pack",
    mainPageId: "tv_news_title"
}

startSelect();
function startSelect() {
    var pageAdCloseId = "iv_delete";//首页广告关闭id
    commonFunction.clickById(pageAdCloseId);
    sleep(1000);
    commonFunction.clickByText("头条");
    let joinConfig = commonFunction.assignConfig(config);
    while (true) {
        commonFunction.selectArticleById(joinConfig);
    }
}
