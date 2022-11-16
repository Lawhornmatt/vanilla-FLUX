(function() {
    const foo = (state, action) => {
        switch (action.type) {
            case "foo":
                return Object.assign({}, state, { foos: state.foos + 1});

            default: 
                return state;
        }
    };

    Store.addReducer(foo);
    
    const sub = {
        h1: document.querySelector('h1'),
        updateState(state, action) {
            console.log(state, action);
            console.log('========================');
            this.h1.textContent = `foo ${state.foos}`;
        }
    };

    Store.subscribe(sub);
})();