const pauseButton = query('.pause-button'), settingsButton = query('.settings-button'),
    gameFeatures = query('.game-features'), menuContainer = query('.menu-container');

window.addEventListener("load", () => setMenu('start'));

settingsButton.addEventListener("click", () => {
    gameFeatures.classList.toggle('menu-drop');

    const hasMenu = gameFeatures.classList.contains('menu-drop');

    menuContainer.classList.toggle('show-menu', hasMenu);

    if (hasMenu) {
        setMenu('settings');
    };
});

pauseButton.addEventListener("click", () => {
    gameFeatures.classList.add('menu-drop');

    const hasMenu = gameFeatures.classList.contains('menu-drop');

    menuContainer.classList.toggle('show-menu', hasMenu);

    setMenu('pause', 'JOGO PAUSADO');
});

document.addEventListener("keydown", ev => {
    console.log(ev.key);
});