var module_wanzhuanxingqiu = {};
var commonFunction = require('modules/commonFunction.js');
//选择要启动的模块
var firstPage_option = "头条";
//文章定位点
var searchKey = "tv_time";//文章时间
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
module_wanzhuanxingqiu.start = function (common) {
    commonFunction = common;
    scanArticle();
}
module_wanzhuanxingqiu.start_random = function (common) {
    commonFunction = common;
    selectArticle();
}
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
    //遍历点击文章
    click(device.width / 2, device.height / 2);
    toastLog("点击了文章，准备进入文章！");
    //开始浏览文章
    sleep(2000);
    scanSingleArticle();
    sleep(2000);
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
}

//文章里阅读循环
function scanSingleArticle() {
    if (id(timer).exists()) {
        toastLog(">>>>>>>>>>>金币阅读计时圈存在，开始浏览文章<<<<<<<<<");
        for (var i = 1; i <= scanTime; i++) {
            if (!id(timer).exists()) {
                back();
                sleep(1000);
            }
            toastLog("浏览文章:" + i + "/" + scanTime);
            swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
            sleep(random(2, 5) * 1000);
        }
        toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    }
    //退回主页
    back();
}

//清理广告
function clearAd() {
    commonFunction.clickById(pageAdCloseId);
}

//=====================================end===================================
// module.exports = module_wanzhuanxingqiu;