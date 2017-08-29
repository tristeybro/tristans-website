import React from 'react';
import styles from './NavBar.css';

const NavBar = (props) => {
	return (
		<ul className={styles.navbar}>
			<li>Bio</li>
			<li>Blog Posts</li>
			<li>Connect</li>
		</ul>
	)
}

export default NavBar;