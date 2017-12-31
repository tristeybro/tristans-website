import React from 'react';
import styles from './Tooltip.css';

class Tooltip extends React.Component {
	render() {
		const left = `${this.props.dx}px`;
		const top = `${this.props.dy}px`;
		return (
			<div className={styles.tooltip}
					 ref={(e) => { if (e != null) {this.tooltip = e; this.tooltip.style.left=left; this.tooltip.style.top=top;}}}></div>
		);
	}
}

export default Tooltip;