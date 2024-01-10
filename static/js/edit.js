import Game from "./webgl/game.mjs";
import GameObject2D from "./webgl/gameobject2d/gameobject2d.mjs";

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

document.getElementById('theme-switcher').addEventListener('click', toggleTheme);
document.getElementById('gear').addEventListener('click', toggleSettings);

//###########################################################################################//

const rng = (min, max) => Math.random() * (max - min + 1) + min;

const game = await new Game();

game.objects = [];

for (let i = 0; i < 1; i++) {
    game.objects.push(new GameObject2D(game, 0, 0, 50, 50, [255, 255, 255, 1]));
}

game.Start = () => {
    for (let obj of game.objects) {
        let random = rng(4, 5)
        obj.velocity = [random, random];
        obj.Update = () => {
            obj.x += obj.velocity[0];
            obj.y += obj.velocity[1];

            if (obj.x <= 0 || obj.x >= game.canvasView.clientWidth - 50) {
                obj.velocity[0] *= -1;
                obj.color = [rng(0, 255), rng(0, 255), rng(0, 255), 1];
            }
            if (obj.y <= 0 || obj.y >= game.canvasView.clientHeight - 50) {
                obj.velocity[1] *= -1;
                obj.color = [rng(0, 255), rng(0, 255), rng(0, 255), 1];
            }
        }
        obj.Start = () => {
            obj.x = rng(0, game.canvasView.clientWidth - 50);
            obj.y = rng(0, game.canvasView.clientHeight - 50);
        }
    }
}

game.Run();