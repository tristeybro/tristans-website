import { ref } from '../Config/constants';

export const fetchPosts = () => {
	return ref.child('posts')
		 				.once('value')
     				.then((snapshot) => snapshot.val() || {})
};
