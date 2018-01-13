import React from 'react';
import styles from './PostCard.css';
import { Link } from 'react-router-dom';
import { urlifyTitle } from '../../Lib/Utils.js';

class PostCard extends React.Component {

	render() {
		
		const post = this.props.post;
		const isActive = this.props.isActive;
		const urlTitle = urlifyTitle(post.title, post.id);
		const urlPath = `/posts/${post.id}/${urlTitle}`;
		const postcardClassName = isActive ? `${styles.postcard} ${styles.active}` : `${styles.postcard}`;

		return (
			<Link to={urlPath}>
				<div onMouseOver={this.props.handleHover} onMouseLeave={this.props.handleUnhover} className={postcardClassName}>
						{isActive ?
							<div className={styles.text_section}>
								<div className={styles.title}>{post.title}</div>
								<div className={styles.date}>{ new Date(post.date).toLocaleDateString("en-US") }</div>
							</div> : null
						}
						<img className={styles.img} src={post.img}></img>
				</div>
			</Link>
		)
	}

}

export default PostCard;