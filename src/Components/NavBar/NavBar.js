import React from 'react';
import styles from './NavBar.css';
import PropTypes from 'prop-types';

const NavBar = (props) => {
	return (
		<div className={styles.navbar_container}>
			<img className={styles.navbar_image} src={props.image_src}></img>
			<ul className={styles.navbar}>
				<li>BIO</li>
				<li>POSTS</li>
				<li>CONNECT</li>
			</ul>
		</div>
	)
};

NavBar.propTypes = {
	image_src: PropTypes.string.isRequired,
};

export default NavBar;