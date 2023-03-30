const pauseButton = query('.pause-button'), settingsButton = query('.settings-button'),
    gameFeatures = query('.game-features'), menuContainer = query('.menu-container'),
    startGame = query('.start-game'), restartGame = query('.restart-game'),
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

    dataOpens.forEach(dataOpen => {
        dataOpen.addEventListener("click", () => {
            const article = [...dataOpen.parentElement.children].find(child => child.id === dataOpen.dataset.open),
                articleChilds = [...article.children];

            dataOpen.classList.toggle('active');

            articleChilds.forEach((child, ind) => {
                const isShow = child.classList.contains('show');

                setTimeout(() => child.classList.toggle('show'), (isShow ? articleChilds.length - 1 - ind : ind) * 1e2);
            });
        });
        dataOpen.click();
    });

    startGame.addEventListener("click", playGame);

    settingsButton.addEventListener("click", () => {
        const hasMenu = viewFeatures();

        if (hasMenu) {
            setMenu('settings');
            pauseGenius();
        } else startGenius();
    });

    restartGame.addEventListener("click", playGame);

    pauseButton.addEventListener("click", () => {
        const hasMenu = viewFeatures();

        if (hasMenu) pauseGenius();

        setMenu('pause', 'JOGO PAUSADO');
    });

    document.addEventListener("keydown", ev => !(+ev.key >= 1 && +ev.key <= 4) || turnKeySide(+ev.key - 1));
    document.addEventListener("keyup", ev => !(+ev.key >= 1 && +ev.key <= 4) || (n = +ev.key - 1, turnKeySide(n), pressSide(n)));
});