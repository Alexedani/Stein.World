// ==UserScript==
// @name         Custom CSS Changes
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  script for customizing CSS
// @author       Poles
// @match        https://*.stein.world/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

// App settings
var appSettings = {};

// Very basic mapping of options
var settingsMap = {
	cusFont: {
		cls: "custom-font",
		label: "Use custom font"
	},
	fontSize: {
		cls: "fix-fontSize",
		label: "Fix guild chat tab fontsize"
	},
	brighterCol: {
		cls: "brightet-colours",
		label: "Brighter text colours"
	},
	transptWin: {
		cls: "transparent-windows",
		label: "Transparent window backgrounds"
	},
	adjWinSizes: {
		cls: "window-sizes",
		label: "Adjusted Window sizes"
	},
	hideScrollB: {
		cls: "hide-scrollbars",
		label: "Hide scrollbars"
	},
	mvTgtHpBar: {
		cls: "move-hp-bar",
		label: "Hp bar above quickbar"
	},
    mvLootPan: {
        cls: "move-loot-panel",
        label: "Loot panel in bottom right"
    },
    smallPanels: {
        cls: "smaller-panels",
        label: "Smaller player and loot panels"
    },
    disAccidBut: {
        cls: "disable-accident-buttons",
        label: "Disable buttons that cause accidents"
    },
	mvQbBar: {
		cls: "move-qbar",
		desc: "Quickbar location",
		allCls: ["qb-left", "qb-right"],
		options: {
			qbl: {
				cls: "qb-left",
				label: "Move quickbar left"
			},
			qbr: {
				cls: "qb-right",
				label: "Move quickbar right"
			}
		}
	}
};

