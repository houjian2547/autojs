auto();

var commonFunction = require('modules/commonFunction.js');

var scriptNameArray = ['zhifubao', 'shandianhezi', 'souhuzixun', 'jukandian', 'xiangkan', 'weili', 'zhongqingkandian',
    'diandianxinwen', 'ertoutiao', 'guangyingxinwen', 'zhangshangredian', 'wanzhuanxingqiu', 'tutoutiao',
    'shuabaoduanshipin', 'huoshanjisuban', 'kuaishoujisuban'];
//============================== 全局变量=======================================

//要启动的app名称
var appName_zhifubao = "支付宝";
var appName_shandianhezi = "闪电盒子";
var appName_souhuzixun = "搜狐资讯";
var appName_jukandian = "聚看点";
var appName_xiangkan = "想看";
var appName_weili = "微鲤";
var appName_zhongqingkandian = "中青看点";
var appName_diandianxinwen = "点点新闻";
var appName_ertoutiao = "二头条";
var appName_guangyingxinwen = "光影新闻";
var appName_zhangshangredian = "掌上热点";
var appName_wanzhuanxingqiu = "玩赚星球";
var appName_tutoutiao = "兔头条";
var appName_shuabaoduanshipin = "刷宝短视频";
var appName_huoshanjisuban = "火山极速版";
var appName_kuaishoujisuban = "快手极速版";
//可以选择的模块
var appNameArray = [appName_zhifubao,
    appName_shandianhezi, appName_souhuzixun,
    appName_jukandian, appName_xiangkan, appName_weili,
    appName_zhongqingkandian, appName_diandianxinwen, appName_ertoutiao,
    appName_guangyingxinwen, appName_zhangshangredian, appName_wanzhuanxingqiu, appName_tutoutiao,
    appName_shuabaoduanshipin, appName_huoshanjisuban, appName_kuaishoujisuban];

//==============================程序启动区=======================================
//程序主入口
mainEntrence();
//==============================程序主要步骤=======================================
function mainEntrence() {
    commonFunction.prepareThings();
    var indexOption = commonFunction.selectAppName(appNameArray);
    commonFunction.enterMainPage(appNameArray[indexOption]);
    var scriptName = scriptNameArray[indexOption];
    var exectuion = engines.execScriptFile("/sdcard/脚本/modules/" + scriptName + ".js");

    //8点以前顺序刷小视频
    var isIExec = true;
    while (isIExec) {
        if (new Date().getHours() < 8) {
            isIExec = false;
        }
        sleep(60 * 1000);//每一分钟检测一次
    }
    //停止脚本
    toastLog(appName + "执行停止");
    commonFunction.stopCurrent(exectuion);

    //顺序刷小视频
    scanLittlVideos();

}


//顺序刷小视频
function scanLittlVideos() {
    var littleVideoAppNameArray = [appName_shuabaoduanshipin, appName_huoshanjisuban, appName_kuaishoujisuban, appName_quanminxiaoshipin];
    var normalRumTime = 20 * 60;//每次阅读的时间(20分钟)
    while (true) {
        for (var i = 0; i < littleVideoAppNameArray.length; i++) {
            commonFunction.enterMainPage(littleVideoAppNameArray[i]);
            exec(littleVideoAppNameArray[i], normalRumTime);
        }
    }
}

//执行脚本
function exec(appName, seconds) {
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
    commonFunction.stopCurrent(exectuion);
}