import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeContainer from './Containers/HomeContainer/HomeContainer';
import BiosContainer from './Containers/BiosContainer/BiosContainer';
import PostsContainer from './Containers/PostsContainer/PostsContainer';
import ConnectContainer from './Containers/ConnectContainer/ConnectContainer';
import BlogPostContainer from './Containers/BlogPostContainer/BlogPostContainer';

class App extends Component {
  render() {
    document.getElementsByTagName("META")[1].content = "width=device-width; initial-scale=1; maximum-scale=1;";
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomeContainer}></Route>
          <Route exact path='/bios' component={BiosContainer}></Route>
          <Route exact path='/posts' component={PostsContainer}></Route>
          <Route exact path='/connect' component={ConnectContainer}></Route>
          <Route exact path='/posts/:id/:url_title' component={BlogPostContainer}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
