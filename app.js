'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {connect, Provider} from 'react-redux';
import {increment, decrement, asyncAction} from './actions';
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

    handleIncrementClick(){
        let {dispatch} = this.props;
        dispatch(increment());
    }
    handleDecrementClick(){
        let {dispatch} = this.props;
        dispatch(decrement());
    }
    handleAsyncAction(){
        let {dispatch} = this.props;
        dispatch(asyncAction());
    }
    render() {
        let {number} = this.props;
        return (
            <div>
                <h2>The number is = {number} </h2>
                <div>
                    <button onClick={()=>this.handleIncrementClick()}>Increment</button>
                    <button onClick={()=>this.handleDecrementClick()}>Decrement</button>
                    <button onClick={()=>this.handleAsyncAction()}>Increment/Decrement from server</button>
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
