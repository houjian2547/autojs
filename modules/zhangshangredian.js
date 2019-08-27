var module_zhangshangredian = {};
var commonFunction;
//选择要启动的模块
var firstPage_option = "首页";
var video_option = "视频";
var options = [firstPage_option, video_option];

//文章定位点id
var searchKey = "tv_date";
//红包id
var redPackageId = "iv_red_package";
//视频按钮id
var videoButton = "iv_play";
//文章滑动次数
var scanTimes = 10;

//==============================程序启动区=======================================
module_zhangshangredian.start = function (common) {
    commonFunction = common;
    selectModule();
}
module_zhangshangredian.start_random = function (common) {
    commonFunction = common;
    selectArticle();
}
//=====================================selectModule start===================================
//选择模块
function selectModule() {
    var indexOption = dialogs.select("请选择一个模块", options);
    if (indexOption < 0) {
        toast("您取消了选择");
        exit();
    }
    toast("您选择的是" + options[indexOption]);
    if (options[indexOption] == firstPage_option) {
        scanArticle();
    } else if (options[indexOption] == video_option) {
        scanVideo();
    }
}

//=====================================scanArticle start===================================
//浏览文章
function scanArticle() {
    sleep(1000);
    if (textEndsWith(firstPage_option).exists()) {
        commonFunction.clickByText(firstPage_option);
    } else {
        toastLog("请手动点击！");
    }
    sleep(3000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    //判断当页是否存在可以点击的文章
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
        return;
    }
    //遍历点击文章
    id(">>>>>>>>>>>当页开始<<<<<<<<<");
    id(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1700) {
            log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            //开始浏览文章
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
    }
    back();
    sleep(1000);
    if (!textEndsWith(firstPage_option).exists()) {
        back();
    }
}


//=====================================scanVideo===================================

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
                if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1700) {
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

//=====================================end===================================
module.exports = module_zhangshangredian;