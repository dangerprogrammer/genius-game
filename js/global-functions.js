(global => {
    let dataGenius = {
        fullGenius: [],
        actGenius: [],
        sideGenius: [],
        score: 0,
        defaultSpd: 5e2,
        duration: 5e2
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
            const menuRestart = query('#menu-restart'),
                settingsButton = query('.settings-button');

            settingsButton.classList.add('hidden');

            showMenu(menuRestart);
        }
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
        setScore(score = 0) {
            const scoreSpan = query('.score');

            scoreSpan.innerHTML = score;
        },
        viewFeatures() {
            const gameFeatures = query('.game-features'), menuContainer = query('.menu-container');

            gameFeatures.classList.toggle('menu-drop');

            const hasMenu = gameFeatures.classList.contains('menu-drop');
    
            menuContainer.classList.toggle('show-menu', hasMenu);

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
            };
        },
        turnSide(sideNum, active = !0) {
            const side = [...query('.side', true)][sideNum],
                gameBody = query('.game-body'),
                sideColor = getComputedStyle(side).getPropertyValue('--def-color');

            if (!side) return !1;

            side.classList.toggle('active', active);
            gameBody.style.setProperty('--ball-color', sideColor);
        },
        pressSide(sideNum) {
            const {isClickEnable} = global,
                {sideGenius, duration} = dataGenius;

            if (!isClickEnable) return;

            sideGenius.push(sideNum);

            const verified = verifyArr();

            if (verified === 'equal') {
                enableClicks(!1);
                turnSide(sideNum, !0);
                dataGenius.score++;
                setScore(dataGenius.score);

                setTimeout(() => {
                    turnSide(sideNum, !1);

                    setTimeout(() => {
                        increaseFullGenius();

                        startGenius();
                    }, duration / 2);
                }, duration);
            } else if (verified === 'starts') {
                turnSide(sideNum, !0);

                setTimeout(() => turnSide(sideNum, !1), duration);
            } else loseGenius();
        },
        loseGenius() {
            dataGenius.fullGenius = [];
            dataGenius.actGenius = [];
            dataGenius.sideGenius = [];

            setScore();

            viewFeatures();
    
            setMenu('restart');
        },
        startGenius() {
            const {defaultSpd} = dataGenius;
            dataGenius.actGenius = [];
            dataGenius.sideGenius = [];

            setTimeout(continueGenius, defaultSpd);
        },
        continueGenius() {
            const {fullGenius, actGenius, defaultSpd, duration} = dataGenius,
                prev = fullGenius[actGenius.length];

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
        }
    };

    for (const func in globalFunctions) global[func] ||= globalFunctions[func];
})(window || this);