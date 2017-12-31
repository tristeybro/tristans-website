import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import TimelineContainer from '../../Containers/TimelineContainer/TimelineContainer';
import styles from '../../Lib/SharedStyles.css';

class BiosContainer extends React.Component {

	componentDidMount = () => { document.title = "Bio" }

	render() {
		return (
			<div>
				<div className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				<TimelineContainer></TimelineContainer>
			</div>
		)
	}
};

export default BiosContainer;