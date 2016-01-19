'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';

const {Component} = React;

// Reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

// Store
const store = createStore(counter);

// create actions
const counterActions = {
    increment: function () {
        return {type: 'INCREMENT'};
    },
    decrement: function () {
        return {type: 'DECREMENT'};
    }
};

// Counter presentational component
class Counter extends Component {
    render() {
        let {number, dispatch } = this.props;
        let actions = bindActionCreators(counterActions, dispatch);

        return (
            <div>
                <h2>The number is = {number} </h2>
                <div>
                    <button onClick={actions.increment}>Increment</button>
                    <button onClick={actions.decrement}>Decrement</button>
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    number: React.PropTypes.number.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

let mapStateToProps = state => {
    return {
        number: state
    };
};

// The container component
const App = connect(
    mapStateToProps
)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#app')
);
