const Store = (function() {
    let state = {
        foos: 1
    };
    const reducers = [];
    const subscribers = [];

    const addReducer = reducer => {
        reducers.push(reducer);
    };

    const subscribe = sub => {
        subscribers.push(sub);
    };

    const runReducers = (state, action) => {
        return reducers.reduce(reduceState(action), state);
    };

    const reduceState = action => (acc, reducer) => {
        if (typeof reducer === 'function') {
            return reducer (acc, action);
        }

        return acc;
    };

    //First thing fired off by clicking the button. Has {"type":"foo"} passed into its argument explicitly by the button
    const dispatch = action => {
        //console.log(`1) ${JSON.stringify(action)}`); //See what the argument 'action' is for the function dispatch. Its the obj {"type":"foo"}
        state = runReducers(state, action); //The sets the state
        subscribers.forEach(sub => {
            if (sub && typeof sub.updateState === 'function') {
                sub.updateState(state, action);
            };
        });
    };

    return {
        addReducer,
        subscribe,
        dispatch
    };
})();




