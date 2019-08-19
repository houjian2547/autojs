var module_ertoutiao = {};
var commonFunction;
//选择要启动的模块
var firstPage_option = "首页";
var video_option = "视频";
var fiction_option = "小说";
var options = [firstPage_option, video_option, fiction_option];
//文章定位点：新闻来源
var searchKey = "tv_item_homeChildContent_source";
//浏览次数
var scanTime = 10;
//视频播放id
var videoButton = "vw_item_videoChildContent_frame";
//小说页面id
var fictionPageId = "read_pv_page";
//首页广告关闭按钮id
var pageAdCloseId = "iv_close";
//==============================程序启动区=======================================
module_ertoutiao.start = function (common) {
    commonFunction = common;
    //选择模块
    selectModule();
}
module_ertoutiao.start_random = function (common) {
    commonFunction = common;
    selectArticle();
}
//=====================================selectModule start===================================
//选择模块
function selectModule() {
    //选择ui
    var indexOption = dialogs.select("请选择一个模块", options);
    //取消了选择
    if (indexOption < 0) {
        toast("您取消了选择");
        exit();
    }
    //选择了某一项
    toast("您选择的是" + options[indexOption]);
    if (options[indexOption] == firstPage_option) {
        scanArticle();
    } else if (options[indexOption] == video_option) {
        scanVideo();
    } else if (options[indexOption] == fiction_option) {
        scanFiction();
    }
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
    commonFunction.clickById(pageAdCloseId);
    //判断当页是否存在可以点击的文章
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
        return;
    }
    //遍历点击文章
    toastLog("当页浏览开始！");
    id(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            scanSingleArticle();
            sleep(2000);
        }
    });
    toastLog("当页浏览结束！");
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
}

//=====================================scanVideo===================================
/**
 * 浏览视频
 */
function scanVideo() {
    if (!textEndsWith(video_option).exists()) {
        toastLog("请手动点视频按钮！");
    } else {
        toastLog("自动识别到视频按钮，点击进入！");
        commonFunction.clickByText(video_option);
    }
    sleep(3000);
    //开始浏览视频
    while (true) {
        if (id(videoButton).exists()) {
            id(videoButton).find().forEach(function (pos) {
                var posb = pos.bounds();
                if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                    // log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
                    click(posb.centerX(), posb.centerY());
                    toastLog("点击播放按钮！");
                    sleep(2000);
                    scanSingleArticle();
                    sleep(1000);
                }
            });
        }
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
    }
}
//=====================================scanSingleArticle===================================
//文章内阅读循环
function scanSingleArticle() {
    toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
    for (var i = 0; i < scanTime; i++) {
        toastLog("浏览文章" + i);
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
        sleep(random(2, 4) * 1000);
    }
    toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    back();
}
//=====================================scanFiction===================================
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
//=====================================end===================================
module.exports = module_ertoutiao;