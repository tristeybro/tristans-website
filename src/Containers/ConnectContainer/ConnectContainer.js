import React from 'react';
import Connect from '../../Components/Connect/Connect';
import NavBarContainer from '../../Containers/NavBarContainer/NavBarContainer';
import Notification from '../../Components/Notification/Notification';
import CryptoModal from '../../Components/CryptoModal/CryptoModal';
import styles from '../../Lib/SharedStyles.css';

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

const cryptoLinks = [
	{
		name: "BTC",
		address: "1MEpQmh62ukJNwKM4SCStysHwrCu157DeT",
		qrImg: "https://s3.amazonaws.com/thetristanity/img/btc_qr_code.png",
	},
	{
		name: "ETH",
		address: "0xB952335ac6aC23AD53739AB6E2FCd93494040ba2",
		qrImg: "https://s3.amazonaws.com/thetristanity/img/eth_qr_code.png",
	},
	{
		name: "LTC",
		address: "LbxJb3q13Lt4XamhhMmvf4pGeXY97xGKf8",
		qrImg: "https://s3.amazonaws.com/thetristanity/img/ltc_qr_code.png",
	},
];

class ConnectContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeCryptoLink: null,
			isClipboardCopyNotificationShown: false,
		};
	}

	onClickHandler = (cryptoLink, e) => {
		this.setState({ activeCryptoLink: cryptoLink })
	}

	exitHandler = () => {
		this.setState({activeCryptoLink: null})
	}

	showClipboardCopyNotification = () => {
		this.setState({isClipboardCopyNotificationShown: true});
		setTimeout(() => this.setState({isClipboardCopyNotificationShown: false}), 1000);
	}

	componentDidMount = () => { document.title = "Connect" }

	render() {
		const activeCryptoLink = this.state.activeCryptoLink;
		const isClipboardCopyNotificationShown = this.state.isClipboardCopyNotificationShown;
		return (
			<div>
				<div className={styles.navbar_container}>
					<NavBarContainer></NavBarContainer>
				</div>
				<Connect iconHrefs={iconHrefs}
								 iconLinks={iconLinks}
								 cryptoLinks={cryptoLinks}
								 contactMeText={contactMeText}
								 onClick={this.onClickHandler}>
				</Connect>
				{ activeCryptoLink ? <CryptoModal exitHandler={this.exitHandler}
																					info={activeCryptoLink}
																					showClipboardCopyNotification={this.showClipboardCopyNotification}></CryptoModal>
													 : null }
				{ isClipboardCopyNotificationShown ? <Notification message={"Address Copied To Clipboard"}></Notification> : null }
			</div>
		)
	}
};

export default ConnectContainer;
