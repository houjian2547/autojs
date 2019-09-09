var commonFunction = {};
var defaultConfig = {
    articleModuleName: "文章",
    videoModuleName: "视频",
    littleVideoModuleName: "短视频",
    goodsModuleName: "逛逛领金币",
    moduleNameArray: [],  //模块名称数组
    scanTimes: 10,     //浏览次数
    launchAppWaitTime: 10 * 1000   //等待app启动时间
}

/**
 * 赋值配置
 * @param {目标配置} targetConfig 
 */
commonFunction.assignConfig = function (sourceConfig) {
    return Object.assign(defaultConfig, sourceConfig);
}

/**
 * UI选择一个模块
 * @param {模块名称数组} moduleNameArray 
 */
commonFunction.selectModule = function (joinConfig) {
    //选择ui
    let index = dialogs.select("请选择一个模块", joinConfig.moduleNameArray);
    if (index < 0) {
        toast("您取消了选择");
        exit();
    }
    toastLog("您选择的是" + joinConfig.moduleNameArray[index]);
    return index;
}

/**
 * 通过脚本名称后缀选择路径
 * @param {脚本名称} scriptName 
 */
commonFunction.selectScript = function (scriptName) {
    var spitArray = scriptName.split("_");
    return engines.execScriptFile("/sdcard/脚本/modules/" + spitArray[1] + "/" + spitArray[0] + ".js");
}

/**
 * 浏览视频-不进入
 * @param {配置属性：startVideoBtnId} config 
 */
commonFunction.scanVideoNotIn = function (config) {
    if (id(config.startVideoBtnId).findOne(500) != null) {
        id(config.startVideoBtnId).find().forEach(function (pos) {
            let posb = pos.bounds();
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                click(posb.centerX(), posb.centerY());
                toastLog("点击视频播放按钮！");
                sleep(10000);
            }
        });
    }
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
}

/**
 * 浏览视频-进入
 * @param {配置属性：startVideoBtnId} config 
 */
commonFunction.scanVideoIn = function (config) {
    if (id(config.startVideoBtnId).findOne(500) != null) {
        id(config.startVideoBtnId).find().forEach(function (pos) {
            let posb = pos.bounds();
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                click(posb.centerX(), posb.centerY());
                toastLog("点击视频播放按钮！");
                sleep(2000);
                commonFunction.scanSingleArticle(config);
                sleep(2000);
            }
        });
    }
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
}

/**
 * 选择某一篇文章阅读
 * @param {配置属性： articleId,timerId,scanTimes,mainPageId} config 
 */
commonFunction.selectArticleById = function (config) {
    commonFunction.preHandle();
    //判断当页是否存在可以点击的文章
    if (id(config.articleId).findOne(500) == null) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);
        return;
    }
    id(config.articleId).find().forEach(function (pos) {
        let posb = pos.bounds();
        if (pos.text().search("(广告)") == -1) {
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                click(posb.centerX(), posb.centerY());
                toastLog("点击了文章，准备进入文章！");
                sleep(2000);
                commonFunction.scanSingleArticle(config);
                sleep(2000);
            }
        }
    });
    swipe(device.width / 2, device.height / 6 * 5, device.width / 2, device.height / 6, 2000);
}

//文章里阅读循环
commonFunction.scanSingleArticle = function (config) {
    if (id(config.timerId).findOne(500) != null) {
        toastLog("金币阅读计时圈存在，开始浏览文章");
        for (let i = 1; i <= config.scanTimes; i++) {
            commonFunction.preHandle();
            toastLog("浏览文章:" + i + "/" + config.scanTimes);
            swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);
            sleep(random(2, 5) * 1000);
        }
        toastLog("浏览文章结束");
    }
    commonFunction.returnMainPageById(config);
}

//文章内前置处理
commonFunction.preHandle = function () {
    commonFunction.clickByText("拒绝");
    //闪电盒子
    commonFunction.clickById("unlike_ll");//不喜欢 按钮
    //想看
    let fudai_btn_id = "rec_task_btn";//首页领金币按钮
    let fudai_btn_text = "领金币";//首页领金币按钮
    let more_minute_btn_id = "more_minute_btn";//更多时间提醒
    let fudai_icon_id = "fudai_icon";//福袋icon id
    commonFunction.clickByText(fudai_btn_text);
    commonFunction.clickById(more_minute_btn_id);
    commonFunction.clickById(fudai_icon_id);
    commonFunction.clickById(fudai_btn_id);
    //中青看点
    // commonFunction.clickById("x2");//首页领取金币按钮
    commonFunction.clickById("kn");//首页广告，关闭按钮
    //玩赚星球
    commonFunction.clickById("iv_delete");
    commonFunction.clickById("iv_do_more_task_btn");

}


//根据主页标识id退回主页并判断
commonFunction.returnMainPageById = function (config) {
    for (let i = 1; i < 4; i++) {
        toastLog("退回次数:" + i + "/4");
        back();
        sleep(1000);
        if (id(config.mainPageId).exists()) {
            toastLog("已退回到主页");
            break;
        }
        toastLog("主页不存在");
    }
}

//判断是否为主页
commonFunction.ifMainPageById = function (config) {
    if (!id(config.mainPageId).exists()) {
        return false;
    }
    return true;
}

/**
* 启动app，进入app主页
* @param appName
* @param launchAppWaitTime   等待时间，单位秒
*/
commonFunction.enterMainPage = function (appName) {
    toastLog("等待" + appName + "启动");
    launchApp(appName);
    sleep(defaultConfig.launchAppWaitTime);
    // commonFunction.clickByText("跳过");
    // commonFunction.clickByText("开启消息推送");
    // commonFunction.clickById("normaldlg_btn_close");
}

