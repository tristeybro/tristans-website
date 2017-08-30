import React, { Component } from 'react';
import InfoCardContainer from '../../Containers/InfoCardContainer/InfoCardContainer';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import './Home.css';

const Home = (props) => {
  return (
    <div className="App">
      <NavBarContainer></NavBarContainer>
      <InfoCardContainer></InfoCardContainer>
    </div>
  )
}

export default Home;
