'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import {getValueFromServer} from './api';

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

// Store
const store = createStore(counter);

// create actions
const counterActions = {
    increment:    function (value) {
        return {type: 'INCREMENT', value};
    }, decrement: function (value) {
        return {type: 'DECREMENT', value};
    }
};

// Counter presentational component
class Counter extends Component {
    render() {
        let {number, dispatch } = this.props;
        let actions = bindActionCreators(counterActions, dispatch);
        let asyncClickHandler = () => {
            getValueFromServer().then(data=> {
                if( data.action === 'increment') {
                    actions.increment(data.value);
                } else {
                    actions.decrement(data.value);
                }
            });
        };

        return (
            <div>
                <h2>The number is = {number} </h2>
                <div>
                    <button onClick={asyncClickHandler}>Increment/Decrement</button>
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    number: React.PropTypes.number.isRequired, dispatch: React.PropTypes.func.isRequired
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
