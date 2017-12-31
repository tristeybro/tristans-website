import { ref } from '../Config/constants';

export const fetchPosts = () => {
	return ref.child('blog_post_metadata')
		 				.once('value')
     				.then((snapshot) => snapshot.val() || {});
};

export const fetchPost = (id) => {
	return ref.child(`blog_post_content/${id}`)
						.once('value')
						.then((snapshot) => snapshot.val() || {});
};

export const fetchLifeEvents = () => {
	return ref.child('life_events')
						.once('value')
						.then((snapshot) => snapshot.val() || {});
};
