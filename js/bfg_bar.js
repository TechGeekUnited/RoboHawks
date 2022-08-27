var getLanguage = function() {
	var lang = navigator.userLanguage || navigator.systemLanguage || navigator.language;
	if (lang.indexOf('-') !== -1)
		lang = lang.split('-')[0];
	if (lang.indexOf('_') !== -1)
		lang = lang.split('_')[0];
	return lang;
};

var isFacebook = function() {
	return (Module._amt_publisher == "facebook");
};

var loadingBaseText = '';
var downloadingBaseText = '';
var getReadyText = '';
var tips = null;
var likeText = '';
var inviteText = '';
var communityText = '';
var supportText = '';

var inviteMessageText = '';
var emailTitle = '';
var PlaceholderPlayerName = '';
var PlaceholderPlayerLevel = '';
var PlaceholderPlayerCounry = '';
var PlaceholderCorpName = '';
var PlaceholderThemeSelect = '';
var PlaceholderThemeOther = '';
var PlaceholderThemeLostAccount = '';
var PlaceholderThemeDidntReceivePurchase = '';
var PlaceholderThemeBug = '';
	
var valuePlayerName = "";
var valuePlayerLevel = "";
var valuePlayerCounry = "";
var emailBody = '';
var emailSendText = '';

var SetElementInnerText = function( elemName, textValue ) {
	var elem = document.getElementById(elemName);
	if (elem == null || elem == undefined)
		return;
	else
		elem.innerHTML = textValue;
}

// FOR PSEUDO
var UID = {
	_current: 0,
	getNew: function(){
		this._current++;
		return this._current;
	}
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	var _this = this;
	var _sheetId = "pseudoStyles";
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = "pseudoStyle" + UID.getNew();
	
	_this.className +=  " "+className; 
	
	_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
	_head.appendChild(_sheet);
	return this;
};

var SetElementPseudoClass = function( elemName, textValue ) {
	textValue = '"' + textValue + '"'
	var elem = document.getElementById(elemName);
	if (elem == null || elem == undefined)
		return;
	else
		elem.pseudoStyle("after","content",textValue);
};
//---

