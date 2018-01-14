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
			isActivePostHovered: false,
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
		setTimeout(() => {
			const isActivePostHovered = this.state.isActivePostHovered;
			if (!isActivePostHovered) {
				this.setState({activePost: null})
			}
		}, 200);
	}

	handleActivePostHover = () => {
		this.setState({isActivePostHovered: true});
	}

	handleActivePostUnhover = () => {
		this.setState({isActivePostHovered: false, activePost: null});
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
					{isFetchingPosts ? null
														: <PostsRolodex handleHover={this.handleHover} handleUnhover={this.handleUnhover} posts={this.state.posts}></PostsRolodex> }
				</div>
				{isFetchingPosts ? <div className={sharedStyles.loading}><img src="https://s3.amazonaws.com/thetristanity/img/loading.gif"></img></div> : null}
				{activePost ? <div className={styles.active_post}><PostCard handleUnhover={this.handleActivePostUnhover} handleHover={this.handleActivePostHover.bind(this, activePost)} isActive={true} post={activePost}></PostCard></div> : null}
			</div>
		)
	}
};

export default PostsContainer;