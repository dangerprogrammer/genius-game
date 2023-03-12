const pauseButton = query('.pause-button'), settingsButton = query('.settings-button'),
    gameFeatures = query('.game-features'), menuContainer = query('.menu-container'),
    startGame = query('.start-game'),
    sides = [...query('.side', true)];

window.addEventListener("load", () => {
    setMenu('start');

    sides.forEach((side, ind) => {
        side.addEventListener("mousedown", () => turnSide(ind, !0));
        side.addEventListener("mouseup", () => turnSide(ind, !1));
        side.addEventListener("mouseout", () => turnSide(ind, !1));
    });

    startGame.addEventListener("click", playGame);

    settingsButton.addEventListener("click", () => {
        gameFeatures.classList.toggle('menu-drop');

        const hasMenu = gameFeatures.classList.contains('menu-drop');

        menuContainer.classList.toggle('show-menu', hasMenu);

        if (hasMenu) setMenu('settings');
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
});