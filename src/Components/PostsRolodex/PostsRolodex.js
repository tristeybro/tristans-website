import React from 'react';
import PostCard from '../../Components/PostCard/PostCard';
import styles from './PostsRolodex.css';
import { fetchPosts } from '../../Api/api.js';

class PostsRolodex extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			horizontalIndex: 0,
		}
	}

	goRight = () => {
		const horizontalIndex = this.state.horizontalIndex;
		this.setState({horizontalIndex: horizontalIndex - 1});
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

	render() {

		const horizontalIndex = this.state.horizontalIndex;
		const isModalShown = this.state.isModalShown

		return (
			<div className={styles.container}>
				
				<div className={styles.rolodex_outer}>
					<div className={styles.rolodex_inner}>

						<div className={styles.arrow} onClick={this.goLeft}>
							<img src="https://s3.amazonaws.com/thetristanity/img/left_arrow.png"></img>
						</div>

						{
							this.props.posts.map((post, index) => {
								return (<PostCard horizontalIndex={horizontalIndex} post={post}></PostCard>)
							})
						}

						<div className={styles.arrow} onClick={this.goRight}>
							<img src="https://s3.amazonaws.com/thetristanity/img/right_arrow.png"></img>
						</div>

					</div>
				</div>
			
			</div>
		)
	}
};

export default PostsRolodex;