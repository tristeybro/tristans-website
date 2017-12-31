import React from 'react';
import Timeline from '../../Components/Timeline/Timeline';
import Tooltip from '../../Components/Tooltip/Tooltip';
import styles from './TimelineContainer.css';
import * as d3 from 'd3';

const events = [
	{date: "09/30/1990", description: "Born in Los Angeles, CA.", img: "https://s3.amazonaws.com/thetristanity/img/me_as_baby.jpg"},
	{date: "11/01/2005", description: "Started wrestling in high school.", img: "https://s3.amazonaws.com/thetristanity/img/wrestling_minimalist_logo.jpg"},
	{date: "05/12/2006", description: "Got our first house dog, subsequently named Chachy by my sister. Still have not gotten another dog named Joni.", img: "https://s3.amazonaws.com/thetristanity/img/chachy_lookback.jpg"},
	{date: "08/12/2007", description: "Took my first shirtless mirror pic.", img: "https://s3.amazonaws.com/thetristanity/img/first_shirtless_mirror_pic.jpg"},
	{date: "05/01/2008", description: "Graduated from Rancho Cucamonga High School.", img: "https://s3.amazonaws.com/thetristanity/img/rchs_badge.jpeg"},
	{date: "05/01/2012", description: "Graduated from Stanford University", img: "https://s3.amazonaws.com/thetristanity/img/stanford.jpg"},
	{date: "08/01/2012", description: "Moved to New York City", img: "https://s3.amazonaws.com/thetristanity/img/times_square.jpeg"},
	{date: "09/01/2012", description: "Started working at OkCupid via Match Media Group", img: "https://s3.amazonaws.com/thetristanity/img/okcupid.jpg"},
	{date: "05/01/2015", description: "Received a masters degree in computer science with a focus in machine learning from Columbia University", img: "https://s3.amazonaws.com/thetristanity/img/columbia_university.jpg"},
	{date: "06/14/2015", description: "Started working at Shutterstock, not to be confused with Shutterfly. Never quite realized my dream of becoming a stock photography model.", img: "https://s3.amazonaws.com/thetristanity/img/spaghetti_stock_photo.jpg"},
	{date: "09/01/2016", description: "Moved to a new apartment inside a church in Williamsburg. I now go to church every day.", img: "https://s3.amazonaws.com/thetristanity/img/spire_lofts.jpg"},
	{date: "02/01/2017", description: "Started investing in cryptocurrencies. Coincidentally, also began to lament losing all those Bitcoins in college.", img: "https://s3.amazonaws.com/thetristanity/img/bitcoin.jpg"},
	{date: "01/16/2017", description: "Visited Cuba in order to avoid the first week of Donald Trump's presidency.", img: "https://s3.amazonaws.com/thetristanity/img/riding_horses_in_cuba_mini.jpg"},
	{date: "01/09/2017", description: "Started working at a startup called Google. Can now use the pick-up line: 'are you my employer because you are everything I am searching for.'", img: "https://s3.amazonaws.com/thetristanity/img/google_logo.jpg"},
	{date: "09/15/2017", description: "Visited Europe for the first time. Went to Greece, Italy, Croatia, Austria and Germany.", img: "https://s3.amazonaws.com/thetristanity/img/me_at_oktoberfest.jpeg"}
];

class TimelineContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			zoomController: null,
			svg: null,
			minIntervalHeight: 100,
			numIntervals: 240,
			height: 100 * 240,
			timelineMargin: 10,
			intervalDelta: 24,
		}
	}

	getTimePoints = (startDate, endDate, numIntervals) => {
		const timeDelta = (endDate - startDate) / numIntervals;
		const timePoints = [];
		let currentDate = startDate;
		while(currentDate < endDate) {
			timePoints.push(currentDate);
			currentDate = new Date(currentDate.getTime() + timeDelta);
		}
		return timePoints;
	}

	shouldComponentUpdate() { return false }

	captureZoomController = (ref) => {
		this.setState({zoomController: ref});
	}

	onRef = (ref) => {
		this.setState({svg: d3.select(ref)}, () => this.renderTimeline());
	}

	renderTimeline = () => {
		// Clear out any old points on the timeline.
		const oldPoints = this.state.svg.selectAll("g");
		oldPoints.remove();

		const timelineMargin = this.state.timelineMargin;
		const startDate = new Date("09/01/1990");
		const endDate = new Date();
		const timeScale = d3.scaleLinear()
												.domain([startDate.getTime(), endDate.getTime()])
											  .range([timelineMargin, this.state.height + timelineMargin]);

		const tooltip = d3.select("body")
											.append("div")	
    									.attr("class", styles.tooltip)				
    									.style("opacity", 0)
    									.style("display", "none")
    									.style("position", "absolute");

		const timePoints = this.getTimePoints(startDate, endDate, this.state.numIntervals);

		const points = this.state.svg.append("g").selectAll("g")
								.data(timePoints)
								.enter()
								.append("g")
								.attr("transform", (d) => `translate(100,${timeScale(d.getTime())})`);

		points.append("circle")
					.attr("r", "4")
					.attr("fill", "white");

		points.append("text")
					.attr("x", "-90")
					.attr("dy", "0.35em")
					.attr("stroke", "white")
					.attr("fill", "white")
					.text((d) => d.toLocaleDateString("en-US"));

		const lifeEvents = this.state.svg.append("g").selectAll("g")
								.data(events)
								.enter()
								.append("g")
								.attr("transform", (evt) => `translate(100,${timeScale(new Date(evt.date).getTime())})`);

		lifeEvents.append("circle")
							.attr("r", "8")
							.attr("stroke", "orange")
							.attr("stroke-width", "4")
							.attr("fill", "white")
							.on("mouseenter", (d) => {	
		          	tooltip.transition()		
		               		 .duration(100)		
		                   .style("opacity", .9)
		                   .style("display", "inline-block");	
		            tooltip.html(`<h4>${d.date}</h4>` + `<img src="${d.img}"></img>` + "<br><br>" + d.description)
		            	     .style("left", (d3.event.pageX + 20) + "px")		
                	     .style("top", (d3.event.pageY - 28) + "px");
		          })					
			        .on("mouseout", (d) => {		
			        	tooltip.transition()		
	                     .duration(100)		
	                     .style("opacity", 0)
	                     .style("display", "none");
			        });

	}

	zoomIn = () => {
		const prevNumIntervals = this.state.numIntervals;
		const nextNumIntervals = prevNumIntervals + this.state.intervalDelta;
		if (nextNumIntervals <= 1024) {
			this.setState({
				numIntervals: nextNumIntervals
			});
			this.renderTimeline();
		}
	}

	zoomOut = () => {
		const prevNumIntervals = this.state.numIntervals;
		const nextNumIntervals = prevNumIntervals - this.state.intervalDelta;
		if (nextNumIntervals >= 1) {
			this.setState({
				numIntervals: nextNumIntervals
			});
			this.renderTimeline();
		}
	}

	handleScroll = (elem) => {
		this.state.zoomController.style.top = `${elem.target.scrollTop}px`;
	}

	render() {
		const height = this.state.height;
		return (
			<div className={styles.timeline_container}>
				<div onScroll={this.handleScroll} className={styles.timeline}>
					<svg ref={this.onRef} className={styles.chart} width="600" height={height + 2 * this.state.timelineMargin}>
						<line x1="100" y1="0" x2="100" y2={height + 2 * this.state.timelineMargin} stroke="white" stroke-width="10"></line>
					</svg>
					<div ref={this.captureZoomController} className={styles.zoom_controller}>
						<img onClick={this.zoomIn} src="https://s3.amazonaws.com/thetristanity/img/orange_plus_sign.png"></img>
						<img onClick={this.zoomOut} src="https://s3.amazonaws.com/thetristanity/img/orange_minus_sign.png"></img>
					</div>
				</div>
			</div>
		);
	}
}

export default TimelineContainer;