import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import PostCard from '../../Components/PostCard/PostCard';
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
			activePost: null,
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

	handleHover = (post) => {
		this.setState({activePost: post});
	}

	handleUnhover = () => {
		this.setState({activePost: null});
	}

	render() {
		window.addEventListener("scroll", this.handleScroll)
		const activePost = this.state.activePost;
		const isFetchingPosts = this.state.isFetchingPosts;
		return (
			<div className={styles.posts_body}>
				<div ref={this.captureNavbar} className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				<div className={styles.rolodex_container}>
					{ isFetchingPosts ? <div className={sharedStyles.loading}><img src="https://s3.amazonaws.com/thetristanity/img/loading.gif"></img></div>
														: <PostsRolodex handleHover={this.handleHover} handleUnhover={this.handleUnhover} posts={this.state.posts}></PostsRolodex> }
				</div>
				{activePost ? <div className={styles.active_post}><PostCard isActive={true} post={activePost}></PostCard></div> : null}
			</div>
		)
	}
};

export default PostsContainer;