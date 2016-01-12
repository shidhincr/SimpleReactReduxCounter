'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
let {Component} = React;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: this.props.number || 0
    }
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
  }

  render(){
    let {number} = this.state;
    return(
      <div>
        <h2>The number is = {number} </h2>
        <div>
            <button onClick={this._increment}>Increment</button>
            <button onClick={this._decrement}>Decrement</button>
        </div>
      </div>
    );
  }

  _increment(){
    this.setState({
      number: this.state.number + 1
    });
  }
  _decrement(){
    this.setState({
      number: this.state.number - 1
    });
  }
}

App.propTypes ={
  number: React.PropTypes.number
}

ReactDOM.render(
  <App number={20}/>,
  document.querySelector('#app')
)