var localizePage = function() {
	try {
		if (getLanguage() == 'ru' || Module._amt_publisher == 'ok') 	//russian
		{
			tips = ['ÐÐµ Ð¿ÐµÑ€ÐµÐºÐ»ÑŽÑ‡Ð°Ð¹Ñ‚Ðµ Ð²ÐºÐ»Ð°Ð´ÐºÐ¸ Ð² Ð±Ð¾ÑŽ - Ð²Ñ‹ Ð¿Ð¾Ñ‚ÐµÑ€ÑÐµÑ‚Ðµ ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ðµ Ð¸ Ð¿Ð¾ÐºÐ¸Ð½ÐµÑ‚Ðµ Ð±Ð¾Ð¹', 
					'Ð”Ð»Ñ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ð¸Ð³Ñ€Ñ‹ Ñ‚Ñ€ÐµÐ±ÑƒÐµÑ‚ÑÑ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ° WebGL Ð² Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ°Ñ… Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ð°', 
					'ÐŸÑ€Ð¸ Ð¿Ñ€Ð¾Ð±Ð»ÐµÐ¼Ð°Ñ… Ñ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¾Ð¹ Ð¸Ð³Ñ€Ñ‹ - Ð¾Ñ‡Ð¸ÑÑ‚Ð¸Ñ‚Ðµ ÐºÑÑˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ð° (Ctrl + F5 Ð´Ð»Ñ Ð¥Ñ€Ð¾Ð¼Ð°)'];
			loadingBaseText = 'Ð—ÐÐ“Ð Ð£Ð—ÐšÐ';
			getReadyText = 'ÐŸÐ Ð˜Ð“ÐžÐ¢ÐžÐ’Ð¬Ð¢Ð•Ð¡Ð¬';
			downloadingBaseText = 'Ð—ÐÐ“Ð Ð£Ð—ÐšÐ';
			
			logintext = 'Ð›Ð¾Ð³Ð¸Ð½';
			likeText = 'ÐÑ€Ð°Ð²Ð¸Ñ‚ÑÑ';
			inviteText = (isFacebook() ? 'ÐŸÑ€Ð¸Ð³Ð»Ð°ÑÐ¸Ñ‚ÑŒ' : 'ÐŸÐ¾Ð´ÐµÐ»Ð¸Ñ‚ÑŒÑÑ');
			communityText = 'Ð¤Ð¾Ñ€ÑƒÐ¼';
			supportText = 'ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ°';
			fullscreenText = 'Ð Ð°Ð·Ð²ÐµÑ€Ð½ÑƒÑ‚ÑŒ';
			
			inviteMessageText = 'ÐŸÑ€Ð¸ÑÐ¾ÐµÐ´Ð¸Ð½ÑÐ¹Ñ‚ÐµÑÑŒ ÐºÐ¾ Ð¼Ð½Ðµ Ð² Ð½Ð¾Ð²Ð¾Ð¹ ÑƒÐ»ÐµÑ‚Ð½Ð¾Ð¹ Ð¸Ð³Ñ€Ðµ - Battle For the Galaxy!';
			emailTitle = 'ÐÐ´Ñ€ÐµÑ Ð´Ð»Ñ Ð¾Ñ‚Ð²ÐµÑ‚Ð°';
			emailBody = 'Ð’Ð°ÑˆÐµ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ';
			emailSendText = 'ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ';
			PlaceholderPlayerName = 'Ð˜Ð¼Ñ Ð¸Ð³Ñ€Ð¾ÐºÐ°';
			PlaceholderPlayerLevel = 'Ð’Ð°Ñˆ ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ';
			PlaceholderPlayerCounry = 'Ð’Ð°ÑˆÐ° ÑÑ‚Ñ€Ð°Ð½Ð°';
			PlaceholderCorpName = 'ÐšÐ¾Ñ€Ð¿Ð¾Ñ€Ð°Ñ†Ð¸Ñ, ÐµÑÐ»Ð¸ ÐµÑÑ‚ÑŒ';

			PlaceholderThemeSelect = 'Ð’Ñ‹Ð±Ñ€Ð°Ñ‚ÑŒ Ñ‚ÐµÐ¼Ñƒ';
			PlaceholderThemeOther = 'Ð”Ñ€ÑƒÐ³Ð¾Ðµ';
			PlaceholderThemeLostAccount = 'ÐŸÐ¾Ñ‚ÐµÑ€ÑÐ½Ð½Ñ‹Ð¹ Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚';
			PlaceholderThemeDidntReceivePurchase = 'ÐÐµ Ð·Ð°Ñ‡Ð¸ÑÐ»Ð¸Ð»Ð°ÑÑŒ Ð¿Ð¾ÐºÑƒÐ¿ÐºÐ°';
			PlaceholderThemeBug = 'Ð˜Ð³Ñ€Ð¾Ð²Ð¾Ð¹ Ð±Ð°Ð³';
		}
		else if (getLanguage() == 'cs')	//czech
		{
			tips = ['KdyÅ¾ bojujete nepÅ™epÃ­nejte zÃ¡loÅ¾ky, neaktivnÃ­ jsou v prohlÃ­Å¾eÄÃ­ch odpojena.', 
					'UjiÅ¡tÄ›te se Å¾e mÃ¡te v prohlÃ­Å¾eÄi povolenÃ© WebGL', 
					'KdyÅ¾ se hra nenaÄÃ­tÃ¡ zkuste vymazat mezipamÄ›Å¥ prohlÃ­Å¾eÄe (ctrl+f5 v chromu)'];
			loadingBaseText = 'NAÄŒÃTÃNÃ';
			getReadyText = 'PÅ˜IPRAVTE SE';
			downloadingBaseText = 'STAHOVÃNÃ';
			
			logintext = 'PÅ™ihlÃ¡Å¡enÃ­';
			likeText = 'LÃ­bÃ­ se mi';
			inviteText = (isFacebook() ? 'SdÃ­let' : 'SdÃ­let');
			communityText = 'Komunita';
			supportText = 'Podpora';
			fullscreenText = 'CelÃ¡ obrazovka';
			
			inviteMessageText = 'PÅ™ipojte se ke mnÄ› v novÃ©m cool hra - Battle for the Galaxy!';
			emailTitle = 'OdpovÄ›Ä e-mail';
			emailBody = 'VaÅ¡e zprÃ¡va';
			emailSendText = 'Poslat';
			PlaceholderPlayerName = 'JmÃ©no hrÃ¡Äe';
			PlaceholderPlayerLevel = 'VaÅ¡e ÃºroveÅˆ';
			PlaceholderPlayerCounry = 'ZemÄ›';
			PlaceholderCorpName = 'Korporace (pokud existujÃ­)';
			
			PlaceholderThemeSelect = 'Vyberte tÃ©ma';
			PlaceholderThemeOther = 'JinÃ©';
			PlaceholderThemeLostAccount = 'ZtracenÃ½ ÃºÅ™et';
			PlaceholderThemeDidntReceivePurchase = 'NepÅ™ijat koupenÃ½ objekt';
			PlaceholderThemeBug = 'Chyba ve hÅ™e';
		}
		else if (getLanguage() == 'fr')	//french
		{
			tips = ['Ne changez pas d\'onglet lors d\'un combat, les onglets inactifs peuvent Ãªtre dÃ©connectÃ©s', 
					'VÃ©rifiez que le WebGL est activÃ© sur votre navigateur',
					'Si le jeu ne charge pas, essayez d\'effacer le cache du navigateur (ctrl+f5)'];
			loadingBaseText = 'CHARGEMENT';
			downloadingBaseText = 'TELECHARGEMENT';
			getReadyText = 'SOYEZ PRET';

			logintext = 'Connexion';
			likeText = 'Like';
			inviteText = (isFacebook() ? 'Inviter' : 'Partager');
			communityText = 'CommunautÃ©';
			supportText = 'Support';
			fullscreenText = 'Plein Ã©cran';

			inviteMessageText = 'Rejoins-moi dans ce nouveau jeu extra - Battle for the Galaxy !';
			emailTitle = 'Email de rÃ©ponse';
			emailBody = 'Votre message';
			emailSendText = 'Envoyer';
			PlaceholderPlayerName = 'Nom de joueur';
			PlaceholderPlayerLevel = 'Votre niveau';
			PlaceholderPlayerCounry = 'Pays';
			PlaceholderCorpName = 'Corporation (si dispo)';
			
			PlaceholderThemeSelect = 'SÃ©lectionner sujet';
			PlaceholderThemeOther = 'Autre';
			PlaceholderThemeLostAccount = 'Perdu mes accÃ¨s';
			PlaceholderThemeDidntReceivePurchase = 'Objet achetÃ© non reÃ§u';
			PlaceholderThemeBug = 'Bug du jeu';
		}
		else 	//international
		{
			tips = ['Don\'t change tabs when in battle, inactive tabs are being disconnected in browsers', 
					'Make sure that WebGL support is enabled in browser',
					'If game doesn\'t load - try clearing browser\'s cache (ctrl+f5 for chrome)'];
			loadingBaseText = 'LOADING';
			downloadingBaseText = 'DOWNLOADING';
			getReadyText = 'GET READY';

			logintext = 'Login';
			likeText = 'Like';
			inviteText = (isFacebook() ? 'Invite' : 'Share');
			communityText = 'Community';
			supportText = 'Support';
			fullscreenText = 'Fullscreen';

			inviteMessageText = 'Join me in a new awesome game - Battle For The Galaxy!';
			emailTitle = 'Reply email';
			emailBody = 'Your message';
			emailSendText = 'Send';
			PlaceholderPlayerName = 'Player name';
			PlaceholderPlayerLevel = 'Your level';
			PlaceholderPlayerCounry = 'Country';
			PlaceholderCorpName = 'Corporation (if exist)';
			
			PlaceholderThemeSelect = 'Select topic';
			PlaceholderThemeOther = 'Other';
			PlaceholderThemeLostAccount = 'Lost my account';
			PlaceholderThemeDidntReceivePurchase = 'Didn\'t receive purchased item';
			PlaceholderThemeBug = 'Game bug';
		}
		
		SetElementInnerText( 'elem_loading_hint_text', tips[ Math.floor(Math.random()*tips.length) ] );
		SetElementInnerText( 'loading_text', loadingBaseText);
		
		SetElementPseudoClass( 'x1', logintext);
		SetElementPseudoClass( 'x2', likeText);
		SetElementPseudoClass( 'x3', inviteText);
		SetElementPseudoClass( 'x4', communityText);
		SetElementPseudoClass( 'x5', supportText);
		SetElementPseudoClass( 'x6', fullscreenText);
		
		//fix top bar for safari
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
		{
			document.getElementById('safarifix').style.webkitTransform = "translateZ(1000px)";
			document.getElementById('buttonscontainer').style.webkitTransform = "translateZ(2000px)";
		}
		var emailPlace = document.getElementById('emailplace') // check( if emailplace is exist then exists other elements )
		if (emailPlace != null && emailPlace != undefined) {
			document.getElementById('emailplace').placeholder = emailTitle;
			document.getElementById('playerplace').placeholder = PlaceholderPlayerName;
			document.getElementById('levelplace').placeholder = PlaceholderPlayerLevel;
			document.getElementById('counryplace').placeholder = PlaceholderPlayerCounry;
			document.getElementById('corpplace').placeholder = PlaceholderCorpName;
			document.getElementById('theme').options.item(0).text = PlaceholderThemeSelect;
			document.getElementById('theme').options.item(1).text = PlaceholderThemeOther;
			document.getElementById('theme').options.item(2).text = PlaceholderThemeLostAccount;
			document.getElementById('theme').options.item(3).text = PlaceholderThemeDidntReceivePurchase;
			document.getElementById('theme').options.item(4).text = PlaceholderThemeBug;
			document.getElementById('messageplace').placeholder = emailBody;
		}
		
		SetElementInnerText( 'sendbutton', emailSendText);
		
	} catch (e) {
		console.log("localizePage():ERROR: " + e);
	};
}

