'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

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

// Actions
const incrementAction = () => store.dispatch({type: 'INCREMENT'});
const decrementAction = () => store.dispatch({type: 'DECREMENT'});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number || store.getState()
        };
    }

    componentDidMount() {
        store.subscribe(()=> {
            this.setState({
                number: store.getState()
            });
        });
    }

    render() {
        let {number} = this.state;
        return (
            <div>
                <h2>The number is = {number} </h2>
                <div>
                    <button onClick={incrementAction}>Increment</button>
                    <button onClick={decrementAction}>Decrement</button>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    number: React.PropTypes.number
};

ReactDOM.render(
    <App number={100}/>,
    document.querySelector('#app')
);
