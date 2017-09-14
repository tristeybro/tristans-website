import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import PostsRolodex from '../../Components/PostsRolodex/PostsRolodex';
import styles from './PostsContainer.css';

const fakePosts = [
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 1",
		date: "09/01/01",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 2",
		date: "09/01/02",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 3",
		date: "09/01/03",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 1",
		date: "09/01/01",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 2",
		date: "09/01/02",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 3",
		date: "09/01/03",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 1",
		date: "09/01/01",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 2",
		date: "09/01/02",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 3",
		date: "09/01/03",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 1",
		date: "09/01/01",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 2",
		date: "09/01/02",
	},
	{
		img: "https://s3.amazonaws.com/thetristanity/img/tb_monogram.png",
		title: "Fake Post 3",
		date: "09/01/03",
	}
];

class PostsContainer extends React.Component {
	render() {
		return (
			<div className={styles.posts_body}>
				<NavBarContainer></NavBarContainer>
				<PostsRolodex posts={fakePosts}></PostsRolodex>
			</div>
		)
	}
};

export default PostsContainer;