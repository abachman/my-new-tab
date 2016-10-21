import React, { Component } from 'react';
import '../stylesheets/App.css';
import Counter from './Counter'

const DATE = new Date()

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{DATE.toString()} Welcome to React</h2>
        </div>
        <Counter />
      </div>
    );
  }
}

export default App;
