auto();
var commonFunction = require('modules/commonFunction.js');

var scriptName_appName_obj = {
    zhifubao: "支付宝",
    shandianhezi: "闪电盒子",
    souhuzixun: "搜狐资讯",
    jukandian: "聚看点",
    xiangkan: "想看",
    weili: "微鲤",
    zhongqingkandian: "中青看点",
    diandianxinwen: "点点新闻",
    ertoutiao: "二头条",
    guangyingxinwen: "光影新闻",
    zhangshangredian: "掌上热点",
    wanzhuanxingqiu: "玩赚星球",
    tutoutiao: "兔头条",
    shuabaoduanshipin: "刷宝短视频",
    huoshanjisuban: "火山极速版",
    kuaishoujisuban: "快手极速版"
};

var scriptNameArray = commonFunction.objTransKeyArray(scriptName_appName_obj);
var appZHNameArray = commonFunction.objTransValueArray(scriptName_appName_obj);
var littleVideoAppNameArray = [scriptName_appName_obj.shuabaoduanshipin, scriptName_appName_obj.appName_huoshanjisuban,
scriptName_appName_obj.appName_kuaishoujisuban];

//==============================程序启动区=======================================
mainEntrence();
//==============================程序主要步骤=======================================
function mainEntrence() {
    commonFunction.prepareThings();
    let indexOption = commonFunction.selectAppName(appZHNameArray);
    commonFunction.enterMainPage(appZHNameArray[indexOption]);
    let scriptName = scriptNameArray[indexOption];
    let exectuion = engines.execScriptFile("/sdcard/脚本/modules/" + scriptName + ".js");
    //判断是否8点前，如果是，停止刷当前的，开始顺序刷小视频
    stopCurrentScript(exectuion);
    //顺序刷小视频
    scanLittlVideos();

}

//8点以前停止当前脚本
function stopCurrentScript(exectuion) {
    let isIExec = true;
    while (isIExec) {
        if (new Date().getHours() < 8) {
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
    let normalRumTime = 20 * 60;  //每次阅读的时间(20分钟)
    while (true) {
        for (let i = 0; i < littleVideoAppNameArray.length; i++) {
            commonFunction.enterMainPage(littleVideoAppNameArray[i]);
            exec(littleVideoAppNameArray[i], normalRumTime);
        }
    }
}

//执行脚本
function exec(appName, seconds) {
    let startDate = new Date();//开始时间
    let exectuion = engines.execScriptFile("/sdcard/脚本/modules/xiaoshipin.js");
    //计时器，检测时间
    let isIExec = true;
    while (isIExec) {
        //计时
        let runSeconds = ((new Date().getTime()) - startDate.getTime()) / 1000;
        toastLog(appName + "已执行" + runSeconds + "秒");
        if (runSeconds > seconds) {
            isIExec = false;
        }
        sleep(60 * 1000);//每一分钟检测一次
    }
    //停止脚本
    toastLog(appName + "执行停止");
    commonFunction.stopCurrent(exectuion);
}