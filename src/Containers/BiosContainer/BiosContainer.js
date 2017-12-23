import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import styles from '../../Lib/SharedStyles.css';

class BiosContainer extends React.Component {

	componentDidMount = () => { document.title = "Bio" }

	render() {
		return (
			<div>
				<div className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				<div>Bios</div>
			</div>
		)
	}
};

export default BiosContainer;