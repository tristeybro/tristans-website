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

				<div className={styles.text_section}>
					<div className={styles.title}>{post.title}</div>
					<div className={styles.date}>{ new Date(post.date).toLocaleDateString("en-US") }</div>
				</div>

				<img className={styles.img} src={post.img}></img>

			</div>
		)
	}

}

export default PostCard;