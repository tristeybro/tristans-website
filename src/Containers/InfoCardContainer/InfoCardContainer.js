import React from 'react';
import InfoCard from '../../Components/InfoCard/InfoCard';

const infoText = [`I am a Brooklyn transplant from Los Angeles.
I write artisinal software made from the finest of keystrokes.
My code creates a rich and vibrant tapestry of indentations that is scenic to behold.`,
`When I am not composing code, I like to repeatedly lift heavy objects from point A to point B.
I also write other stuff that is meant to be read by humans.
I can also play Jingle Bells on the guitar for the holidays.
Avid consumer of politics, literature, and mathematics.
`];

const imageUrl = 'https://s3.amazonaws.com/thetristanity/img/headshot0.jpg';

class InfoCardContainer extends React.Component {
	render() {
		return (
			<InfoCard image={imageUrl} text={infoText}></InfoCard>
		)
	}
}

export default InfoCardContainer;