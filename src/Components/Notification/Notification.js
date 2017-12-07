import React from 'react';
import styles from './Notification.css';

const Notification = (props) => {
	return (
		<div className={styles.notification}>{props.message}</div>
	)
};

export default Notification;