var gIsSuppurformSysFilled = false;

var FillPlayerInfoBlock = function() {
	var playerplace = document.getElementById('playerplace');
	var levelplace = document.getElementById('levelplace');
	var counryplace = document.getElementById('counryplace');
	var corpplace = document.getElementById('corpplace');
	
	if (gIsSuppurformSysFilled) {
		playerplace.value = valuePlayerName;
		levelplace.value = valuePlayerLevel;
		counryplace.value = valuePlayerCountry;
	}
		
	playerplace.readOnly = gIsSuppurformSysFilled;
	levelplace.readOnly = gIsSuppurformSysFilled;
	counryplace.readOnly = gIsSuppurformSysFilled;
	corpplace.readOnly = gIsSuppurformSysFilled;
	
	if (gIsSuppurformSysFilled) {
		document.getElementById('playerplace').style.display = 	'none';
		document.getElementById('levelplace').style.display = 	'none';
		document.getElementById('counryplace').style.display = 	'none';
		document.getElementById('corpplace' ).style.display = 	'none';
	} else {
		document.getElementById('playerplace').style.display = 	'block';
		document.getElementById('levelplace').style.display = 	'block';
		document.getElementById('counryplace').style.display = 	'block';
		document.getElementById('corpplace' ).style.display = 	'block';
	}
}

