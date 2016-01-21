'use strict';

import {getValueFromServer} from './api';

export function increment() {
    return {
        type: 'INCREMENT'
    };
}

export function decrement() {
    return {
        type: 'DECREMENT'
    };
}

export function asyncAction() {
    return dispatch => {
        getValueFromServer().then(({action, value}) => {
            if (action === 'increment') {
                dispatch({
                    type: 'INCREMENT', value
                });
            } else {
                dispatch({
                    type: 'DECREMENT', value
                });
            }
        });
    };
}


