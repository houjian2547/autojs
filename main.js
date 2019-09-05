auto();

//引入外部模块
var commonFunction = require('modules/commonFunction.js');
var module_zhifubao = require('modules/zhifubao.js');
var module_shandianhezi = require('modules/shandianhezi.js');
var module_souhuzixun = require('modules/souhuzixun.js');
var module_jukandian = require('modules/jukandian.js');
var module_xiangkan = require('modules/xiangkan.js');
var module_weili = require('modules/weili.js');
var module_zhongqingkandian = require('modules/zhongqingkandian.js');
var module_diandianxinwen = require('modules/diandianxinwen.js');
var module_ertoutiao = require('modules/ertoutiao.js');
var module_guangyingxinwen = require('modules/guangyingxinwen.js');
var module_zhangshangredian = require('modules/zhangshangredian.js');
var module_wanzhuanxingqiu = require('modules/wanzhuanxingqiu.js');
var module_tutoutiao = require('modules/tutoutiao.js');
var module_shuabaoduanshipin = require('modules/shuabaoduanshipin.js');
var module_huoshanjisuban = require('modules/huoshanjisuban.js');
var module_kuaishoujisuban = require('modules/kuaishoujisuban.js');
// var module_qutoutiao = require('modules/qutoutiao.js');
// var module_huitoutiao = require('modules/huitoutiao.js');
// var module_jisutoutiao = require('modules/jisutoutiao.js');
//各app模块
var moduleNameArray = [module_zhifubao, module_shandianhezi, module_souhuzixun,
    module_jukandian, module_xiangkan,
    module_weili, module_zhongqingkandian, module_diandianxinwen,
    module_ertoutiao, module_guangyingxinwen, module_zhangshangredian,
    module_wanzhuanxingqiu, module_tutoutiao,
    module_shuabaoduanshipin, module_huoshanjisuban, module_kuaishoujisuban];

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
// var appName_qutoutiao = "趣头条";
// var appName_huitoutiao = "惠头条";
// var appName_jisutoutiao = "极速头条";
//可以选择的模块
var appNameArray = [appName_zhifubao,
    appName_shandianhezi, appName_souhuzixun,
    appName_jukandian, appName_xiangkan, appName_weili,
    appName_zhongqingkandian, appName_diandianxinwen, appName_ertoutiao,
    appName_guangyingxinwen, appName_zhangshangredian, appName_wanzhuanxingqiu, appName_tutoutiao,
    appName_shuabaoduanshipin, appName_huoshanjisuban, appName_kuaishoujisuban,
    "随机应用"];

//随机应用多少分钟换一次app
var appTime = 10;

//==============================程序启动区=======================================
//程序主入口
mainEntrence();
//==============================程序主要步骤=======================================
function mainEntrence() {
    //准备工作
    commonFunction.prepareThings();
    //选择用启动的app
    var indexOption = commonFunction.selectAppName(appNameArray);
    log("indexOption:" + indexOption);
    toastLog(appNameArray[indexOption]);
    if (indexOption == (appNameArray.length - 1)) {
        log("随机应用");
        //随机应用
        randomApp();
    } else {
        //其他应用
        commonFunction.enterMainPage(appNameArray[indexOption]);
        moduleNameArray[indexOption].start(commonFunction);
    }
}
//==============================随机应用程序主入口=======================================
//随机应用程序主入口
function randomApp() {
    while (true) {
        mainEntrence_random();
    }
}
function mainEntrence_random() {
    //排除  0支付宝 和 最后一个 随机应用
    var randomNum = random(1, (appNameArray.length - 2));
    toastLog("randomNum:" + randomNum);
    commonFunction.enterMainPage(appNameArray[randomNum]);
    var startTime = new Date().getMinutes();
    // var startTime = new Date().getSeconds();
    toastLog("startTime:" + startTime);
    var endTime = startTime;
    while (true) {
        toastLog("app：" + appNameArray[randomNum] + "，运行分钟数:" + Math.abs(endTime - startTime));
        if (Math.abs(endTime - startTime) >= appTime) {
            toastLog(">>>>>运行时间超过" + appTime + "分钟，换app<<<<<<");
            commonFunction.shutdownApp(appNameArray[randomNum]);
            sleep(1000);
            break;
        }
        moduleNameArray[randomNum].start_random(commonFunction);
        endTime = new Date().getMinutes();
        // endTime = new Date().getSeconds();
        toastLog("endTime:" + endTime);
    }
}