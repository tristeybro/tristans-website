import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import PostsRolodex from '../../Components/PostsRolodex/PostsRolodex';
import { fetchPosts } from '../../Api/api.js';
import styles from './PostsContainer.css';
import sharedStyles from '../../Lib/SharedStyles.css';

class PostsContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isFetchingPosts: true,
			posts: null,
		};
	}

	componentDidMount() {
		document.title = "Posts";
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
		window.addEventListener("scroll", this.handleScroll)

		const isFetchingPosts = this.state.isFetchingPosts;
		return (
			<div className={styles.posts_body}>
				<div ref={this.captureNavbar} className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				<div className={styles.rolodex_container}>
					{ isFetchingPosts ? <div className={sharedStyles.loading}><img src="https://s3.amazonaws.com/thetristanity/img/loading.gif"></img></div>
														: <PostsRolodex posts={this.state.posts}></PostsRolodex> }
				</div>
			</div>
		)
	}
};

export default PostsContainer;