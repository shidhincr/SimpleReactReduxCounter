'use strict';
let timesCalled = 0;

export function getValueFromServer() {
    ++timesCalled;
    return new Promise(function (resolve) {
        setTimeout(()=> {
            let action = timesCalled % 2 === 0 ? 'increment' : 'decrement';
            resolve({
                value: Math.ceil(Math.random()*5),
                action: action
            });
        }, 3000);
    });
}