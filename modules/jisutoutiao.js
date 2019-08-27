var module_jisutoutiao = {};
var commonFunction;
//选择要启动的模块
var firstPage_option = "首页";
var searchKey = "tv_title";
//计时id
var timerId = "redpacket";
//首页广告关闭id
var adCloseId="iv_close";

//==============================程序启动区=======================================
module_jisutoutiao.start = function (common) {
    commonFunction = common;
    //选择模块
    scanArticle();
}
module_jisutoutiao.start_random = function (common) {
    commonFunction = common;
    selectArticle();
}
//=====================================scanArticle start===================================
//浏览文章
function scanArticle() {
    sleep(2000);
    while (true) {
        selectArticle();
    }
}
//选择某一篇文章
function selectArticle() {
    commonFunction.clickByText("拒绝");
    commonFunction.clickById(adCloseId);
    
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
        return;
    }
    //遍历点击文章
    toastLog(">>>>>>>>>>>当页开始<<<<<<<<<");
    id(searchKey).find().forEach(function (pos) {
        sleep(1000);
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            // log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            //开始浏览文章
            scanSingleArticle();
            sleep(1000);
        }
    });
    toastLog(">>>>>>>>>>>当页结束<<<<<<<<<");
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
}
//=====================================scanSingleArticle===================================
//文章内阅读循环
function scanSingleArticle() {
    if (!id(timerId).exists()) {
        toastLog("不是文章");
    } else {
        toastLog("是文章");
        sleep(10 * 1000);
    }
    if (textEndsWith(firstPage_option).exists()) {
        toastLog("是首页");
        return;
    }
    toastLog("不是首页，退出");
    back();
    sleep(1000);
    if (!textEndsWith(firstPage_option).exists()) {
        commonFunction.enterMainPage("极速头条");
        this.scanArticle();
    }
}
//=====================================end===================================
module.exports = module_jisutoutiao;