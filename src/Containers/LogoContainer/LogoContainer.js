import React from 'react';
import Logo from '../../Components/Logo/Logo';
import style from'./LogoContainer.css';

class LogoContainer extends React.Component {

	componentDidMount() {
		this.drawLogo();
	};

	drawLogo() {
		const canvas = this.refs.canvas;
		const context = canvas.getContext('2d');
		//this.drawTheT(canvas, context);
		this.drawTheB(context);
	}

	drawTheT(context) {
		context.fillRect(0, 0, 56, 12);
		context.fillRect(23, 0, 12, 56);
	}

	drawTheB(context) {
		context.fillRect(0, 0, 12, 56);
		context.fillRect(0, 0, 28, 12);
		context.fillRect(0, 22, 28, 12);
		context.fillRect(0, 44, 28, 12);

		context.beginPath();
		context.arc(28, 11 + 6, 17, 1.5*Math.PI, 0.5*Math.PI);
		context.lineTo(28, 12);
		// context.arc(28, 11 + 6, 6, 1.5*Math.PI, 0.5*Math.PI);
		context.stroke();


	}

	render() {
		return (
			<canvas ref="canvas" width="56" height="56" className={style.logo}>Logo</canvas>
		)
	}
}

export default LogoContainer;
