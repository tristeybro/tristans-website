import React from 'react';
import styles from './NavBar.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isNavbarShown: false,
		};
	}

	toggleNavLinks = () => {
		this.setState({ isNavbarShown: !this.state.isNavbarShown });
	}

	render() {
		const navbarLinkClasses = this.state.isNavbarShown ? `${styles.navbar_link} ${styles.active}` : `${styles.navbar_link}`;
		return (
			<div className={styles.navbar_container}>

				<div className={styles.logo_container}>
					<Link exact to='/'>
						<img className={styles.navbar_image} src={this.props.image_src}></img>
					</Link>
					<div className={styles.hamburger_menu_container}>
						<img src="https://s3.amazonaws.com/thetristanity/img/hamburger_menu_icon.png" onClick={this.toggleNavLinks}></img>
					</div>
				</div>

				<Link className={navbarLinkClasses} to='/bios'>BIO</Link>
				<Link className={navbarLinkClasses} to='/posts'>POSTS</Link>
				<Link className={navbarLinkClasses} to='/connect'>CONNECT</Link>

			</div>
		)
	};
}

NavBar.propTypes = {
	image_src: PropTypes.string.isRequired,
};

export default NavBar;