const pauseButton = query('.pause-button'), settingsButton = query('.settings-button'),
    gameFeatures = query('.game-features');

settingsButton.addEventListener("click", () => {
    gameFeatures.classList.toggle('menu-drop');

    const hasMenu = gameFeatures.classList.contains('menu-drop');

    if (hasMenu) {
        openMenu('pause', 'JOGO PAUSADO');
    };
});

pauseButton.addEventListener("click", () => {
    gameFeatures.classList.add('menu-drop');
});

document.addEventListener("keydown", ev => {
    console.log(ev.key);
});