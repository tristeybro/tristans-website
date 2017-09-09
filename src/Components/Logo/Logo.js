import React from 'react';
import style from './Logo.css';

const Logo = (props) => {
	return (
		<canvas refs="canvas" className={style.logo}>Logo</canvas>
	);
};

export default Logo;
