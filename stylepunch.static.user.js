// ==UserScript==
// @name            stylepunch static
// @namespace       com.facepunch.style
// @version         0.0.1
// @description     Makes your facepunch ~stylish~
// @include         /http://.*facepunch\.com/.*/
// @include         /https?://.*facepunch\.com/.*/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @resource        preCSS https://raw.githubusercontent.com/xelivous/stylepunch/master/structure.css
// @resource        postCSS https://raw.githubusercontent.com/xelivous/stylepunch/master/foot.css
// @resource		colorCSS https://raw.githubusercontent.com/xelivous/stylepunch/master/color.css
// @license         MIT
// @grant           GM_getResourceText
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];

//make a loop on load checking for new css until it's loaded everything
(function(){
    //get the container for the stylesheets
	var styles = head.getElementsByTagName("link");

	for (var x = 0; x < styles.length; x++) {
		if(styles[x].getAttribute('href').indexOf('.css') !== -1 && styles[x].getAttribute('href').indexOf('/editor.css?') === -1){
				styles[x].parentNode.removeChild(styles[x--]);
		}
	}
	
	// old shit that was removed partially
	/*if(!replacedLogo && document.getElementById('logo')){
		document.getElementById('logo').childNodes[0].childNodes[0].setAttribute('src',self.options.fplogo);
		replacedLogo = true;
	}*/
	
	if(document.readyState !== "complete"){
		setTimeout(arguments.callee, 50);
	}
})();

var head = document.getElementsByTagName('head')[0];

//hack because vbulletin puts everything together and we only want some of the sheets
var link = document.createElement('link');
link.setAttribute('href', '/css.php?styleid=6&langid=1&d=1404902503&td=ltr&sheet=bbcode.css,editor.css,popupmenu.css,tagcloud.css,sidebar.css');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type','text/css');
head.parentNode.appendChild(link);

//add our basic structure styling
var style = document.createElement('style');
style.textContent = GM_getResourceText("preCSS");
head.parentNode.appendChild(style);

//add the color shit
var style = document.createElement('style');
style.textContent = GM_getResourceText("colorCSS");
head.parentNode.appendChild(style);

//add post-color overrides
style = document.createElement('style');
style.textContent = GM_getResourceText("postCSS");
head.parentNode.appendChild(style);
