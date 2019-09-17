var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "闪电盒子",
    articleId: "from_text",
    timerId: "back",        //文章来源id = title  新闻标题news-title  来源id = src-data-new  发布时间id = news-pubtime
    mainPageId: "bottom_container",
    scanTimes: 6
}

startSelect();
function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    joinConfig.moduleNameArray = [joinConfig.articleModuleName, joinConfig.littleVideoModuleName, joinConfig.goodsModuleName];
    let moduleIndex = commonFunction.selectModule(joinConfig);
    closeAd();
    if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.articleModuleName) {
        while (true) {
            commonFunction.selectArticleById(joinConfig);
        }
    } else if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.littleVideoModuleName) {
        commonFunction.whileScanVideo();
    } else if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.goodsModuleName) {
        scanGoods(joinConfig)
    }
}


/**
 * 逛逛领币：商品模块
 */
function scanGoods(joinConfig) {
    joinConfig.articleId = "retial_price_tv";
    joinConfig.timerId = "unlike_iv";
    //划过直播区
    while (true) {
        let liveZoneFlag = "直播中";
        let LiveZoneEndFlag = "更多热门直播";
        if (textEndsWith(LiveZoneEndFlag).exists() || id(joinConfig.articleId).exists()) {
            toastLog("已经出直播区");
            swipe(device.width / 2, device.height / 6 * 5, device.width / 2, device.height / 6, 500);//下滑
            break;
        } else if (textEndsWith(liveZoneFlag).exists()) {
            toastLog("还在直播区，滑动");
            swipe(device.width / 2, device.height / 6 * 5, device.width / 2, device.height / 6, 500);//下滑
        }
    }
    while (true) {
        commonFunction.selectArticleById(joinConfig);
    }
}

function closeAd() {
    if (textEndsWith("拒绝").exists()) {
        commonFunction.clickByText("拒绝");
        sleep(1000);
    }
}