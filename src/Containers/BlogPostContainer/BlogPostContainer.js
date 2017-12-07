import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import BlogPost from '../../Components/BlogPost/BlogPost';
import { fetchPost } from '../../Api/api.js';
import styles from '../../Lib/SharedStyles.css';

class BlogPostContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isFetchingPost: true,
			postContent: null,
			title: null,
			date: null,
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (this.state.isFetchingPost) {
			fetchPost(id).then(({title, date, content}) => {
				console.log(title);
				this.setState({
					isFetchingPost: false,
					postContent: content,
					title: title,
					date: date,
				});
			});
		}		
	}

	render() {
		const isFetchingPost = this.state.isFetchingPost;
		const postContent = this.state.postContent;
		const title = this.state.title;
		const date = this.state.date;
		return (
			<div>
				<div className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				{isFetchingPost ? (<div>Loading...</div>) : (<BlogPost title={title} date={date} postContent={postContent}></BlogPost>)}
			</div>
		)
	}
}

export default BlogPostContainer;