//停止当前脚本
commonFunction.stopCurrent = function (exectuion) {
    exectuion.getEngine().forceStop();
    sleep(2000);
    // back();
    // sleep(1000);
    // back();
    // sleep(1000);
    home();
    sleep(5000);
}

//循环滑动小视频
commonFunction.whileScanVideo = function () {
    let swipeCount = 1;
    while (true) {
        toastLog("滑动次数:" + swipeCount);
        commonFunction.scanLittlVideo();
        swipeCount++;
    }
}

//单次上滑小视频
commonFunction.scanLittlVideo = function () {
    let randomSleepTime = random(5, 10);
    sleep(randomSleepTime * 1000);
    // toast("观看时间:" + randomSleepTime);
    gesture(500, [random(300, 600), 1600], [random(300, 600), 200])
}



//判断计时器是否存在
commonFunction.ifTimerExistsById = function (timerId) {
    let exists_timer = false;
    if (id(timerId).exists()) {
        exists_timer = true;
    }
    return exists_timer;
}


//UI:选择一个app
commonFunction.selectAppName = function (appNameOptions) {
    //选择ui
    let indexOption = dialogs.select("请选择一个要运行的app名字", appNameOptions);
    //取消了选择
    if (indexOption < 0) {
        toast("您取消了选择");
        exit();
    }
    return indexOption;
}

//对象转换成所有key的数组
commonFunction.objTransKeyArray = function (obj) {
    let array = [];
    for (let index in obj) {
        array.push(index);
    }
    return array;
}

//对象转换成所有value的数组
commonFunction.objTransValueArray = function (obj) {
    let array = [];
    for (let index in obj) {
        array.push(obj[index]);
    }
    return array;
}


//准备工作
commonFunction.prepareThings = function () {
    log(">>>>>>>>>>>>>>>>>>>>>准备工作开始<<<<<<<<<<<<<<<<<<<<<<");
    // auto.waitFor(); 
    // auto.setMode("fast");
    //按键监听
    commonFunction.registEvent();
    //唤醒屏幕，解锁
    // commonFunction.wakeUpScreen();
    //屏幕分辨率适配
    commonFunction.setScreenMetrics();
    commonFunction.requestScreenCaptureTest();
    String.prototype.endWith = function (endStr) {
        var d = this.length - endStr.length;
        return (d >= 0 && this.lastIndexOf(endStr) == d);
    }
    log(">>>>>>>>>>>>>>>>>>>>>准备工作结束<<<<<<<<<<<<<<<<<<<<<<");
}

//屏幕分辨率适配
commonFunction.setScreenMetrics = function () {
    let width = device.width;
    let height = device.height;
    log("屏幕宽度" + width + ",屏幕高度：" + height);
    setScreenMetrics(width, height);
}

//请求截图测试
commonFunction.requestScreenCaptureTest = function () {
    if (!requestScreenCapture()) {
        toastLog("请求截图失败");
        exit();
    }
}

/**
* 获取截图
*/
commonFunction.getCaptureImg = function () {
    let img0 = captureScreen();
    if (img0 == null || typeof (img0) == "undifined") {
        toastLog("截图失败,退出脚本");
        exit();
    } else {
        return img0;
    }
}

/**
* 根据text值 点击
* @param text
*/
commonFunction.clickByText = function (text) {
    if (textEndsWith(text).exists()) {
        textEndsWith(text).find().forEach(function (pos) {
            let posb = pos.bounds();
            click(posb.centerX(), posb.centerY());
            toastLog("点击了" + text);
        });
    }
}

/**
* 根据id值 点击
* @param clickId
*/
commonFunction.clickById = function (clickId) {
    if (id(clickId).exists()) {
        id(clickId).find().forEach(function (pos) {
            let posb = pos.bounds();
            click(posb.centerX(), posb.centerY());
            toastLog("点击了" + clickId);
        });
    }
}

/**
* 根据描述值 点击
* @param desc
*/
commonFunction.clickByDesc = function (desc) {
    if (descEndsWith(desc).exists()) {
        descEndsWith(desc).find().forEach(function (pos) {
            let posb = pos.bounds();
            click(posb.centerX(), posb.centerY());
        });
    }
}

/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */
commonFunction.registEvent = function () {
    //启用按键监听
    events.observeKey();
    //监听音量上键按下
    events.onKeyDown("volume_up", function (event) {
        toastLog("脚本手动退出");
        exit();
    });
}

//唤醒屏幕，解锁，定制我自己的手机
commonFunction.wakeUpScreen = function () {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1000);
        swipe(500, 1000, 500, 30, 500);//上滑调出解锁界面
        sleep(1000);
        //模拟手势操作解锁
        gesture(1000, [545, 1212], [250, 1500], [825, 1500], [545, 1212]);
        sleep(1000);
    }
}


//强制关闭app
commonFunction.shutdownApp = function (appName) {
    let packageName = app.getPackageName(appName);
    app.openAppSetting(packageName);
    sleep(2000);
    // text(app.getAppName(packageName)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*|.*确.*|.*定.*)/).findOne().click();
        sleep(2000);
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        toastLog(app.getAppName(packageName) + "应用已被关闭");
        back();
        home();
    } else {
        toastLog(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
        home();
    }
}




//===================================公共方法区  end=====================================

module.exports = commonFunction;