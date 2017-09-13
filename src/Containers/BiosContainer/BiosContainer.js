import React from 'react';
import * as d3 from 'd3';
import styles from "./BiosContainer.css";
import NavBarContainer from "../../Containers/NavBarContainer/NavBarContainer";
import Arrow from '../../Components/Arrow/Arrow';
import InfoCard from '../../Components/InfoCard/InfoCard';
import { fetchBioInfos } from '../../lib/Utils.js';

const height = 200;
const width = 300;

const startDate = new Date(1989, 12, 1);
const endDate = new Date(1990, 12, 1);

class BiosContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			ticks: 10,
			year: 1990,
			startYear: 1990,
			endYear: 2016,
			currentInfo: null,
			bioInfos: [],
		};
	}

	incrementYear = () => {
		const year = this.state.year;
		if (year + 1 <= this.state.endYear) {
			this.setState({year: year + 1});
		}
	}

	decrementYear = () => {
		const year = this.state.year;
		if (year - 1 >= this.state.startYear) {
			this.setState({year: year - 1});
		}
	}

	componentWillMount() {
		const bioInfos = fetchBioInfos();
		this.setState({bioInfos: bioInfos});
	}

	componentDidMount() {

		alert(new Date(this.state.bioInfos[0].startDate));

		const scale = d3.scaleTime()
										.domain([startDate, endDate])
										.range([0, width]);

		const svg = d3.select(".timeline_container")
									.append("svg")
									.attr("class", "timeline")
									.attr("width", width + 50)
									.attr("height", height + 50);
		
		const monthAxis = d3.axisTop()
												.scale(scale)
												.ticks(12)
												.tickFormat(date => date.toLocaleDateString('en-GB', {month: 'short'}))
												.tickSize(-height);

		const dayAxis = d3.axisBottom()
										.scale(scale)
										.ticks(20)
										.tickFormat(date => '')
										.tickSize(-10);

		svg.append('g')
			 .attr("transform", "translate(10, 25)")
			 .call(monthAxis)
			 .append('g')
			 .attr("transform", "translate(0, 200)")
			 .call(dayAxis);

		svg.selectAll("rect")
			 .data(this.state.bioInfos)
			 .enter()
			 .append("rect")
			 .attr("x", d => scale(new Date(d.startDate)))
			 .attr("y", 25)
			 .attr("width", d => Math.max(10, scale(new Date(d.endDate)) - scale(new Date(d.startDate))))
			 .attr("height", 20);
	}

	render() {
		return (
			<div>
				<NavBarContainer></NavBarContainer>
				<div className={styles.header}>{this.state.year}</div>
				<div className={styles.container}>
					<Arrow isLeftArrow={true} onClick={this.decrementYear}></Arrow>
					<div className="timeline_container"></div>
					<Arrow isLeftArrow={false} onClick={this.incrementYear}></Arrow>
				</div>
				{ this.state.infoCard ? (<InfoCard></InfoCard>) : null }
			</div>
		)
	}
};

export default BiosContainer;
