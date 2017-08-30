import React from 'react';
import styles from './NavBar.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
	return (
		<div className={styles.navbar_container}>
			<Link exact to='/'>
				<img className={styles.navbar_image} src={props.image_src}></img>
			</Link>
			<ul className={styles.navbar}>
				<li><Link to='/bios'>BIO</Link></li>
				<li><Link to='/posts'>POSTS</Link></li>
				<li><Link to='/connect'>CONNECT</Link></li>
			</ul>
		</div>
	)
};

NavBar.propTypes = {
	image_src: PropTypes.string.isRequired,
};

export default NavBar;