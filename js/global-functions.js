(global => {
    const menuList = {
        start(isShowing = !0) {
            const menuStart = query('#menu-start'),
                gameFeatures = query('.game-features');

            if (!isShowing) gameFeatures.classList.remove('menu-drop');
            showMenu(menuStart, isShowing);
        },
        settings() {
            const menuSettings = query('#menu-settings');

            showMenu(menuSettings);
        },
        pause(txt) {
            console.log(txt);
        }
    },
    globalFunctions = {
        query(elem, all = !1) {
            return document[`querySelector${all ? 'All' : ''}`](elem);
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
        playGame() {
            const settingsButton = query('.settings-button');

            setMenu('start', !1);
            settingsButton.classList.remove('hidden');
        }
    };

    for (const func in globalFunctions) global[func] ||= globalFunctions[func];
})(window || this);