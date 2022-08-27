
var base_url = undefined;

var Module = {
	loadingFinished: 0,
	preRun: [],
	postRun: [],

	locateFile: function (file_base) {
		if (Module._log_enabled == true)
			console.log('locateFile for ', file_base, ': ', this._data_base_url + file_base);
		return this._data_base_url + file_base
	},
	replaceBaseUrl: function (file_url) {
		return file_url.split(this._data_base_url)[1]
	},

	_amt_publisher: "custom",	//will be auto-replaced in post build event
	_app_version: "current_app_version",
	_amt_custom_publisher_name: "itchio",	//for manual setup custom publisher name
	_files_for_download: [],
	_build_info_host: 'https://bfg.amt-games.com',
	_build_info_uri_base: '/web_build/get_info',
	_data_base_url: null,
	_log_enabled: false,
	_cElemsPosCoef_FullScreen: 1.00,
	_cElemsPosCoef_Default: 0.98,
	_manualElemsPositionCoef: 0.98,

    // login facebook
	_wantToLoginFacebook: 0,
	wantToLoginFacebook: function() {
		_wantToLoginFacebook = 1
	},
	isWantToLoginFacebook: function() {
		return _wantToLoginFacebook
	},

	_startAfterMiniGameStarted: false,
	_miniGameStartedHandler: null,
	_miniGameFinishedHandler: null,


	_build_info_url: function () {
		var urlStr = this._build_info_host + this._build_info_uri_base + '/' + this._amt_publisher + "/" + this._app_version
		if (Module.isMiniGameEnabled())
			urlStr += "?is_premium=true"

		if (Module._log_enabled == true)
			console.log('_build_info_url: ', urlStr);

		return urlStr
	},

	//this params needed for input field can interact with keyboard
	doNotCaptureKeyboard: true,
	keyboardListeningElement: document.getElementById('input_holder'),

	print: (function () {
		var element = document.getElementById('output');
		if (element) element.value = ''; // clear browser cache
		return function (text) {
			text = Array.prototype.slice.call(arguments).join(' ');
			console.log(text);
			if (element) {
				element.value += text + "\n";
				element.scrollTop = element.scrollHeight; // focus on bottom
			}
		};
	})(),
	printErr: function (text) {
		text = Array.prototype.slice.call(arguments).join(' ');
		if (0) { // XXX disabled for safety typeof dump == 'function') {
			dump(text + '\n'); // fast, straight to the real console
		} else {
			console.error(text);
		}
	},
	canvas: (function () {
		var canvas = document.getElementById('canvas');

		//make the canvas fullscreen
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight - 5;		//-4 - it's some magic offset for avoid to scrollbar appearing

		// As a default initial behavior, pop up an alert when webgl context is lost. To make your
		// application robust, you may want to override this behavior before shipping!
		// See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
		canvas.addEventListener("webglcontextlost", function (e) {
			alert('WebGL context lost. You will need to reload the page.');
			e.preventDefault();
		}, false);

		canvas.backgroundColor = '#FFFFFFFF';

		return canvas;
	})(),
	setStatus: function (text) {
		if (!Module.setStatus.last) Module.setStatus.last = {time: Date.now(), text: ''};
		if (text === Module.setStatus.text) return;
		var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
		var now = Date.now();
		if (m && now - Date.now() < 30) return; // if this is a progress update, skip it if too soon
		if (m) {
			text = m[1];
		}
	},
	totalDependencies: 0,
	monitorRunDependencies: function (left) {
		this.totalDependencies = Math.max(this.totalDependencies, left);
	},

	baseLoadingFinished: false,
	switchToTheGame: function (text) {

		var canvas = document.getElementById('canvas');
		canvas.style.visibility = 'visible';

		var elemsToHide = ['loading_logo', 'elem_loading_hint', 'elem_loading_hint_text', 'elem_loading_bar_bg', 'elem_loading_bar', 'elem_loading', 'loading_text', 'imagey8'];
		for (var i in elemsToHide)
		{
			var elem = document.getElementById(elemsToHide[i])
			if (elem)
			{
				elem.style.display = 'none';
			}
		}

		this.baseLoadingFinished = true;

		if (typeof bfg_mini_game !== 'undefined' && bfg_mini_game.isStarted())
			bfg_mini_game.onMainGameLoadingFinished();
	},

	onGameInitialLoadingProgress: function (loadedCount, totalCount) {
		if (Module._log_enabled == true)
			console.log('onGameInitialLoadingProgress: ', loadedCount + '/' + totalCount);

		var percent = 0;
		if (totalCount > 0)
			percent = Math.round((loadedCount*100)/totalCount);
		if (percent < 0)
			percent = 0;
		else if (percent > 100)
			percent = 100;

		var loadingText = document.getElementById('loading_text');
		loadingText.innerHTML = downloadingBaseText + ' ' + percent.toString() + '%'; 
		loadingText.innerHTML += ' (' + 
									(loadedCount / (1024.0*1024.0)).toFixed(2) + 'Mb /' + 
									(totalCount / (1024.0*1024.0)).toFixed(2) + 'Mb' +
									')';

		var loadingBar = document.getElementById('elem_loading_bar');
		loadingBar.style.visibility = 'visible';
		loadingBar.style.width = percent.toString() + '%';

		document.getElementById('elem_loading_bar_bg').style.visibility = 'visible';

		this.baseLoadingFinished = true;
	},

	listenEventsFromMiniGame: function() {

		try {
			var eventMethod = (window.addEventListener ? "addEventListener" : "attachEvent");
			var eventer = window[eventMethod];
			var messageEvent = (eventMethod === "attachEvent" ? "onmessage" : "message");
	
			eventer(messageEvent, function (e)
			{
				if (e.data === "bfg_mini_game_started" || e.message === "bfg_mini_game_started")
				{
					if (Module._startAfterMiniGameStarted == true)
					{
						console.log('Start game after mini game');
						moduleStart();	//recall
					}
					if (Module._miniGameStartedHandler != null)
					{
						try {
							Runtime.dynCall('v', Module._miniGameStartedHandler);
							Module._miniGameStartedHandler = null;
						}
						catch (e) {
							console.log('Fail to call mini game started handler: ' + e.toString());
						}
					}
				}
				else if (e.data === "bfg_mini_game_finished" || e.message === "bfg_mini_game_finished")
				{
					bfg_mini_game.stop();

					if (Module._miniGameFinishedHandler != null)
					{
						try {
							Runtime.dynCall('v', Module._miniGameFinishedHandler);
							Module._miniGameFinishedHandler = null;
						}
						catch (e) {
							console.log('Fail to call mini game finished handler: ' + e.toString());
						}
					}
				}
			});
		}
		catch (e)
		{
			console.log('Mini game initializing exception due to call listenFinishEvent: ', e.toString());
		}
	
	},

	startMiniGameBefore: function() {
		if (typeof bfg_mini_game !== 'undefined' && bfg_mini_game.isNeedStartBefore())
		{
			Module._startAfterMiniGameStarted = true;
			Module.listenEventsFromMiniGame();
			bfg_mini_game.start();
			return true;
		}
		return false;
	},

	startMiniGameAfter: function(c_miniGameStartedHandler) {
		if (typeof bfg_mini_game !== 'undefined' && bfg_mini_game.isNeedStartAfter())
		{
			Module._miniGameStartedHandler = c_miniGameStartedHandler;
			Module.listenEventsFromMiniGame();
			bfg_mini_game.start();
			return true;
		}
		return false;
	},

	setMiniGameFinishHandler: function(c_handler) {
		Module._miniGameFinishedHandler = c_handler;
	},

	isMiniGameStarted: function() {
		return (typeof bfg_mini_game !== 'undefined' && bfg_mini_game.isStarted());
	},

	isMiniGameNeedStartAfter: function() {
		return (typeof bfg_mini_game !== 'undefined' && bfg_mini_game.isNeedStartAfter());
	},

    isMiniGameEnabled: function() {
		return (typeof bfg_mini_game !== 'undefined' && bfg_mini_game.isEnabled());
	},

};

