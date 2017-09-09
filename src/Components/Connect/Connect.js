import React from 'react';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import ContactMeForm from '../../Components/ContactMeForm/ContactMeForm';
import styles from './Connect.css';
import _ from 'lodash';

const contactMeText = `
	Feel free to reach out and message me through one of the channels below.
	I usually respond as long as you're not a weirdo.
	I believe in making thoughtful connections so I probably won't add you on
	anything if we haven't met before or had some meaningful form of conversation (online or otherwise).
`;

const iconHrefs = [
	'https://s3.amazonaws.com/thetristanity/img/twitter_square.png',
	'https://s3.amazonaws.com/thetristanity/img/facebook_square.png',
	'https://s3.amazonaws.com/thetristanity/img/linkedin_square.png',
	'https://s3.amazonaws.com/thetristanity/img/instagram_square.png',
	'https://s3.amazonaws.com/thetristanity/img/thought_catalog_icon.jpg',
];

const iconLinks = [
	'//twitter.com/OhTheTristanity',
	'//facebook.com/ohthetristanity',
	'//linkedin.com/in/tristan-benavides-4a270a25',
	'//instagram.com/a_tristan_benavides',
	'//thoughtcatalog.com/tristan-benavides/',
];

const Connect = (props) => {
	return (
		<div>
			<NavBarContainer></NavBarContainer>

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
				<li>BTC: 1MEpQmh62ukJNwKM4SCStysHwrCu157DeT</li>
				<li>ETH: 0xB952335ac6aC23AD53739AB6E2FCd93494040ba2</li>
				<li>LTC: LbxJb3q13Lt4XamhhMmvf4pGeXY97xGKf8</li>
			</ul>
			</div>

		</div>
	)
};

export default Connect;
