import React from 'react';
import styles from './NavBar.css';
import PropTypes from 'prop-types';
import {  NavLink } from 'react-router-dom'

class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isNavbarShown: false,
		};
	}

	handleLinkClick = (e) => {
		const target = e.target;
		target.style.backgroundColor = "red";
	}

	toggleNavLinks = () => {
		this.setState({ isNavbarShown: !this.state.isNavbarShown });
	}

	render() {
		const navbarLinkClasses = this.state.isNavbarShown ? `${styles.navbar_link} ${styles.active}` : `${styles.navbar_link}`;
		return (
			<div className={styles.navbar_container}>

				<div className={styles.logo_container}>
					<NavLink exact to='/'>
						<img className={styles.navbar_image} src={this.props.image_src}></img>
					</NavLink>
					<div className={styles.hamburger_menu_container}>
						<img src="https://s3.amazonaws.com/thetristanity/img/hamburger_menu_icon.png" onClick={this.toggleNavLinks}></img>
					</div>
				</div>

				<NavLink to='/bios' className={navbarLinkClasses} activeClassName={styles.active_navbar_link}>BIO</NavLink>
				<NavLink to='/posts' className={navbarLinkClasses} activeClassName={styles.active_navbar_link}>POSTS</NavLink>
				<NavLink to='/connect' className={navbarLinkClasses} activeClassName={styles.active_navbar_link}>CONNECT</NavLink>

			</div>
		)
	};
}

NavBar.propTypes = {
	image_src: PropTypes.string.isRequired,
};

export default NavBar;