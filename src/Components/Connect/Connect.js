import React from 'react';
import ContactMeForm from '../../Components/ContactMeForm/ContactMeForm';
import styles from './Connect.css';
import _ from 'lodash';

const Connect = (props) => {

	const cryptoLinks = props.cryptoLinks;
	const iconHrefs = props.iconHrefs;
	const iconLinks = props.iconLinks;
	const contactMeText = props.contactMeText;

	return (
		<div>
			<b1 className={styles.heading}>Contact Me</b1>
			<p className={styles.text_section}>{contactMeText}</p>

			<b1 className={styles.heading}>Social Media</b1>
			<div className={styles.media_links_container}>
				{
					_.zip(iconHrefs, iconLinks)
					 .map(([iconHref, iconLink], index) => {
					 	return (
					 		<div className={styles.media_link}>
							 	<a href={iconLink}>
							 		<img src={iconHref}></img>
							 	</a>
						 	</div>
					 	)
					 })
				}
			</div>

			<b1 className={styles.heading}>Contact Me</b1>
			<div className={styles.contact_me_form}>
				<ContactMeForm></ContactMeForm>
			</div>

			<b1 className={styles.heading}>Donate</b1>
			<div className={styles.donate_section}>
				<ul className={styles.donate_list}>
					{ cryptoLinks.map((cl, i) => (<li onClick={props.onClick.bind(this, cl)} key={i}>{cl.name}: <button>{cl.address}</button></li>)) }
				</ul>
			</div>

		</div>
	)
};

export default Connect;
