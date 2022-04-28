if (currentTheme) {

  if (currentTheme === 'light') {
	document.getElementById("theme_switch_div").innerHTML = '<div class="flex-column"><em id="text_theme_on">Dark Theme</em></div> <div class="d-flex flex-column text-center"><label class="theme-switch" for="checkbox_t"><input type="checkbox" id="checkbox_t" checked /><div class="slider round"></div></label></div><div class="flex-column"><em id="text_theme">Light Theme</em></div>';
  } else {
	document.getElementById("theme_switch_div").innerHTML = '<div class="flex-column"><em id="text_theme_on">Dark Theme</em></div> <div class="d-flex flex-column text-center"><label class="theme-switch" for="checkbox_t"><input type="checkbox" id="checkbox_t" /><div class="slider round"></div></label></div><div class="flex-column"><em id="text_theme">Light Theme</em></div>';
  }
} else {
document.getElementById("theme_switch_div").innerHTML = '<div class="flex-column"><em id="text_theme_on">Dark Theme</em></div> <div class="d-flex flex-column text-center"><label class="theme-switch" for="checkbox_t"><input type="checkbox" id="checkbox_t" /><div class="slider round"></div></label></div><div class="flex-column"><em id="text_theme">Light Theme</em></div>';
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
	var date = new Date();
	date.setTime(date.getTime() + (7 * 86400 * 1000));
	var expires2 = ";expires=" + date.toGMTString();
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
		document.cookie = "style=light"+ expires2 + ";path=/";
		document.getElementById("text_theme_on").innerHTML="Dark Theme";
		document.getElementById("text_theme").innerHTML="Light Theme";
    } else {
		document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
		document.cookie = "style=dark"+ expires2 + ";path=/";
		document.getElementById("text_theme_on").innerHTML="Dark Theme";
		document.getElementById("text_theme").innerHTML="Light Theme";
    }
}
toggleSwitch.addEventListener('change', switchTheme, false);