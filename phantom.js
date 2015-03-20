var page = require('webpage').create();
page.viewportSize={
	width: 820,
	height:1060
};
page.zoomFactor = 1.5;
page.open('http://localhost:3000/file/out2.html', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('example.pdf');
  }
  phantom.exit();
});