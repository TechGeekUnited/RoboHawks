
fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
document.onkeydown = function(e){	
  if (e.keyCode==70 && e.altKey){
	e.stopPropagation();
	e.preventDefault();
	if (fullscreenElement == null || typeof fullscreenElement == "undefined"){
	   enterFullscreen('contentdiv');
	} else {
	   exitFullscreen('contentdiv');
	};
   };
 };
function onFullscreenClick() {
	if (fullscreenElement == null || typeof fullscreenElement == "undefined") {
		enterFullscreen('contentdiv');
	} else {
		if (!document.exitFullscreen)
			enterFullscreen('contentdiv');
		else
			exitFullscreen('contentdiv');
	};
};
document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen;
function enterFullscreen(id) {	

	//for safari hide buttonscontainer manually and set callback for show on exit fullscreen event 
	if (document.getElementById("buttonscontainer") != null) {
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

			document.getElementById("buttonscontainer").style.display = 'none';

			if (typeof changeFullscreenHandler == "undefined" || changeFullscreenHandler == null) {
				changeFullscreenHandler = function() {
					var fs = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
					if (fs == null)
						document.getElementById("buttonscontainer").style.display = 'inline-block';		//show it
				}
				document.addEventListener("webkitfullscreenchange", changeFullscreenHandler, false);
			}
		}
	}

	var el = document.getElementById(id);
	if (el.webkitRequestFullScreen) {
		el.webkitRequestFullScreen();
	} else {
		el.mozRequestFullScreen();
	};
	Module._manualElemsPositionCoef = Module._cElemsPosCoef_FullScreen;
	setTimeout(function(){fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;}, 300);
};
function exitFullscreen(id) {
	document.cancelFullScreen();
	Module._manualElemsPositionCoef = Module._cElemsPosCoef_Default;
	setTimeout(function(){fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;}, 300);
};