window.onerror = function (event) {
	// TODO: do not warn on ok events like simulating an infinite loop or exitStatus
	//Module.setStatus('Exception thrown, see JavaScript console');
	//spinnerElement.style.display = 'none';
	Module.setStatus = function (text) {
		if (text) Module.printErr('[post-exception status] ' + text);
	};
};


function moduleStart() {

	if (Module.startMiniGameBefore())
		return;		//wait event from mini game and recall

	var XMLHttpURL = Module._build_info_url()
	var get_info = new XMLHttpRequest();

	get_info.onload = function () {
		var result = JSON.parse(this.responseText);
		Module._data_base_url = result.cdn_base_path;
		if (Module._log_enabled == true)
			console.log('get_info.onload: ', Module._data_base_url);
		for(var i in result.files_list){
			var file = result.files_list[i];
			if (Module._log_enabled == true)
				console.log('get_info.onload: ', i, '-', file);
			Module._files_for_download.push({
				'file_base': file,
				'file_url': Module.locateFile(file),
				'size_bytes': result.files_size[i]
			})
		}
		downloadFiles()
	};

	get_info.onerror = function () {
	console.log("XMLHttpRequest: ERROR:", get_info.statusText);  
	};

	get_info.onreadystatechange = function (oEvent) {  
		if (get_info.readyState === 4) {  
			if (get_info.status != 200) { 
			console.log("XMLHttpRequest: request failed from '" + XMLHttpURL + "':", get_info.statusText);  
			} 
		}
	};

	console.log('Start game info loading...');

	get_info.open("GET", XMLHttpURL, true);
	get_info.send();
}