var GetValueFromGameInfo = function( param ) {
	var c_ptr = Module._malloc(param.length+1);
	writeAsciiToMemory(param, c_ptr);
	return Pointer_stringify( ccall('gameInfo_get', ['String'], [], [c_ptr]) );
}

function showPlayerInfo() {
	var doc = document.getElementById('theme').value;
	var playerplace = document.getElementById('playerplace');
	var levelplace = document.getElementById('levelplace');
	var counryplace = document.getElementById('counryplace');
	var corpplace = document.getElementById('corpplace');
	
	if (doc == 'Lost account') {
		playerplace.readOnly = false;
		levelplace.readOnly = false;
		counryplace.readOnly = false;
		corpplace.readOnly = false;
		playerplace.style.display = "block";
		levelplace.style.display = "block";
		counryplace.style.display = "block";
		corpplace.style.display = "block";
		playerplace.value = '';
		levelplace.value = '';
	} else {
  		GetPlayerInfo();
	}
}

var GetSysInfo = function() {
	if (Module.baseLoadingFinished) {
		try {
			appvplace.value = GetValueFromGameInfo("AppVersion"); // allow anyway, fill immediately
			idplace.value = GetValueFromGameInfo("playerID"); // allow anyway, fill immediately

			//fill add info
			var themeStr = theme.value;
			var referrer;
			if(window.self != window.top) referrer = document.referrer;
			else referrer = document.location.href;
			var referrerStr = referrer;
			var replyToStr = emailplace.value;
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if(dd < 10) { dd = '0' + dd; } 
			if(mm < 10) { mm = '0' + mm; }
			var dateStr = dd + '.' + mm + '.' + yyyy;			
			//addinfo.value = themeStr + " - " + referrerStr;
			addinfo.value = themeStr + " - " + referrerStr + " - " + replyToStr;
			//
		}
		catch (e) {
			console.log("GetSysInfo:ERROR: FAILED to get info! error: " + e);
		};
	}
}

