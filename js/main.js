const pauseButton = query('.pause-button'), settingsButton = query('.settings-button'),
    gameFeatures = query('.game-features'), menuContainer = query('.menu-container'),
    startGame = query('.start-game'), restartGameButtons = [...query('.restart-game', !0)],
    difficultGame = query('#difficult-game'), speedGame = query('#speed-game'),
    backMenu = query('.back-menu'),
    sides = [...query('.side', !0)],
    dataOpens = [...query('[data-open]', !0)];

window.addEventListener("load", () => {
    setMenu('start');

    sides.forEach((side, ind) => {
        side.addEventListener("mousedown", () => {
            turnSide(ind);
            console.log("mouseDown", ind);
        });
        side.addEventListener("click", () => pressSide(ind));
        side.addEventListener("mouseup", () => {
            turnSide(ind);
            console.log("mouseUp", ind);
        });
    });

    backMenu.addEventListener("click", backToMenu);

    difficultGame.addEventListener("change", updateDifficult);

    updateDifficult();

    speedGame.addEventListener("change", () => {
        const selected = speedGame.selectedOptions[0].value;

        updateSpeed(+selected);
    });

    dataOpens.forEach(dataOpen => {
        dataOpen.addEventListener("click", () => {
            const article = [...dataOpen.parentElement.children].find(({id}) => id === dataOpen.dataset.open),
                articleChilds = [...article.children];

            dataOpen.classList.toggle('active');

            articleChilds.forEach(({classList}, ind) => {
                const isShow = classList.contains('show');

                setTimeout(() => classList.toggle('show'), (isShow ? articleChilds.length - 1 - ind : ind) * 1e2);
            });
        });
    });

    startGame.addEventListener("click", playGame);

    settingsButton.addEventListener("click", () => {
        const hasMenu = viewFeatures();

        if (hasMenu) {
            setMenu('settings');
            pauseGenius();
        } else startGenius();
    });

    restartGameButtons.forEach(restartGame => restartGame.addEventListener("click", restartGenius));

    pauseButton.addEventListener("click", () => {
        const hasMenu = viewFeatures();

        if (hasMenu) pauseGenius();

        setMenu('pause', 'JOGO PAUSADO');
    });

    document.addEventListener("keydown", ev => !(+ev.key >= 1 && +ev.key <= 4) || turnKeySide(+ev.key - 1));
    document.addEventListener("keyup", ev => !(+ev.key >= 1 && +ev.key <= 4) || (n = +ev.key - 1, turnKeySide(n), pressSide(n)));
});