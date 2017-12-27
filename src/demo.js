import {createStore} from 'redux';

function counter(state=0,action) {
    switch (action.type) {
        case "加":
            return state + 1;
        case "减":
            return state - 1;
        default:
            return state;
    }
}

const stotre = createStore(counter);

console.log(stotre.getState());

stotre.dispatch({type:'加'});

console.log(stotre.getState());