//creates changes
function registerAltStyles() {
	const cfS = "body.custom-font ",
          fsS = "body.fix-fontSize ",
          bcS = "body.brightet-colours ",
          twS = "body.transparent-windows ",
          wsS = "body.window-sizes ",
          hsS = "body.hide-scrollbars ",
          hpbS = "body.move-hp-bar ",
          mdwS = "body.move-loot-panel ",
          plpS = "body.smaller-panels ",
          sttS = "body.disable-accident-buttons ",
          qblS = "body.qb-left ",
          qbrS = "body.qb-right ",
          ws = "::-webkit-scrollbar",
          sb = "::-webkit-inner-spin-button";
	var css = "",
		cf = "", //custom font
		fs = "", //font size of guild chat tab
		bc = "", //brighter text colours
		tw = "", //make windows transparent
		wS = "", //adjust some textarea/window sizes
		hs = "", //hide scrollbars
		hpb = "", //move target hp bar
        mdw = "", //move loot panel
        plp = "", //smaller player/loot panels
        stt = "", //disable buttons that cause accidents
		qbl = "", //quickbar left
		qbr = "";//quickbar right

	// 1. Custom font
	cf += cfS + '.stein-chat-content, '+cfS;
    cf += '{font-family: Fira Sans Condensed;}';

	// 2. Font size of guild chat tab
	fs += fsS + '.stein-chat-message-guild, '+fsS+'#stein-moderator-panel-chat-log-entries';
    fs += '{font-size: 14px;}';

	// 3. Brighter text colours
	//changes yellow colour (medium profession xp/service messages
	bc += bcS+'.professions-level-medium, '+bcS+'.stein-chat-message-service';
    bc += '{color: rgb(255,220,130);}';
	//changes red colour (red rarity/high profession xp/already learned//weapon level too high)
	bc += bcS+'#stein-tooltip .stein-tooltip-item-name[style*=\"rgb(204, 20, 20)\"], '+bcS+'.professions-level-high, '+bcS+'.stein-tooltip-item-level-to-low';
    bc += '{color: rgb(255,150,20) !important;}';
	//changes purple colour (purple rarity/whisper)
	bc += bcS+'#stein-tooltip .stein-tooltip-item-name[style*=\"rgb(184, 20, 204)\"], '+bcS+'.stein-chat-message-whisper-from, '+bcS+'.stein-chat-message-whisper-to';
    bc += '{color: rgb(250,180,255) !important;}';
	//changes blue colour (blue rarity/guild messages)
	bc += bcS+'#stein-tooltip .stein-tooltip-item-name[style*=\"rgb(18, 82, 179)\"], '+bcS+'.stein-chat-message-guild';
    bc += '{color: rgb(80,240,255) !important;}';
	//changes green colour (green rarity/normal profession xp/party messages/friendlist online)
	bc += bcS+'#stein-tooltip .stein-tooltip-item-name[style*=\"rgb(26, 128, 13)\"], '+bcS+'.professions-level-normal, '+bcS+'.stein-chat-message-party, '+bcS + '.friend-list-entry-state-online .friend-list-entry-state';
    bc += '{color: rgb(110,255,160) !important;}';
	//common rarity colour
	bc += bcS+'#stein-tooltip .stein-tooltip-item-name[style*=\"rgb(0, 0, 0)\"] ';
    bc += '{color: rgb(200,200,200) !important;}';

	// 4. Make windows transparent
    //remove borders
	tw += twS+'.stein-window-container, '+twS+'.stein-hub-friend-list-entry, '+twS+'.stein-hub-block-list-entr';
    tw += '{border: none;}';
	//backgrounds
	tw += twS+'.stein-window, '+twS+'.stein-window-container, '+twS+'#stein-context-menu, '+twS+'.stein-context-menu-item:hover, '+twS+'.stein-item-inventory-slot, '+twS+'#stein-hub-friend-list > div, '+twS+'#stein-hub-block-list > div, '+twS+'#stein-hub-window-container > div:nth-child(2) > div > div > div, '+twS+'.stein-table-entry:nth-of-type(even), '+twS+'#stein-hub-ranking-detail-container >  div > div > div:nth-child(2) > div';
    tw += '{background: rgba(0,0,0,0.2);}';
	//backgrounds where text colour changes were necessary
    tw += twS+'button:not(.selected-button), '+twS+'.button:not(.selected-button), '+twS+'#stein-payment-legal-text, '+twS+'#stein-tooltip, '+twS+'.stein-context-menu-item';
    tw += '{background: rgba(0,0,0,0.2); color: rgb(255,255,255);}';
	//input/text area/select area
	tw += twS+'input, '+twS+'textarea';
    tw += '{background: rgba(110,255,160,0.3); color: rgb(255,255,255);}';
    tw += twS+'select';
    tw += '{background: rgba(26,128,13,0.5); color: rgb(255,255,255);}';
	//persistent backgrounds
	tw += twS+'.stein-item-inventory-slot[style*=\"beer.png\"], '+twS+'.stein-item-inventory-slot[style*=\"trash_\"], '+twS+'.stein-item-inventory-slot[style*=\"potion\"], '+twS+'.stein-item-inventory-slot[style*=\"/prof_\"], '+twS+'.stein-item-inventory-slot[style*=\"broken_bones.png\"], '+twS+'.stein-item-inventory-slot[style*=\"tooth.png\"], '+twS+'.stein-item-inventory-slot[style*=\"rope.png\"]';
    tw += '{background-color: rgba(0,0,0,0) !important;}';
	//background image of professions
    tw += twS+'.stein-professions-side-bar-entry';
    tw += '{background-image: none !important;}';

	// 5. Adjust some textarea/window sizes
	wS += wsS+'#stein-guild-member-info-description, '+wsS+'#stein-guild-search-details-description';
    wS += '{max-width: min(1250px, calc(100% - 4px)); height: 140px;}';
    wS += wsS+'#stein-translation-edit textarea';
    wS += '{height: 150px;}';
    wS += wsS+'#stein-window-container-left > div';
    wS += '{max-height: min(700px, calc(100% - 12px)); margin-bottom: 20px;}';
    wS += wsS+'#stein-inventory-window-frame';
    wS += '{max-height: min(950px, calc(100% - 12px)); margin-top: 40px;}';
    wS += wsS+'#stein-chat-container';
    wS += '{max-height: 220px;}';

	// 6. Hide scrollbars
	hs += hsS+'#stein-player-trade-player-gold-amount'+sb+', '+hsS+'#stein-item-amount-value'+sb+', '+hsS+'#stein-mail-attachment-gold'+sb+', '+hsS+'#stein-hub-friend-list'+ws+', '+hsS+'#stein-hub-block-list'+ws+', '+hsS+'#stein-shop-entry-information-scroll-container'+ws+', '+hsS+'textarea'+ws+', '+hsS+'.stein-window-container'+ws+', '+hsS+'#stein-hub-window-container > div:nth-child(2) > div > div'+ws+', '+hsS+'#stein-guild-search-results'+ws+', '+hsS+'#stein-options-screen-container'+ws+', '+hsS+'#stein-hub-ranking-detail-container > div > div > div:nth-child(2)'+ws+', '+hsS+'.stein-table-entries'+ws+', '+hsS+'#stein-collection-group-container'+ws+', '+hsS+'#stein-inventory-scroll-container'+ws+'';
    hs += '{display: none;}';

	// 7. Move target hp bar
	hpb += hpbS+'#stein-target-container';
    hpb += '{bottom: 0%; right: 44.5%; top: auto; margin-bottom: 70px;}';
    hpb += hpbS+'#stein-target-forms, '+hpbS+'#stein-target-container';
    hpb += '{pointer-events:none;}';

    // 8. Move loot panel to bottom right
    mdw += mdwS+'.stein-need-or-greed';
    mdw += '{align-self: flex-end;}';

    // 9. Smaller player/loot containers
    plp += plpS+'.stein-name-panel, '+plpS+'.stein-party-member-name-panel';
    plp += '{display: none;}';
    plp += plpS+'.stein-player-resource, '+plpS+'.stein-target-resource';
    plp += '{line-height: 12px;}';
    plp += plpS+'.stein-need-or-greed-window';
    plp += '{height: 63px;}';
    plp += plpS+'.stein-need-or-greed-window > div:nth-child(1)';
    plp += '{height: 12px;}';
    plp += plpS+'#stein-dialog-window-container';
    plp += '{bottom: 70px;}';

    // 10. Disable buttons that cause accidents
    stt += sttS+'#stein-trade-window-sell-all-trash, '+sttS+'#stein-inventory-trash-confirm-button-trash, '+sttS+'#stein-wave-dungeon-reward-window-close-button, '+sttS+'#stein-party-leave-button';
    stt += '{pointer-events: none}';

	// 11. Quickbar left
	qbl += qblS+'#stein-quick-bar-container';
    qbl += '{left: 0; top: 25%; width: 56px; height: min-content;}';
    qbl += qblS+'#stein-quick-bar-frame';
    qbl += '{border-right: 0;}';
    qbl += qblS+'#stein-experience-bar';
    qbl += '{display: none;}';
    qbl += qblS+'#stein-quick-bar';
    qbl += '{flex-direction: column;}';

	// 12. Quickbar right
    qbr += qbrS+'#stein-quick-bar-container';
    qbr += '{right: 0; top: 25%; width: 56px; height: min-content;}';
    qbr += qbrS+'#stein-quick-bar-frame';
    qbr += '{border-left: 0;}';
    qbr += qbrS+'#stein-experience-bar';
    qbr += '{display: none;}';
    qbr += qbrS+'#stein-quick-bar';
    qbr += '{flex-direction: column;}';

    css += cf + fs + bc + tw + wS + hs + hpb + mdw + plp + stt + qbl + qbr;

    //margin between text and checkboxes
    css += '.stein-custom-option span';
    css += '{margin-left: 0.2em;}';
    //padding between headings
    css += '.stein-window-header-2';
    css += '{padding-top: 5px};';

	addGlobalStyle(css);
}

