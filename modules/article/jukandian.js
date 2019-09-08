var commonFunction = require('modules/commonFunction.js');


//文章金币计时器id
//收藏按钮id
var commentCollectId = "tv_web_comment_hint";
var commentCollectId_v2 = "v2_video_detail_bottom_comment_collect";
//评论层id
var commentLayoutId = "ll_web_write_comment_layout";
var commentLayoutId_v2 = "v2_video_detail_bottom_comment_write_layout";
// 评论文字id 
var commentTextId = "tv_web_comment_hint";
var commentTextId_v2 = "v2_video_detail_bottom_comment_write_text";
//分享id
var commentShareId = "ll_share_layout";
var commentShareId_v2 = "v2_video_detail_bottom_comment_share";
//集合
var timers = [commentCollectId, commentLayoutId, commentTextId, commentShareId,
    commentCollectId_v2, commentLayoutId_v2, commentTextId_v2, commentShareId_v2];


var config = {
    appName: "聚看点",
    articleId: "item_artical_three_read_num",
    startVideoBtnId: "item_video_play",
    timerId: "tv_web_comment_hint",
    mainPageId: "ll_tab1_layout"
}

startSelect();

function startSelect() {
    let joinConfig = commonFunction.assignConfig(config);
    joinConfig.moduleNameArray = [joinConfig.articleModuleName, joinConfig.videoModuleName];
    let moduleIndex = commonFunction.selectModule(joinConfig);
    closeAd();
    if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.articleModuleName) {
        while (true) {
            commonFunction.selectArticleById(joinConfig);
        }
    } else if (joinConfig.moduleNameArray[moduleIndex] == joinConfig.videoModuleName) {
        while (true) {
            commonFunction.scanVideoIn(joinConfig);
        }
    }
}

function closeAd() {
    //启动首页的广告关闭按钮
    var signCloseBtnId = "v2_sign_close_button";
    var adCloseBtnId = "image_user_task_pop_close";
    commonFunction.clickById(signCloseBtnId);
    commonFunction.clickById(adCloseBtnId);

    commonFunction.clickByText("领金币");
    commonFunction.clickByText("继续阅读");
    commonFunction.clickByText("继续赚钱");
    commonFunction.clickByText("忽略");
    commonFunction.clickById("cancel_quit");
    commonFunction.clickById("dismisstv");
    commonFunction.clickById("icon_home_left_timer_lq");
    sleep(500);
    commonFunction.clickById("dialog_close");
    sleep(500);
}