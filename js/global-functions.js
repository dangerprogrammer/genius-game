(global => {
    let dataGenius = {
        fullGenius: [],
        actGenius: [],
        defaultSpd: 1e3,
        duration: 5e2
    };

    const menuList = {
        start(isShowing = !0) {
            const menuStart = query('#menu-start'),
                gameFeatures = query('.game-features'), menuContainer = query('.menu-container');

            if (!isShowing) {
                gameFeatures.classList.remove('menu-drop');
                menuContainer.classList.remove('show-menu');
            };

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
        increaseFullGenius() {
            const {fullGenius} = dataGenius,
                randomNumber = randomRoundedNum(0, 3);

            fullGenius.push(randomNumber);
            console.log(`Added ${randomNumber} to fullGenius!`, fullGenius);
        },
        startGenius() {
            const {fullGenius, actGenius} = dataGenius;
            if (actGenius.length < fullGenius.length) {
                return continueGenius();
            } else {
                return setClicks();
            };
        },
        continueGenius() {
            const {fullGenius, actGenius} = dataGenius,
                prev = dataGenius.fullGenius[dataGenius.actGenius.length];

            actGenius.push(prev);
            console.log(`Added ${prev} to actGenius!`, actGenius);

            if (actGenius.length < fullGenius.length) return continueGenius();
        },
        setClicks() {

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
            }, delay);
        }
    };

    for (const func in globalFunctions) global[func] ||= globalFunctions[func];
})(window || this);