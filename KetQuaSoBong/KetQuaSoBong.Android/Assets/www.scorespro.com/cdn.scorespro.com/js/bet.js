var BET365_ODDS = "https://www.bet365.com/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933474";
var BET365_VIDEO = "https://extra.bet365.com/streaming/?affiliate=365_568464";
var BET365_TEXT = "https://www.bet365.com/olp/open-account/?affiliate=365_00933483";
var locale = '';
$('document').ready(function(){
	locale = get_ck("locale");
	if(locale == ""){
		$.ajax({
			url: "/bet_ajax.php?"+Math.random(),
			success: function(content) {
				set_ck("locale", content);
				locale = content;
				set_url();
			}
		});
	} else {
		set_url();
	}
});
function gobet365(){
	window.open(BET365_TEXT);
	return false;
}
function set_url(){
	if(locale == "AU" || locale == "PK"){
		BET365_ODDS = "https://www.bet365.com.au/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933466";
		BET365_VIDEO = "https://extra.bet365.com.au/streaming/?affiliate=365_00933465";
		BET365_TEXT = "https://www.bet365.com.au/olp/open-account/?affiliate=365_00933475";

	}else if(locale == "CY"){
		BET365_ODDS = "https://www.bet365.com.cy/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933467";
		BET365_VIDEO = "https://extra.bet365.com.cy/streaming/?affiliate=365_00933464";
		BET365_TEXT = "https://www.bet365.com.cy/olp/open-account/?affiliate=365_00933476";

	}else if(locale == "DK"){
		BET365_ODDS = "https://www.bet365.dk/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933468";
		BET365_VIDEO = "https://extra.bet365.dk/streaming/?affiliate=365_00933463";
		BET365_TEXT = "https://www.bet365.dk/olp/open-account/?affiliate=365_00933477";

	}else if(locale == "GB" || locale == "UK"){
		BET365_ODDS = "https://www.bet365.com/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933473";
		BET365_VIDEO = "https://extra.bet365.com/streaming/?affiliate=365_00933458";
		BET365_TEXT = "https://www.bet365.com/olp/open-account/?affiliate=365_00933482";

	}else if(locale == "EE"){
		BET365_ODDS = "https://www.bet365.ee/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933469";
		BET365_VIDEO = "https://extra.bet365.ee/streaming/?affiliate=365_00933462";
		BET365_TEXT = "https://www.bet365.ee/olp/open-account/?affiliate=365_00933478";
	}else if(locale == "GR"){
		BET365_ODDS = "https://www.bet365.gr/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933470";
		BET365_VIDEO = "https://extra.bet365.gr/streaming/?affiliate=365_00933461";
		BET365_TEXT = "https://www.bet365.gr/olp/open-account/?affiliate=365_00933479";
	}else if(locale == "MX"){
		BET365_ODDS = "https://www.bet365.mx/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933471";
		BET365_VIDEO = "https://extra.bet365.mx/streaming/?affiliate=365_00933460";
		BET365_TEXT = "https://www.bet365.mx/olp/open-account/?affiliate=365_00933480";
	}else if(locale == "ES"){
		BET365_ODDS = "https://www.bet365.es/home/FlashGen4/WebConsoleApp.asp?bet=1&affiliate=365_00933472";
		BET365_VIDEO = "https://extra.bet365.es/streaming/?affiliate=365_00933459";
		BET365_TEXT = "https://www.bet365.es/olp/open-account/?affiliate=365_00933481";
	}else if(locale == "IT" || locale == "AF" || locale == "WS" || locale == "AO" || locale == "BE" || locale == "BI" || locale == "KH" || locale == "TD" || locale == "TW" || locale == "CD" || locale == "CU" || locale == "CZ" || locale == "CG" || locale == "GQ" || locale == "ER" ||  locale == "FR" || locale == "GF" || locale == "GP" || locale == "GU" || locale == "GW" || locale == "HT" || locale == "HK" || locale == "IR" || locale == "IQ" || locale == "LY" || locale == "PL" || locale == "IL"){
		BET365_ODDS = "javascript:;";
		BET365_VIDEO = "javascript:;";
		BET365_TEXT = "javascript:;";
	}
}
function get_ck(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function set_ck(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}