const pauseButton = query('.pause-button'), settingsButton = query('.settings-button'),
    gameFeatures = query('.game-features'), menuContainer = query('.menu-container'),
    startGame = query('.start-game'), restartGame = query('.restart-game'),
    sides = [...query('.side', true)];

window.addEventListener("load", () => {
    setMenu('start');

    sides.forEach((side, ind) => {
        side.addEventListener("click", () => pressSide(ind));
    });

    startGame.addEventListener("click", playGame);

    settingsButton.addEventListener("click", () => {
        const hasMenu = viewFeatures();

        if (hasMenu) setMenu('settings');
    });

    restartGame.addEventListener("click", playGame);

    pauseButton.addEventListener("click", () => {
        viewFeatures();

        setMenu('pause', 'JOGO PAUSADO');
    });

    document.addEventListener("keyup", ev => pressSide(Number(ev.key) - 1));
});