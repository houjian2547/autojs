var commonFunction = require('modules/commonFunction.js');

click(device.width / 4, device.height / 4);
sleep(1000);
click(device.width / 4, device.height / 4);
commonFunction.whileScanVideo();
