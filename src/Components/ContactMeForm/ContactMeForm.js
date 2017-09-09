import React from 'react';
import styles from './ContactMeForm.css';

class ContactMeForm extends React.Component {
	render() {
		return (
			<form className={styles.contact_me_form}>
				<label for="email">Email</label><br />
				<input id="email" name="email" type="text" placeholder="Enter your email"></input><br />
				<label for="subject">Subject</label><br />
				<input id="subject" name="subject" type="text" placeholder="Enter the subject"></input><br />
				<label for="message">Message</label><br />
				<textarea id="message" name="message" placeholder="What's on your mind?"></textarea><br />
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default ContactMeForm;