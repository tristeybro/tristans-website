import React from 'react';
import styles from './NavBar.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
	return (
		<div className={styles.navbar_container}>

			<div className={styles.logo_container}>
				<Link exact to='/'>
					<img className={styles.navbar_image} src={props.image_src}></img>
				</Link>
				<div className={styles.hamburger_menu_container}>
					<img src="https://s3.amazonaws.com/thetristanity/img/hamburger_menu_icon.png"></img>
				</div>
			</div>

			<div className={styles.navbar_link}><Link to='/bios'>BIO</Link></div>
			<div className={styles.navbar_link}><Link to='/posts'>POSTS</Link></div>
			<div className={styles.navbar_link}><Link to='/connect'>CONNECT</Link></div>



		</div>
	)
};

NavBar.propTypes = {
	image_src: PropTypes.string.isRequired,
};

export default NavBar;