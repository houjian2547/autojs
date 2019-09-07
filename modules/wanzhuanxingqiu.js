var commonFunction = require('modules/commonFunction.js');
//文章定位点
var searchKey = "img_item3";
//文章金币计时器id
var timer = "img_red_pack";
//文章内部识别文字
var articleText = "关闭";
//浏览次数
var scanTime = 5;
//首页广告关闭id
var pageAdCloseId = "iv_delete";

//==============================程序启动区=======================================
scanArticle();

//=====================================scanArticle start===================================
//浏览文章
function scanArticle() {
    toastLog("请手动点击头条！！！");
    sleep(2000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    clearAd();
    //判断当页是否存在可以点击的文章
    if (!id(searchKey).find()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);
        return;
    }
    id(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            commonFunction.scanSingleArticle(timer, scanTime);
            sleep(2000);
        }
    });
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
}


//清理广告
function clearAd() {
    commonFunction.clickById(pageAdCloseId);
}
