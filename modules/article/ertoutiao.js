var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "二头条",
    articleId: "tv_item_homeChildContent_source",
    startVideoBtnId: "vw_item_videoChildContent_frame",
    timerId: "reader_center_img",
    mainPageId: "tv_act_main_home"
}

startSelect();

function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    joinConfig.moduleNameArray = [joinConfig.articleModuleName, joinConfig.videoModuleName];
    let moduleIndex = commonFunction.selectModule(joinConfig);
    closeAd();
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

function closeAd() {
    //首页广告关闭按钮id
    var ivClose = "iv_close";
    var adImageId = "iv_action_img";
    var incentivePopCloseId = "iv_view_incentivePop_close";
    commonFunction.clickById(incentivePopCloseId);
    sleep(500);
    commonFunction.clickById(ivClose);
    sleep(500);
    if (id(adImageId).exists()) {
        // commonFunction.clickById(pageAdCloseId);
        click(540, 1640);
    }
}

//======================================================================================

var fiction_option = "小说";
var fictionPageId = "read_pv_page";

/**
 * 浏览小说
 */
function scanFiction() {
    toastLog("请手动进入一篇小说阅读！");
    sleep(3000);
    //判断当页是否存在可以点击的文章
    if (!id(fictionPageId).exists()) {
        toastLog("未进入小说，等待");
        sleep(2000);
        return;
    }
    toastLog("已进入小说页面");
    while (true) {
        click(device.width / 5 * 4, device.height / 4 * 3);
        sleep(random(1, 3) * 1000);
    }
}