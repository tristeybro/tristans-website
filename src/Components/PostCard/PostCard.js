import React from 'react';
import styles from './PostCard.css';

class PostCard extends React.Component {

	render() {

		const post = this.props.post;
		const horizontalIndex = this.props.horizontalIndex;
		const left = horizontalIndex * 100 + '%';

		return (
			<div ref={(e) => { if (e != null) {e.style.left = left}}}
					 className={styles.postcard}>
				<p className={styles.title}>{post.title}</p>
				<img className={styles.img}src={post.img}></img>
				<p className={styles.date}>{post.date}</p>
			</div>
		)
	}

}

export default PostCard;