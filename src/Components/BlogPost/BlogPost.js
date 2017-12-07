import React from 'react';
import styles from './BlogPost.css';

class BlogPost extends React.Component {

	rawMarkup() {
		var rawMarkup = this.props.postContent;
    return { __html: rawMarkup };
	}

	render() {
		return (
			<div>
				<div className={styles.post}>
					<div className={styles.heading}>
						<h1>{this.props.title}</h1>
						<p className={styles.date}>{new Date(this.props.date).toLocaleDateString("en-US")}</p>
					</div>
					<div className={styles.content} dangerouslySetInnerHTML={this.rawMarkup()}></div>
				</div>
			</div>
		)
	}
}

export default BlogPost;