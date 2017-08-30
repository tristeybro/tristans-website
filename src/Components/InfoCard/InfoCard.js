import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './InfoCard.css';

const InfoCard = (props) => {
	return (
		<div className={styles.infocard}>
			<img src={props.image}></img>
			<div>
				{props.text.map(x => {
					return <p>{x}</p>;
				})
				}
			</div>
		</div>
	)
}

InfoCard.propTypes = {
	image: PropTypes.string.isRequired,
	text: PropTypes.array.isRequired,
};

export default InfoCard;