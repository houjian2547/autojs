var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "兔头条",
    articleId: "tape_layout",
    startVideoBtnId: "",
    timerId: "content_view",
    mainPageId: "title_home"
}

startSelect();
function startSelect() {
    sleep(10000);
    click(device.width / 2, device.height / 10 * 2);
    let joinConfig = commonFunction.assignConfig(config);
    while (true) {
        commonFunction.selectArticleById(joinConfig);
    }
}

