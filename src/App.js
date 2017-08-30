import React, { Component } from 'react';
import InfoCardContainer from './Containers/InfoCardContainer/InfoCardContainer';
import NavBarContainer from './Containers/NavBarContainer/NavBarContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarContainer></NavBarContainer>
        <InfoCardContainer></InfoCardContainer>
      </div>
    );
  }
}

export default App;
