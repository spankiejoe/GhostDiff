var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.onCallback = function(message) {
  console.log((message?'equal':'not equal'));
  phantom.exit(message?0:1);
};

function initClient(url, image_one, image_two){
	page.open(url, function (status) {
		if (status !== 'success') {
			console.log('Unable to load the address!');
		} else {
			page.evaluate(function(image_one, image_two){

				var a = new Image(),
            b = new Image(),
            count = 0;

				a.onload = b.onload = function () {
					count++;
					if (count >= 2) {
            window.callPhantom(imagediff.equal(a, b, 64));
					}
				};

        document.body.appendChild(a);
        document.body.appendChild(b);

				a.src = image_one;
				b.src = image_two;

			}, image_one, image_two);
		}
	});
}
function waitFor(evaluate, message, waitForMilliseconds) {

    var self = this;
    var startTimer = new Date().getTime();

    var now = new Date().getTime();
    var result;

    while(!(result = evaluate()) && (now - startTimer < waitForMilliseconds)) {
        now = new Date().getTime();
    }
    if(!result) {
        console.log(message);
    }
    return result;

}

if(phantom.args.length === 2) {
  var fs = require('fs');
  if(fs.isFile(phantom.args[0]) && fs.isFile(phantom.args[1])) {
    initClient('diff.html', phantom.args[0], phantom.args[1]);
  } else {
    console.log('Missing File');
    phantom.exit(1);
  }
} else {
  console.log('Usage: ghostdiff image_1.png image_2.png');
  phantom.exit(1);
}