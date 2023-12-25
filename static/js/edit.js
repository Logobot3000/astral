let theme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
let activeDark = '3.6vw';
let activeLight = '-0.6vw'

const toggleSettings = () => {
    const gear = document.getElementById('gear');
    const settings = document.getElementById('settings');

    gear.classList.remove('gear-spin');
    void gear.offsetWidth;
    gear.classList.add('gear-spin');

    console.log(settings.style.left)

    if (settings.style.left) settings.style.left = '';
    else settings.style.left = '0';
}

const getTheme = () => {
    let currentTheme;
    if (theme) currentTheme = theme;
    else {
        if (systemSettingDark.matches) currentTheme = "dark";
        else currentTheme = "light";
    }

    theme = currentTheme

    if (theme === 'light') {
        document.getElementById('current-theme').style.translate = activeLight;
    }
    else document.getElementById('current-theme').style.translate = activeDark;

    document.querySelector('html').setAttribute('data-theme', theme);

    return theme;
}

const toggleTheme = () => {
    theme = theme === "dark" ? "light" : "dark";
    document.querySelector('html').setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);

    if (theme === 'light') {
        document.getElementById('current-theme').style.translate = activeLight;
    }
    else document.getElementById('current-theme').style.translate = activeDark;
}

getTheme();