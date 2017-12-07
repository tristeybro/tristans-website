import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import PostsRolodex from '../../Components/PostsRolodex/PostsRolodex';
import { fetchPosts } from '../../Api/api.js';
import styles from './PostsContainer.css';

class PostsContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isFetchingPosts: true,
			posts: null
		};
	}

	componentDidMount() {
		if (this.state.isFetchingPosts) {
			fetchPosts().then(val => {
				this.setState({
					isFetchingPosts: false,
					posts: Object.values(val),
				});
			});
		}
	}

	render() {
		const isFetchingPosts = this.state.isFetchingPosts;
		return (
			<div className={styles.posts_body}>
				<div className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				<div className={styles.rolodex_container}>
					{ isFetchingPosts ? <div>Fetching posts...</div>
														: <PostsRolodex posts={this.state.posts}></PostsRolodex> }
				</div>
			</div>
		)
	}
};

export default PostsContainer;