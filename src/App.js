import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
 

import Navigator from './navigation';

class App extends Component {
  render() {
    return (
      <Navigator />
    );
  };
};

library.add(fab, faHeart);

export default App;
