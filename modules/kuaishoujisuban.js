var commonFunction;
var module_kuaishoujisuban = {};

//===================================================
var swipeCount = 1;

module_kuaishoujisuban.start = function (common) {
    commonFunction = common;
    while (true) {
        scanVideo();
    }
}
module_kuaishoujisuban.start_random = function (common) {
    commonFunction = common;
    scanVideo();
}
//===================================================================
function scanVideo() {
    click(300,600);
    //随机滑动
    var randomNum = random(5, 15);
    sleep(randomNum * 1000);
    toast("sleep:" + randomNum + ", swipeCount:" + swipeCount);
    gesture(1500, [random(300, 600), 1600], [random(300, 600), 200])
    swipeCount++;
}

module.exports = module_kuaishoujisuban;