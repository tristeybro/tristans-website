import React from 'react';
import styles from './ContactMeForm.css';

class ContactMeForm extends React.Component {

	render() {
		return (
			<form onSubmit={this.props.onFormSubmit} className={styles.contact_me_form}>
				<label for="sender">Email</label><br />
				<input id="sender" name="sender" type="text" placeholder="Enter your email"></input><br />
				<label for="subject">Subject</label>
				<div><input id="subject" name="subject" type="text" placeholder="Enter the subject"></input></div>
				<label for="message">Message</label><br />
				<textarea id="message" name="message" placeholder="What's on your mind?"></textarea><br />
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default ContactMeForm;