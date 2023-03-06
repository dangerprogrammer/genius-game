(global => {
    const globalFunctions = {
        query(elem, all = !1) {
            return document[`querySelector${all ? 'All' : ''}`](elem);
        },
        openMenu(menuMode, txt = !1) {

        }
    };

    for (const func in globalFunctions) global[func] ||= globalFunctions[func];
})(window || this);