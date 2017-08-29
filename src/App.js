import React, { Component } from 'react';
import NavBarContainer from './Containers/NavBarContainer/NavBarContainer'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarContainer></NavBarContainer>
      </div>
    );
  }
}

export default App;