var GetPlayerInfo = function() {
	if (Module.baseLoadingFinished) {
		try {
			var getInfo = GetValueFromGameInfo("playerName");
			if (getInfo != "") 		valuePlayerName = getInfo;
			var getInfo =  GetValueFromGameInfo("playerLevel");
			if (getInfo != "") 		valuePlayerLevel = getInfo;
			var getInfo = GetValueFromGameInfo("playerCountry");
			if (getInfo != "") 		valuePlayerCountry = getInfo;
			
			if (valuePlayerName != "" && valuePlayerLevel != "" && valuePlayerCountry != "")
				{ gIsSuppurformSysFilled = true; }
			
			FillPlayerInfoBlock();
		}
		catch (e) {
			console.log("GetPlayerInfo:ERROR: FAILED to get info! error: " + e);
		};
	}
}
function onLikeEnter() {
	document.getElementById('likebtn').style.display = "block";
	document.getElementById('noshow1').style.display = "none";
}
function hideLikeBtn() {
	document.getElementById('likebtn').style.display = "none";
	document.getElementById('noshow1').style.display = "block";
}
function onInviteClick() {
	if (isFacebook())
	{
		FB.ui({method: 'apprequests',
				message: inviteMessageText
			}, function(response){
				console.log('!!!invite response: ', response);
			}
		);
	}
	else	//show uptolike bar
	{
		document.getElementById('sharebuttons').style.display = "block";
		document.getElementById('noshow').style.display = "none";
	}
}
function hideInviteBar() {
	document.getElementById('noshow').style.display = "block"
	document.getElementById('sharebuttons').style.display = "none";
}
function onCommunityClick() {
	if (Module._amt_publisher == "fotostrana")
	    window.open('https://fotostrana.ru/public/346543/', '_blank');
	else if (Module._amt_publisher == "ok")
	    window.open('https://ok.ru/group/55252246462479', '_blank'); 
Â Â Â Â else if (getLanguage() == 'ru')
		window.open('https://vk.com/bftg.online', '_blank');
Â Â Â Â else
Â Â Â Â Â Â Â Â window.open('https://facebook.com/bftg.online', '_blank');
}
function onSupportClick() {
	showPlayerInfo();
	document.getElementById('supportform').style.top = "3.5vh";
}
function hideSupportForm() {
	document.getElementById('supportform').style.top = "-300px";
	document.getElementById('messageplace').style.height = "60px";
}
function onLoginClick() {
	//document.getElementById('loginFacebookButton').style.visibility = "hidden";
	if (Module.baseLoadingFinished) {
		ccall('signinFacebook', [], [], []);
	}
	else {
		Module.wantToLoginFacebook();
	}
}