//Storage availability detection
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            //everything except Firefox
            e.code === 22 ||
            //Firefox
            e.code === 1014 ||
            //test name field too, because code might not be present
            //everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            //acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

//function to load settings
function loadData() {
    if (!localStorage && storageAvailable('localStorage')) localStorage = window.localStorage;
    if (localStorage && localStorage.getItem('settings')) appSettings = JSON.parse(localStorage.getItem('settings'));
}

//function to save settings
function saveData() {
    if (localStorage) localStorage.setItem('settings', JSON.stringify(appSettings));
}

// function for applying the changes
function addGlobalStyle(css) {
	var head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// ..Helper
function addSelect(parentElm, id, classAttr, optionsMap, desc, selectedOption) {
	var wrapper = document.createElement('DIV'),
		selectElm = document.createElement('SELECT'),
		selectLabel = document.createElement('SPAN'),
		optionElm = document.createElement('OPTION'),
		option, optionMeta, value, label;
	wrapper.id = id;
	wrapper.classList.add(classAttr);
	selectLabel.appendChild( document.createTextNode( desc ) );

	// add default
	optionElm.value = "";
	optionElm.appendChild( document.createTextNode( "Default" ) );
	selectElm.id = "sel-" + id;
	selectElm.setAttribute("name", "sel-" + id);
	selectElm.appendChild(optionElm);

	for (option in optionsMap) {
		if (optionsMap.hasOwnProperty(option)) {
			optionMeta = optionsMap[option];
			optionElm = document.createElement('OPTION');
			optionElm.value = option;
			optionElm.appendChild( document.createTextNode( optionMeta.label ) );
			if (selectedOption && selectedOption == option) optionElm.setAttribute('selected', 'selected');
			selectElm.appendChild(optionElm);
		}
	}
	wrapper.appendChild(selectElm);
	wrapper.appendChild(selectLabel);
	parentElm.appendChild(wrapper);
}

//adds checkboxes in the settings
function addCheckbox(parentElm, id, classAttr, value, label, isChecked) {
	const idWart = "chk-accstein-";
	var templateStructure = '<div id="{ID}" class="{CLASSNAME}"><input type="checkbox" name="chk-{ID}" id="chk-{ID}" value="{VALUE}"><label for="chk-{ID}" class="checkbox-label"></label><span>{LABEL}</span></div>',
		template = document.createElement('template'),
		html = templateStructure;

	html = html.replace(/\{ID\}/g, id);
	html = html.replace(/\{CLASSNAME\}/g, classAttr);
	html = html.replace(/\{VALUE\}/g, value);
	html = html.replace(/\{LABEL\}/g, label);
	template.innerHTML = html;
	parentElm.appendChild(template.content);

	if (isChecked) {
		var newCheckbox = parentElm.querySelector("#chk-" + id);
		if (newCheckbox) var settingCls = newCheckbox.setAttribute('checked', 'checked');
	}
}

// Handle <select> changes
function selectChange(evt) {
	const idWart = "sel-accstein-";
	var target = evt ? evt.target : null,
		targetID = target ? target.id : null,
		targetValue = target ? target.options[target.selectedIndex].value : null;

	if (targetID && targetID.startsWith(idWart)) {
		var setting = targetID.substr( idWart.length ),
			isSet = targetValue && 0 < targetValue.length,
			allCls = settingsMap[setting].allCls,
			settingCls = isSet? settingsMap[setting].options[targetValue].cls: null;
		document.body.classList.remove(...allCls);
		if (settingCls) document.body.classList.add(settingCls);
		appSettings[setting] = settingCls ? targetValue: false;
		if (false === appSettings[setting]) delete appSettings[setting];
		saveData();
	}
}

// Handle <input type="checkbox"> changes
function checkBoxChange(evt) {
	const idWart = "chk-accstein-";
	var target = evt? evt.target: null,
		targetID = target? target.id: null,
		targetChked = target? target.checked: false;

	if (targetID && targetID.startsWith(idWart)) {
		var setting = targetID.substr( idWart.length ),
			settingCls = settingsMap[setting].cls;
		if (targetChked) {
			document.body.classList.add(settingCls);
			appSettings[setting] = true;
		} else {
			document.body.classList.remove(settingCls);
			appSettings[setting] = false;
			delete appSettings[setting];
		}
		saveData();
	}
}

// Initialise new control elements
function initSettings() {
	const settingsElmParentId = 'stein-options-frame-interface',
		settingsRowClass = 'stein-custom-option',
		wrapperClass = 'stein-options-screen-interface-entries',
		wrapperElmId = 'accstein-custom-options';
	var parent = document.getElementById(settingsElmParentId),
		wrapper = document.getElementById(wrapperElmId),
		tmp, setting, id, classAttr, value, label,
		appSetVal, loadedCls,
		allTheCheckboxes, aCheckbox,
		allTheSelects, aSelect, i, sz;

	loadData();

	if (!wrapper) {
		wrapper = document.createElement('DIV');
		wrapper.id = wrapperElmId;
		wrapper.classList.add(wrapperClass);

        //adds header for new options
        var header = document.createElement('DIV');
        header.classList.add('stein-window-header-2');
        header.appendChild( document.createTextNode("Custom Interface Options") );
        parent && parent.appendChild(header);

		// Run over the settings we have to create our custom
		// settings
		for (setting in settingsMap) {
			if (settingsMap.hasOwnProperty(setting)) {
				tmp = settingsMap[setting];
				id = 'accstein-' + setting;
				appSetVal = ('undefined' != typeof appSettings[setting] && appSettings[setting]) ? appSettings[setting] : false;
				loadedCls = false;
				if ('undefined' != typeof tmp.cls && 'undefined' != typeof tmp.label) {
					value = 1;
					label = tmp.label;
					addCheckbox(wrapper, id, settingsRowClass, value, label, appSetVal);
					loadedCls = (appSetVal) ? tmp.cls : false; // cheater bool cast
				} else if ('undefined' != typeof tmp.cls && 'undefined' != typeof tmp.options) {
					addSelect(wrapper, id, settingsRowClass, tmp.options, tmp.desc, appSetVal);
					if (appSetVal && 'undefined' != typeof tmp.options[appSetVal]) loadedCls = tmp.options[appSetVal].cls;
				}

				// If we have a setting loaded then we need to add the classes
				if (loadedCls) document.body.classList.add(loadedCls);
			}
		}

		// Hook up event listeners
		parent && parent.appendChild(wrapper);
		allTheCheckboxes = parent ? parent.querySelectorAll("." + settingsRowClass + " input") : [];
        for (i = 0; i < allTheCheckboxes.length; i++) {
                aCheckbox = allTheCheckboxes[i];
                aCheckbox.addEventListener("change", checkBoxChange);
        }
        // Init for selects
        allTheSelects = parent ? parent.querySelectorAll("." + settingsRowClass + " select") : [];
        for (i = 0; i < allTheSelects.length; i++) {
                aSelect = allTheSelects[i];
                aSelect.addEventListener("change", selectChange);
        }
    }
}

//Now run!
registerAltStyles();
initSettings();

})();