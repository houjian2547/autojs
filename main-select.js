auto();
var commonFunction = require('modules/commonFunction.js');

var scriptName_appName_obj = {
    zhifubao_other: "支付宝",
    shandianhezi_article: "闪电盒子",
    taozuiredian_article: "淘最热点",
    weili_article: "微鲤",
    xiangkan_article: "想看",
    souhuzixun_article: "搜狐资讯",
    jukandian_article: "聚看点",
    zhongqingkandian_article: "中青看点",
    ertoutiao_article: "二头条",
    diandianxinwen_article: "点点新闻",
    tutoutiao_article: "兔头条",
    jingcaitoutiao_article: "精彩头条",
    guangyingxinwen_article: "光影新闻",
    zhangshangredian_articleAndLittleVideo: "掌上热点",
    xiaoniaokankan_articleAndLittleVideo: "小鸟看看",
    shuabaoduanshipin_littleVideo: "刷宝短视频",
    huoshanjisuban_littleVideo: "火山极速版",
    kuaishoujisuban_littleVideo: "快手极速版"
};

var scriptNameArray = commonFunction.objTransKeyArray(scriptName_appName_obj);
var appZHNameArray = commonFunction.objTransValueArray(scriptName_appName_obj);
var littleVideoAppNameArray =
    [
        scriptName_appName_obj.zhangshangredian_articleAndLittleVideo,
        scriptName_appName_obj.xiaoniaokankan_articleAndLittleVideo,
        scriptName_appName_obj.huoshanjisuban_littleVideo,
        scriptName_appName_obj.shuabaoduanshipin_littleVideo,
        scriptName_appName_obj.kuaishoujisuban_littleVideo
    ];

//==============================程序启动区=======================================
mainEntrence();
//==============================程序主要步骤=======================================
function mainEntrence() {
    commonFunction.prepareThings();
    let indexOption = commonFunction.selectAppName(appZHNameArray);
    commonFunction.enterMainPage(appZHNameArray[indexOption]);
    let scriptName = scriptNameArray[indexOption];
    //选择运行的脚本
    var exectuion = commonFunction.selectScript(scriptName);
    //判断是否7点前，如果是，停止刷当前的，开始顺序刷小视频
    stopCurrentScript(exectuion);
    //顺序刷小视频
    scanLittlVideos();

}

//8点以前停止当前脚本
function stopCurrentScript(exectuion) {
    let isIExec = true;
    while (isIExec) {
        if (new Date().getHours() < 7 || new Date().getHours() >= 23) {
            isIExec = false;
        }
        sleep(60 * 1000);//每一分钟检测一次
    }
    //停止脚本
    toastLog("停止当前脚本");
    commonFunction.stopCurrent(exectuion);
}


//顺序刷小视频
function scanLittlVideos() {
    let normalRumTime;
    while (true) {
        for (let i = 0; i < littleVideoAppNameArray.length; i++) {
            if (i < 3) {
                normalRumTime = 10 * 60; //掌上热点，小鸟看看，火山极速版   10分钟
            } else {
                normalRumTime = 30 * 60; //刷宝短视频，快手极速版
            }
            commonFunction.enterMainPage(littleVideoAppNameArray[i]);
            exec(littleVideoAppNameArray[i], normalRumTime);
        }
    }
}

//执行脚本
function exec(appName, seconds) {
    let startDate = new Date();//开始时间
    let exectuion = engines.execScriptFile("/sdcard/脚本/modules/littleVideo/xiaoshipin.js");
    //计时器，检测时间
    let isIExec = true;
    while (isIExec) {
        //计时
        let runSeconds = ((new Date().getTime()) - startDate.getTime()) / 1000;
        toastLog(appName + "已执行" + runSeconds / 60 + "分钟");
        if (runSeconds > seconds) {
            isIExec = false;
        }
        sleep(60 * 1000);//每一分钟检测一次
    }
    //停止脚本
    toastLog(appName + "执行停止");
    commonFunction.stopCurrent(exectuion);
}