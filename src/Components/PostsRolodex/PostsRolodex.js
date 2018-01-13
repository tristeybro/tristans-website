import React from 'react';
import PostCard from '../../Components/PostCard/PostCard';
import styles from './PostsRolodex.css';
import { fetchPosts } from '../../Api/api.js';

class PostsRolodex extends React.Component {

	render() {
		return (
			<div className={styles.container}>
				
				<div className={`${styles.arrow} ${styles.left}`}>
					<img src="https://s3.amazonaws.com/thetristanity/img/left_arrow.png"></img>
				</div>

				<div className={styles.rolodex_outer}>
					<div className={styles.rolodex_inner}>
						{
							this.props.posts.map((post, index) => {
								return (<PostCard key={index} post={post} isActive={false} handleHover={this.props.handleHover.bind(this, post)} handleUnhover={this.props.handleUnhover}></PostCard>);
							})	
						}
					</div>
				</div>

				<div className={`${styles.arrow} ${styles.right}`}>
					<img src="https://s3.amazonaws.com/thetristanity/img/right_arrow.png"></img>
				</div>			
			</div>
		)
	}
};

export default PostsRolodex;