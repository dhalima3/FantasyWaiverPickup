var username = "";
var password = "";
var league = "";

var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});

//First step is to open Facebook
casper.start().thenOpen(league, function() {
    console.log("Facebook website opened");
    this.capture('BeforeLogin.png');
});


//Now we have to populate username and password, and submit the form
casper.then(function(){
    console.log("Login using username and password");
    this.evaluate(function(){
        document.getElementById("login-username").value= username;
		document.getElementById("login-passwd").value= password;
		document.getElementById("login-signin").click();
    });
});

//Wait to be redirected to the Home page, and then make a screenshot
casper.then(function(){
    console.log("Make a screenshot and save it as AfterLogin.png");
	this.wait(6000);//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
    this.capture('AfterLogin.png');
});

casper.run();
