var commonFunction = require('modules/commonFunction.js');
//滑动次数统计
var swipeCount = 1;

click(device.width / 4, device.height / 4);
whileScanVideo();

function whileScanVideo() {
    while (true) {
        toastLog("滑动次数:" + swipeCount);
        commonFunction.scanLittlVideo();
        swipeCount++;
    }
}

