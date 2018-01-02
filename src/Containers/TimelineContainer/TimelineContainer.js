import React from 'react';
import Timeline from '../../Components/Timeline/Timeline';
import Tooltip from '../../Components/Tooltip/Tooltip';
import styles from './TimelineContainer.css';
import { fetchLifeEvents } from '../../Api/api.js';
import * as d3 from 'd3';

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
			isFetchingLifeEvents: true,
			lifeEvents: [],
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

    const zoomController = d3.select(this.state.zoomController);

		const timePoints = this.getTimePoints(startDate, endDate, this.state.numIntervals);

		const points = this.state.svg.append("g").selectAll("g")
								.data(timePoints)
								.enter()
								.append("g")
								.attr("transform", (d) => `translate(0,${timeScale(d.getTime())})`);

		points.append("circle")
					.attr("cx", "15%")
					.attr("r", "4")
					.attr("fill", "white");

		points.append("text")
					.attr("x", "0")
					.attr("dy", "0.35em")
					.attr("stroke", "white")
					.attr("fill", "white")
					.text((d) => d.toLocaleDateString("en-US"));

		const lifeEvents = this.state.svg.append("g").selectAll("g")
								.data(this.state.lifeEvents)
								.enter()
								.append("g")
								.attr("transform", (evt) => `translate(0,${timeScale(new Date(evt.date).getTime())})`);

		lifeEvents.append("circle")
							.attr("cx", "15%")
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
                zoomController.style("opacity", "0");
		          })					
			        .on("mouseout", (d) => {		
			        	tooltip.transition()		
	                     .duration(100)		
	                     .style("opacity", 0)
	                     .style("display", "none");
	              zoomController.style("opacity", "1");
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

	componentDidMount() {
		if (this.state.isFetchingLifeEvents) {
			fetchLifeEvents().then(val => {
				this.setState({
					isFetchingLifeEvents: false,
					lifeEvents: Object.values(val),
				});
				this.renderTimeline();
			});
		}
	}

	render() {
		const height = this.state.height;
		return (
			<div className={styles.timeline_container}>
				<div onScroll={this.handleScroll} className={styles.timeline}>
					<svg ref={this.onRef} className={styles.chart} width="100%" height={height + 2 * this.state.timelineMargin}>
						<line x1="15%" y1="0" x2="15%" y2={height + 2 * this.state.timelineMargin} stroke="white" stroke-width="10"></line>
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