'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import {connect, Provider} from 'react-redux';
import * as actions from './actions';
const {Component} = React;

// Reducer
const counter = (state = 0, {type, value=1}) => {
    switch (type) {
        case 'INCREMENT':
            return state + value;
        case 'DECREMENT':
            return state - value;
        default:
            return state;
    }
};

// Store with middleware
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(counter);

// Counter presentational component
class Counter extends Component {
    render() {
        let {number, dispatch} = this.props;
        let {increment, decrement, asyncAction} = bindActionCreators(actions, dispatch);
        return (
            <div>
                <h2>The number is = {number} </h2>
                <div>
                    <button onClick={increment}>Increment</button>
                    <button onClick={decrement}>Decrement</button>
                    <button onClick={asyncAction}>Increment/Decrement from server</button>
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
const App = connect(mapStateToProps)(Counter);

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.querySelector('#app'));
