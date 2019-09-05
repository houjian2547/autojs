var commonFunction = require('modules/commonFunction.js');
//滑动次数
var swipeCount = 1;

whileScanVideo();

function whileScanVideo() {
    while (true) {
        scanVideo();
    }
}

function scanVideo() {
    var randomSleepTime = random(5, 10);
    sleep(randomSleepTime * 1000);
    toast("观看时间:" + randomSleepTime + ", 滑动次数:" + swipeCount);
    // var randomWidth = random(device.width / 4, device.width / 4 * 3);
    // gesture(400, [randomWidth, device.height / 10 * 9], [randomWidth, device.height / 10])
    gesture(500, [random(300, 600), 1600], [random(300, 600), 200])
    swipeCount++;
}

