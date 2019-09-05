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
    //准备工作
    commonFunction.prepareThings();
    //选择用启动的app
    var indexOption = commonFunction.selectAppName(appNameArray);
    log("indexOption:" + indexOption);
    toastLog(appNameArray[indexOption]);
    commonFunction.enterMainPage(appNameArray[indexOption]);
    var scriptName = scriptNameArray[indexOption];
    var exectuion = engines.execScriptFile("/sdcard/脚本/modules/" + scriptName + ".js");
    exit();
}
