(global => {
    let dataGenius = {
        fullGenius: [],
        actGenius: [],
        sideGenius: [],
        score: 0,
        defaultSpd: 5e2,
        duration: 3e2
    };

    const menuList = {
        start(isShowing = !0) {
            const menuStart = query('#menu-start'),
                gameFeatures = query('.game-features'), menuContainer = query('.menu-container');

            if (!isShowing) {
                gameFeatures.classList.remove('menu-drop');
                menuContainer.classList.remove('show-menu');
            } else enableClicks(!1);

            showMenu(menuStart, isShowing);
        },
        settings() {
            const menuSettings = query('#menu-settings');

            showMenu(menuSettings);
        },
        pause(txt) {
            const menuPause = query('#menu-pause');

            menuPause.innerHTML = txt;
            showMenu(menuPause);
        },
        restart() {
            const menuRestart = query('#menu-restart'), settingsButton = query('.settings-button');

            settingsButton.classList.add('hidden');

            showMenu(menuRestart);
        },
        winner() {
            const menuWinner = query('#menu-winner'), settingsButton = query('.settings-button');

            settingsButton.classList.add('hidden');

            showMenu(menuWinner);
        }
    },
    difficultList = {
        'easy': 5,
        'normal': 12,
        'hard': 20,
        'endless': Infinity
    },
    globalFunctions = {
        query(elem, all = !1) {
            return document[`querySelector${all ? 'All' : ''}`](elem);
        },
        setClasses(className, force, ...elems) {
            elems.forEach(elem => elem.classList.toggle(className, force));
        },
        setMenu(menuMode, ...contents) {
            const menuTool = menuList[menuMode];

            if (menuTool) menuTool(...contents);
        },
        setScore() {
            const scoreSpan = query('.score'), {score} = dataGenius;

            scoreSpan.innerHTML = score;
        },
        viewFeatures() {
            const gameFeatures = query('.game-features'), menuContainer = query('.menu-container');

            gameFeatures.classList.toggle('menu-drop');

            const hasMenu = gameFeatures.classList.contains('menu-drop');
    
            menuContainer.classList.toggle('show-menu', hasMenu);

            enableClicks(!hasMenu);

            return hasMenu;
        },
        showMenu(elem, isShowing = !0) {
            const menus = [...query('.menu-container > *', !0)],
                notElem = menus.filter(({id}) => id !== (elem.id || elem));

            elem = elem.id ? elem : menus.find(({id}) => id == elem);

            notElem.forEach(n => n.classList.remove('show'));

            elem.classList.toggle('show', isShowing);
        },
        randomRoundedNum(min = 0, max = 1) {
            return min + Math.round(Math.random() * (max - min));
        },
        verifyArr() {
            const {sideGenius, fullGenius} = dataGenius,
                sideJoin = sideGenius.join(""), fullJoin = fullGenius.join(""),
                isVerify = fullJoin.startsWith(sideJoin), isEqual = fullJoin === sideJoin;

            return isEqual ? 'equal' : isVerify ? 'starts' : !1;
        },
        increaseFullGenius(count = 1) {
            for (let i = 0; i < Math.max(count, 1); i++) {
                const {fullGenius} = dataGenius,
                    randomNumber = randomRoundedNum(0, 3);

                fullGenius.push(randomNumber);
                console.clear();
                console.log(fullGenius);
            };
        },
        turnKeySide(sideNum, active) {
            const side = [...query('.side', true)][sideNum],
                {isClickEnable} = global,
                gameBody = query('.game-body'),
                sideColor = getComputedStyle(side).getPropertyValue('--def-color');

            if (!side || !isClickEnable) return;

            const isActive = side.classList.contains('active');

            side.classList.toggle('active', active == undefined ? !isActive : active);
            gameBody.style.setProperty('--ball-color', sideColor);
        },
        turnSide(sideNum, active) {
            const side = [...query('.side', true)][sideNum],
                gameBody = query('.game-body'),
                sideColor = getComputedStyle(side).getPropertyValue('--def-color');

            if (!side) return;

            const isActive = side.classList.contains('active');

            side.classList.toggle('active', active == undefined ? !isActive : active);
            gameBody.style.setProperty('--ball-color', sideColor);
        },
        turnOffSides() {
            const sides = [...query('.side', true)];

            sides.forEach((side, ind) => turnSide(ind, !1));
        },
        pressSide(sideNum) {
            const {isClickEnable, gameDifficultScore} = global,
                {sideGenius, fullGenius, duration} = dataGenius;

            if (!isClickEnable) return;

            sideGenius.push(sideNum);
            console.clear();
            console.log(fullGenius);
            console.log(sideGenius);

            const verified = verifyArr();

            if (verified === 'equal') {
                enableClicks(!1);

                if (sideGenius.length < gameDifficultScore) {
                    dataGenius.score++;
                    setScore();

                    startMemory(duration * 1.5);
                } else winGenius();
            } else if (!verified) loseGenius();
        },
        loseGenius() {
            dataGenius.fullGenius = [];
            dataGenius.actGenius = [];
            dataGenius.sideGenius = [];
            dataGenius.score = 0;
            dataGenius.defaultSpd = 5e2;
            console.clear();

            setScore();

            viewFeatures();
    
            setMenu('restart');
        },
        winGenius() {
            dataGenius.fullGenius = [];
            dataGenius.actGenius = [];
            dataGenius.sideGenius = [];
            dataGenius.score = 0;
            dataGenius.defaultSpd = 5e2;
            console.clear();

            setScore();

            viewFeatures();
    
            setMenu('winner');
        },
        startGenius() {
            dataGenius.actGenius = [];
            dataGenius.sideGenius = [];
            dataGenius.defaultSpd = Math.max(dataGenius.defaultSpd - 25, 150) / (global.gameSpeed || !0);

            const {defaultSpd} = dataGenius;

            pauseGenius(!1);

            setTimeout(continueGenius, defaultSpd);
        },
        pauseGenius(isPause = !0) {
            global.pauseGame = isPause;
        },
        continueGenius() {
            const {fullGenius, actGenius, defaultSpd, duration} = dataGenius,
                {pauseGame} = global,
                prev = fullGenius[actGenius.length];

            if (pauseGame) {
                dataGenius.actGenius = [];
                dataGenius.sideGenius = [];
                turnOffSides();

                return;
            };

            actGenius.push(prev);

            turnSide(prev, !0);
            setTimeout(() => {
                turnSide(prev, !1);

                return setTimeout(actGenius.length < fullGenius.length ? continueGenius : enableClicks, defaultSpd);
            }, duration);
        },
        enableClicks(enable = !0) {
            global.isClickEnable = enable;
        },
        playGame() {
            const settingsButton = query('.settings-button');

            settingsButton.classList.remove('hidden');
            setMenu('start', !1);
            startMemory();
        },
        startMemory(delay = 0) {
            setTimeout(() => {
                increaseFullGenius();

                startGenius();
                enableClicks(!1);
            }, delay);
        },
        updateDifficult() {
            const difficultGame = query('#difficult-game'), selected = difficultGame.selectedOptions[0].value;

            setDifficult(selected);
        },
        setDifficult(difficult) {
            const difficultScore = query('.difficult-score');

            difficultScore.dataset.difficultScore = global.gameDifficultScore = difficultList[difficult];
        },
        updateSpeed(speed) {
            global.gameSpeed = speed;
        }
    };

    for (const func in globalFunctions) global[func] ||= globalFunctions[func];
})(window ?? this);