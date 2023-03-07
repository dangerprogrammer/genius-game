(global => {
    const menuList = {
        start() {
            const menuStart = query('#menu-start');

            showMenu(menuStart);
        },
        settings() {
            console.log('Open settings');
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
        showMenu(elem) {
            const menus = [...query('.menu-container > *', !0)],
                notElem = menus.filter(({id}) => id !== (elem.id || elem));

            elem = elem.id ? elem : menus.find(({id}) => id == elem);

            notElem.forEach(n => n.classList.remove('show'));
            elem.classList.add('show');
        }
    };

    for (const func in globalFunctions) global[func] ||= globalFunctions[func];
})(window || this);