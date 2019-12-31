var commonFunction = require('modules/commonFunction.js');

var likeId = "image_view"; //点赞id
var focusId = "关注";
var tipShowId = "btn_view";//金币到账通知id
var swipeCount = 1;


whileScanVideo();

function whileScanVideo() {
    while (true) {
        scanVideo();
    }
}

//===================================================================
function scanVideo() {
    commonFunction.clickById(tipShowId);
    click(500, 1000);
    toastLog("滑动次数:" + swipeCount);
    commonFunction.scanLittlVideo();
    swipeCount++;
}


//点赞
function clickLike() {
    if (idEndsWith(likeId).exists()) {
        log("点赞存在");
        idEndsWith(likeId).find().forEach(function (pos) {
            var posb = pos.bounds();
            log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toast("点赞了");
        });
    }
}

//点关注
function clickFocus() {
    if (textEndsWith(focusId).exists()) {
        textEndsWith(focusId).find().forEach(function (pos) {
            var posb = pos.bounds();
            // log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                click(posb.centerX(), posb.centerY());
                toast("点击了" + focusId);
            }
        });
    }
}

