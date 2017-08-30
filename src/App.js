import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeContainer from './Containers/HomeContainer/HomeContainer';
import BiosContainer from './Containers/BiosContainer/BiosContainer';
import PostsContainer from './Containers/PostsContainer/PostsContainer';
import ConnectContainer from './Containers/ConnectContainer/ConnectContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomeContainer}></Route>
          <Route exact path='/bios' component={BiosContainer}></Route>
          <Route exact path='/posts' component={PostsContainer}></Route>
          <Route exact path='/connect' component={ConnectContainer}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
