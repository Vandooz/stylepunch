// ==UserScript==
// @name            stylepunch
// @namespace       com.facepunch.style
// @version         0.0.1
// @description     Makes your facepunch ~stylish~
// @include         /http://.*facepunch\.com/.*/
// @include         /https?://.*facepunch\.com/.*/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @resource        preCSS https://raw.githubusercontent.com/xelivous/stylepunch/master/structure.css
// @resource        postCSS https://raw.githubusercontent.com/xelivous/stylepunch/master/foot.css
// @resource		lessCSS https://raw.githubusercontent.com/xelivous/stylepunch/master/color.less
// @license         MIT
// @grant           GM_getResourceText
// @grant			GM_getResourceURL
// ==/UserScript==

/* 
 CONFIG SHIT IS HERE
    be careful to not remove any apostraphes or commas
	
	naming scheme is based on a dark theme
	if you are making a light theme, invert the naming scheme
		
 */
var config = 
{ 
	bodyBG:    '#393039',
	
	linkColor: 'rgba(175, 195, 218, 1)',		// color all all links by default
	
	primaryBG: '#333333', 						// used for most large background objects, like posts, and various divs
	mainFontColor: '#cccccc',					// Most text will be this color
	
	secondaryBG: '#722C4A',						// stuff like the bar above entire postlist with "reply" on it
	headerFontColor: '#EFE9D8',					// stuff like the bar above entire postlist with "reply" on it
	
	tertiaryBG: 'rgb(72,90,113)',				// stuff like the bar above posts with the timestamp
	subheaderFontColor:	'rgb(197, 195, 187)', 	// stuff like the bar above posts with the timestamp
	
	goldMemberColor: 'rgb(222, 199, 121)',
	modMemberColor: 'rgb(121, 222, 152)',
	redColor: '#e07e7e', 						//used for everywhere color="red" is used, and also used for banned members
	
	newPostHighlightColor: 'rgb(5,171,224)',	// when you see a new post, this gradient color is behind the avatar
};
 

 
/* 
*******

DONUT TOUCH ALL OF THIS STUFF BELOW TIA 

*******
*/


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

//define variables for less
script = document.createElement('script');
script.textContent = 
  'less = {\
    env: "development",\
    poll: 1000,\
    functions: {},\
    dumpLineNumbers: "comments",\
    relativeUrls: true,\
	globalVars: '+config+'\
  };';

//add our basic structure styling
var style = document.createElement('style');
style.textContent = GM_getResourceText("preCSS");
head.parentNode.appendChild(style);

//process the color shit
var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet/less');
link.setAttribute('type', 'text/css');
link.setAttribute('href', GM_getResourceURL("lessCSS"));
head.parentNode.appendChild(link);

//add post-color overrides
style = document.createElement('style');
style.textContent = GM_getResourceText("postCSS");
head.parentNode.appendChild(style);

//add less.js
var script = document.createElement('script');
script.setAttribute('src', '//cdnjs.cloudflare.com/ajax/libs/less.js/1.7.5/less.min.js');
head.appendChild(script);
