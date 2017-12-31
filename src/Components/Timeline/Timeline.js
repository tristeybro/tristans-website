import React from 'react';
import styles from './Timeline.css';

const Timeline = (props) => {
	return (
		<span>
			<svg className={styles.timeline} width="600" height="600">
				<line x1="50" y1="0" x2="50" y2="600" stroke="white" stroke-width="10"></line>
			</svg>
		</span>
	)
}

export default Timeline;