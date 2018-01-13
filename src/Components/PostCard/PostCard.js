import React from 'react';
import styles from './PostCard.css';
import { Link } from 'react-router-dom';
import { urlifyTitle } from '../../Lib/Utils.js';

class PostCard extends React.Component {

	updatePostCardLeftPosition = (e) => {
		if (e != null) {
			this.postcard = e;
			this.postcard.style.left = 0;
		}
	}

	render() {
		
		const horizontalIndex = this.props.horizontalIndex;
		const left = 0; //horizontalIndex * 50 + '%';
		const post = this.props.post;
		const urlTitle = urlifyTitle(post.title, post.id);
		const urlPath = `/posts/${post.id}/${urlTitle}`;

		return (
			<Link to={urlPath}>
				<div className={styles.postcard}>
						<div className={styles.text_section}>
							<div className={styles.title}>{post.title}</div>
							<div className={styles.date}>{ new Date(post.date).toLocaleDateString("en-US") }</div>
						</div>
						<img className={styles.img} src={post.img}></img>
				</div>
			</Link>
		)
	}

}

export default PostCard;