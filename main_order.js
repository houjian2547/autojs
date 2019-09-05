//引入外部模块
var commonFunction = require('modules/commonFunction.js');

//要启动的app名称
var appName_shuabaoduanshipin = "刷宝短视频";
var appName_huoshanjisuban = "火山极速版";
var appName_kuaishoujisuban = "快手极速版";
var appName_douyinjisuban = "抖音极速版";
var appName_quanminxiaoshipin = "全民小视频";
var appNameArray = [appName_shuabaoduanshipin, appName_huoshanjisuban, appName_kuaishoujisuban, appName_douyinjisuban, appName_quanminxiaoshipin];

//新闻类的列表
// var newsList = ["weili", "xiangkan"];
//视频类的列表
// var videoList = ["shuabaoduanshipin", "huoshanjisuban", "kuaishoujisuban", "douyinjisuban"];

//每次阅读的时间:秒
var normalRumTime = 20 * 60;

init();
function init() {
    //准备工作
    commonFunction.prepareThings();
    while (true) {
        for (var i = 0; i < appNameArray.length; i++) {
            toastLog("准备进入" + appNameArray[i]);
            commonFunction.enterMainPage(appNameArray[i]);
            click(device.width / 4, device.height / 4);
            // exec(videoList[i], normalRumTime);
            exec(appNameArray[i], normalRumTime);
        }
        //7点前刷视频
        // if (new Date().getHours() > 7) {
        //     var appNum = newsList.length;
        //     for (var i = 0; i < appNum; i++) {
        //         exec(newsList[i], normalRumTime);
        //     }
        // } else {
        // }
    }
}

//执行脚本
function exec(appName, seconds) {
    //开始执行
    var startDate = new Date();//开始时间
    var exectuion = engines.execScriptFile("/sdcard/脚本/modules/xiaoshipin.js");
    //计时器，检测时间
    var isIExec = true;
    while (isIExec) {
        //计时
        var runSeconds = ((new Date().getTime()) - startDate.getTime()) / 1000;
        toastLog(appName + "已执行" + runSeconds + "秒");
        if (runSeconds > seconds) {
            isIExec = false;
        }
        sleep(60 * 1000);//每一分钟检测一次
    }
    //停止脚本
    toastLog(appName + "执行停止");
    stopCurrent(exectuion);
}

//停止当前脚本
function stopCurrent(exectuion) {
    exectuion.getEngine().forceStop();
    sleep(2000);
    // back();
    // sleep(1000);
    // back();
    // sleep(1000);
    home();
    sleep(5000);
}