var commonFunction = require('modules/commonFunction.js');
var config = {
    appName: "闪电盒子",
    articleId: "image3",
    timerId: "back",        //文章来源id = title  新闻标题news-title  来源id = src-data-new  发布时间id = news-pubtime
    mainPageId: "bottom_container"
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
    joinConfig.articleId = "rmb_price";
    joinConfig.timerId = "unlike_ll";
    joinConfig.scanTimes = 6;
    //划过直播区
    while (true) {
        var liveZoneFlag = "直播中";
        var LiveZoneEndFlag = "更多热门直播";
        if (textEndsWith(LiveZoneEndFlag).exists() || id(joinConfig.articleId).exists()) {
            toastLog("已经出直播区");
            swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
            break;
        } else if (textEndsWith(liveZoneFlag).exists()) {
            toastLog("还在直播区，滑动");
            swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
        }
    }
    commonFunction.selectArticleById(joinConfig);
}

function closeAd() {
    if (textEndsWith("拒绝").exists()) {
        commonFunction.clickByText("拒绝");
        sleep(1000);
    }
}