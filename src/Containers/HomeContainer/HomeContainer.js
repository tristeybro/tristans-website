import React from 'react';
import Home from '../../Components/Home/Home';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import styles from '../../Lib/SharedStyles.css';

class HomeContainer extends React.Component {
	render() {
		return (
			<div>
				<div className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				<Home></Home>
			</div>
		)
	}
};

export default HomeContainer;