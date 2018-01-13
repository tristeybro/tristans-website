import React from 'react';
import PostCard from '../../Components/PostCard/PostCard';
import styles from './PostsRolodex.css';
import { fetchPosts } from '../../Api/api.js';

class PostsRolodex extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			activePost: null,
		}
	}

	goRight = () => {
		const canGoRight = this.lastCard.postcard.offsetLeft >= 0;
		const horizontalIndex = this.state.horizontalIndex;
		if (canGoRight) {
			this.setState({horizontalIndex: horizontalIndex - 1});
		}
	}

	goLeft = () => {
		const horizontalIndex = this.state.horizontalIndex;
		if (horizontalIndex != 0) {
			this.setState({horizontalIndex: horizontalIndex + 1});
		}
	}

	componentDidMount() {
		fetchPosts().then(val => console.log(val));
	}

	handleHover = (post, event) => {
		this.setState({activePost: post});
	}

	handleUnhover = () => {
		this.setState({activePost: null});
	}

	render() {

		const activePost = this.state.activePost;
		const isModalShown = this.state.isModalShown
		const numProps = this.props.posts.length

		return (
			<div className={styles.container}>
				
				<div className={`${styles.arrow} ${styles.left}`}>
					<img src="https://s3.amazonaws.com/thetristanity/img/left_arrow.png"></img>
				</div>

				<div className={styles.rolodex_outer}>
					<div className={styles.rolodex_inner}>
						{
							this.props.posts.map((post, index) => {
								return (<PostCard key={index} post={post} isActive={false} handleHover={this.handleHover.bind(this, post)} handleUnhover={this.handleUnhover}></PostCard>);
							})	
						}
					</div>
				</div>

				<div className={`${styles.arrow} ${styles.right}`}>
					<img src="https://s3.amazonaws.com/thetristanity/img/right_arrow.png"></img>
				</div>

				{activePost ? <div className={styles.active_post}><PostCard isActive={true} post={activePost}></PostCard></div> : null}
			
			</div>
		)
	}
};

export default PostsRolodex;