
var commonFunction = require('modules/commonFunction.js');

var module_zhangshangredian = {};

//文章定位点id
var searchKey = "人看过";
//红包id
var redPackageId = "iv_red_package";
//文章滑动次数
var scanTimes = 10;

//==============================程序启动区=======================================

scanArticle();

module_zhangshangredian.start = function (common) {
    commonFunction = common;
    selectModule();
}
module_zhangshangredian.start_random = function (common) {
    commonFunction = common;
    selectArticle();
}

//=====================================scanArticle start===================================
//浏览文章
function scanArticle() {
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    //判断当页是否存在可以点击的文章
    if (!textEndsWith(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
        return;
    }
    //遍历点击文章
    toastLog(">>>>>>>>>>>当页开始<<<<<<<<<");
    textEndsWith(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1700) {
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            scanSingleArticle();
            sleep(2000);
        }
    });
    toastLog(">>>>>>>>>>>当页结束<<<<<<<<<");
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
}

//文章里阅读循环
function scanSingleArticle() {
    if (id(redPackageId).exists()) {
        toastLog(">>>>>>>>>>>浏览开始<<<<<<<<<");
        for (var i = 1; i <= scanTimes; i++) {
            toastLog("浏览次数" + i + "/" + scanTimes);
            swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
            sleep(random(2, 5) * 1000);
        }
        toastLog(">>>>>>>>>>浏览结束<<<<<<<<<<<<");
        back();
        sleep(1000);
        return;
    }
    //不是文章里面
    if(text("热点").exists()){
        toastLog("首页，不动");
    }else{
        toastLog("非首页，退出");
        back();
        sleep(1000);  
    }
}

//=====================================end===================================
// module.exports = module_zhangshangredian;