import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomeContainer from './Containers/HomeContainer/HomeContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={HomeContainer}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
