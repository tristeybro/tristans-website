import React from 'react';
import styles from './CryptoModal.css';

const CryptoModal = (props) => {

	const copyToClipboard = () => {
		const address = document.getElementById('address');
 	 	const range = document.createRange();
		range.selectNode(address);
		window.getSelection().addRange(range);
		document.execCommand("copy");
		window.getSelection().removeAllRanges();
		props.showClipboardCopyNotification();
	};

	const info = props.info;
	return (
		<div className={styles.modal}>
			<button onClick={props.exitHandler} className={styles.exit_button}>X</button>
			<div>{info.name}</div>
			<img src={info.qrImg}></img>
			<div className={styles.address_bar}>
				<input id="address" type="text" placeholder={info.address} disabled></input>
				<img className={styles.clipboard}
						 onClick={copyToClipboard}
						 height="14"
						 width="14"
						 src="https://s3.amazonaws.com/thetristanity/img/copy_to_clipboard_icon.png"></img>
			</div>
		</div>
	)
};

export default CryptoModal;