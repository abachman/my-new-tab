import React, { Component } from 'react';
import BlocksGrid from './BlocksGrid'
import Controls from './Controls'
import * as Forms from './Forms'

import '../stylesheets/bootstrap.min.css'
import '../stylesheets/bootstrap_xl.css'

import '../stylesheets/App.css'

class App extends Component {
  render() {
    return (
      <div className="App container" data-testid="app-container">
        <BlocksGrid />
        <Controls />
        <Forms.Settings />
        <Forms.Blocks />
      </div>
    );
  }
}

export default App;
