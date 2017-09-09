import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';

const image_src = "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png";

class NavBarContainer extends React.Component {
	render() {
		return (
			<NavBar image_src={image_src}></NavBar>
		)
	}
}

export default NavBarContainer;