import React from 'react';
import styles from './Arrow.css';

class Arrow extends React.Component {
	render() {
		const leftPoints = " 45.63,75.8 0.375,38.087 45.63,0.375 ";
		const rightPoints = " 0.375,0.375 45.63,38.087 0.375,75.8 ";
		const points = this.props.isLeftArrow ? leftPoints : rightPoints;
		return (
			<button className={styles.arrow} onClick={this.props.onClick}>
	  		<svg width="60px"
	  				 height="80px"
	  				 viewBox="0 0 50 80">
	    		<polyline fill="none"
	    							stroke="blue"
	    							stroke-width="1"
	    							stroke-linecap="round"
	    							stroke-linejoin="round"
	    							points={points}>
	    		</polyline>
	  		</svg>  
			</button>
		)
	}
}

export default Arrow;