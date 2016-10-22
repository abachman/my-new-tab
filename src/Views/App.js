import React, { Component } from 'react';
import LinksGrid from './LinksGrid'
import Controls from './Controls'
import * as Forms from './Forms'

import '../stylesheets/bootstrap.min.css'
import '../stylesheets/bootstrap_xl.css'

import '../stylesheets/App.css'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <LinksGrid />
        <Controls />
        <Forms.Settings />
        <Forms.Links />
      </div>
    );
  }
}

export default App;
