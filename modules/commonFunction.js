
var commonFunction = {};

//等待app启动时间
var waitTime = 10 * 1000;

/**
* 启动app，进入app主页
* @param appName
* @param waitTime   等待时间，单位秒
*/
commonFunction.enterMainPage = function (appName) {
    toastLog("等待" + appName + "启动");
    launchApp(appName);
    sleep(waitTime);
    // waitForPackage(getPackageName(appName));
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

//浏览小视频
commonFunction.scanLittlVideo = function () {
    var randomSleepTime = random(5, 10);
    sleep(randomSleepTime * 1000);
    toast("观看时间:" + randomSleepTime);
    // var randomWidth = random(device.width / 4, device.width / 4 * 3);
    // gesture(400, [randomWidth, device.height / 10 * 9], [randomWidth, device.height / 10])
    gesture(500, [random(300, 600), 1600], [random(300, 600), 200])
}


//根据主页标识id退回主页并判断
commonFunction.returnMainPageById = function (mainPageId) {
    for (var i = 1; i < 4; i++) {
        toastLog("退回次数" + i);
        back();
        sleep(2000);
        if (id(mainPageId).exists()) {
            toastLog("已退回到主页");
            return;
        }
    }
}

//判断是否为主页
commonFunction.ifMainPageById = function (mainPageId) {
    if (!id(mainPageId).exists()) {
        return false;
    }
    return true;
}


//判断计时器是否存在
commonFunction.ifTimerExistsById = function (timerId) {
    var exists_timer = false;
    if (id(timerId).exists()) {
        exists_timer = true;
    }
    return exists_timer;
}


//UI:选择一个app
commonFunction.selectAppName = function (appNameOptions) {
    //选择ui
    var indexOption = dialogs.select("请选择一个要运行的app名字", appNameOptions);
    //取消了选择
    if (indexOption < 0) {
        toast("您取消了选择");
        exit();
    }
    return indexOption;
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
    log(">>>>>>>>>>>>>>>>>>>>>准备工作结束<<<<<<<<<<<<<<<<<<<<<<");
}

//屏幕分辨率适配
commonFunction.setScreenMetrics = function () {
    var width = device.width;
    var height = device.height;
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
    var img0 = captureScreen();
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
            var posb = pos.bounds();
            // log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
            // if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 0 && posb.centerY() < 1800) {
            click(posb.centerX(), posb.centerY());
            toastLog("点击了" + text);
            // }
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
            var posb = pos.bounds();
            // log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
            // if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 0 && posb.centerY() < 1800) {
            click(posb.centerX(), posb.centerY());
            toastLog("点击了" + clickId);
            // }
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
            var posb = pos.bounds();
            // if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 0 && posb.centerY() < 1800) {
            click(posb.centerX(), posb.centerY());
            // }
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
    events.onKeyDown("KEYCODE_VOLUME_DOWN", function (event) {
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
    var packageName = app.getPackageName(appName);
    app.openAppSetting(packageName);
    sleep(2000);
    // text(app.getAppName(packageName)).waitFor();
    var is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*|.*确.*|.*定.*)/).findOne().click();
        sleep(2000);
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(packageName) + "应用已被关闭");
        back();
        home();
    } else {
        log(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
        home();
    }
}




//===================================公共方法区  end=====================================

module.exports = commonFunction;