function downloadFiles() {
	for (var download_index in Module._files_for_download) {
		var file_data = Module._files_for_download[download_index];
		file_data.done = false;
		file_data.ready_bytes = 0;

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.download_index = download_index;
		xmlhttp.onprogress = function (event) {
			Module._files_for_download[this.download_index]['ready_bytes'] = event.loaded;
		};
		xmlhttp.onload = function () {
			Module._files_for_download[this.download_index].done = true;
			if (Module._log_enabled == true)
				console.log('xmlhttp.onload: ', Module._files_for_download[this.download_index].file_base);
			validate_results();
		};
		xmlhttp.open("GET", file_data.file_url, true);
		xmlhttp.send();

		setTimeout(onLoadingProgress, 500);
	}
}

var validate_results = function () {
	var ready = true;
	for (var i in Module._files_for_download) {
		if (!Module._files_for_download[i].done) {
			ready = false
		}
	}
	if (ready) {
		if (Module._log_enabled == true)
			console.log('validate_results is ready!');

		for (var file_index in Module._files_for_download) {
			var file = Module._files_for_download[file_index];
			if (file.file_base.indexOf('js', this.length - 'js'.length) !== -1) {
				if (Module._log_enabled == true)
					console.log('Append file to document', file);
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = file.file_url;
				script.async = false;
				script.onload = function (e) { if (Module._log_enabled == true) console.log('script loaded: ', this.src); };
				document.body.appendChild(script);
			}
		}
	}
};

function onLoadingProgress() {
	var loading = document.getElementById('elem_loading');
	var loading_text = document.getElementById('loading_text');
	var total_total = 0;
	var total_ready = 0;
	for (var download_index in Module._files_for_download) {
		var file_data = Module._files_for_download[download_index];
		total_total += file_data.size_bytes;
		total_ready += file_data.ready_bytes;
	}
	if (total_total <= 0)
		total_total = 1;

	if (Module._log_enabled == true)
		console.log('onLoadingProgress: ', total_ready + '/' + total_total);

	if (loading.style.visibility != 'hidden' && Module.baseLoadingFinished == false) {
		var percent = total_ready * 100 / total_total;
		if (percent < 0)
			percent = 0;
		else if (percent > 100)
			percent = 100;
		loading_text.innerHTML = loadingBaseText + ' ' + parseInt(percent).toString() + '%';

		if (percent < 100)
			setTimeout(onLoadingProgress, 333);
		else
			setTimeout(function() { document.getElementById('loading_text').innerHTML = getReadyText; }, 333);
	}
}
