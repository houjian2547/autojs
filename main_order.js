//引入外部模块
var commonFunction = require('modules/commonFunction.js');


//要启动的app名称
var appName_shuabaoduanshipin = "刷宝短视频";
var appName_huoshanjisuban = "火山极速版";
var appName_kuaishoujisuban = "快手极速版";
var appName_douyinjisuban = "抖音极速版";
var appNameArray = [appName_shuabaoduanshipin, appName_huoshanjisuban, appName_kuaishoujisuban, appName_douyinjisuban];



//新闻类的列表
var newsList = ["weili", "xiangkan"];
//视频类的列表
var videoList = ["shuabaoduanshipin", "huoshanjisuban", "kuaishoujisuban", "douyinjisuban"];

init();
function init() {
    //准备工作
    commonFunction.prepareThings();
    //每次阅读的时间:秒
    var normalRumTime = 20*60;
    while (true) {
        var appNum = newsList.length;
        for (var i = 0; i < appNum; i++) {
            commonFunction.enterMainPage(appNameArray[i]);
            exec(videoList[i], normalRumTime);
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
function exec(scriptName, seconds) {
    //开始执行
    var startDate = new Date();//开始时间
    var exectuion = engines.execScriptFile("/sdcard/脚本/modules/" + scriptName + ".js");
    //计时器，检测时间
    var isIExec = true;
    while (isIExec) {
        //计时
        var runSeconds = ((new Date().getTime()) - startDate.getTime()) / 1000;
        toastLog(scriptName + "已执行" + runSeconds + "秒");
        if (runSeconds > seconds) {
            isIExec = false;
        }
        sleep(60 * 1000);//每一分钟检测一次
    }
    //停止脚本
    toastLog(scriptName + "执行停止");
    stopCurrent(exectuion);
}

//停止当前脚本
function stopCurrent(exectuion) {
    toastLog("执行停止");
    exectuion.getEngine().forceStop();
    sleep(2000);
    back();
    sleep(1000);
    back();
    sleep(1000);
    home();
    sleep(5000);
}