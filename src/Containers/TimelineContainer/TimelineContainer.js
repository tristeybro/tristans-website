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
			timelineDiv: null,
			scrollTop: 0,
			zoomController: null,
			svg: null,
			minIntervalHeight: 100,
			numIntervals: 24,
			timelineMargin: 10,
			zoomFactor:0.5,
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

	shouldComponentUpdate() {
		return false;
	}

	captureZoomController = (ref) => {
		this.setState({zoomController: ref});
	}

	captureTimelineDiv = (ref) => {
		this.setState({timelineDiv: d3.select(ref)});
	}

	captureSvg = (ref) => {
		this.setState({svg: d3.select(ref)}, () => this.renderTimeline());
	}

	renderScale = (svg, height) => {
		svg.select("line").remove();
		svg.append("line")
			 .attr("x1", "15%")
			 .attr("x2", "15%")
			 .attr("y1", "0")
			 .attr("y2", `${height}`)
			 .attr("stroke", "white")
			 .attr("stroke-width", "2");
	}

	updateDateTexts = () => {
		const svg = this.state.svg;
		const updatedTextLength = 0.12 * svg.node().getBoundingClientRect().width;
		svg.selectAll("text")
			 .attr("textLength", `${updatedTextLength}`);
	}

	renderTimeline = () => {
		const timelineMargin = this.state.timelineMargin;
		const height = this.state.numIntervals * this.state.minIntervalHeight;

		// Clear out any old points on the timeline.
		const oldPoints = this.state.svg.selectAll("g");
		oldPoints.remove();

		const startDate = new Date("09/01/1990");
		const endDate = new Date();
		const timeScale = d3.scaleLinear()
												.domain([startDate.getTime(), endDate.getTime()])
											  .range([timelineMargin, height + timelineMargin]);


		const timelineDiv = this.state.timelineDiv;
		const svg = this.state.svg;

		this.renderScale(svg, height + 2 * timelineMargin);

		const h = this.calculateSvgHeight(this.state.numIntervals, this.state.minIntervalHeight, this.state.timelineMargin);
		svg.attr("height", h);

		const tooltip = timelineDiv.append("div")	
				    									 .attr("class", styles.tooltip)			
				    									 .style("opacity", 0)
				    									 .style("display", "none")
				    									 .style("position", "absolute");

    const zoomController = d3.select(this.state.zoomController);

		const timePoints = this.getTimePoints(startDate, endDate, this.state.numIntervals);

		const points = svg.append("g")
											.selectAll("g")
											.data(timePoints)
											.enter()
											.append("g")
											.attr("height", "10px")
											.attr("transform", (d) => `translate(0,${timeScale(d.getTime())})`);

		points.append("circle")
					.attr("cx", "15%")
					.attr("r", "4")
					.attr("fill", "white");

		const textLength = 0.12 * svg.node().getBoundingClientRect().width;

		points.append("text")
					.attr("x", "4")
					.attr("dy", "0.35em")
					.attr("stroke", "white")
					.attr("fill", "white")
					.attr("textLength", `${textLength}`)
					.style("font-size", "10")
					.text((d) => d.toLocaleDateString("en-US"));

		const lifeEvents = this.state.svg.append("g").selectAll("g")
								.data(this.state.lifeEvents)
								.enter()
								.append("g")
								.attr("transform", (evt) => `translate(0,${timeScale(new Date(evt.date).getTime())})`);

		const showToolTip = (d) => {
			console.log(this);
	  	tooltip.transition()		
	       		 .duration(100)		
	           .style("opacity", .9)
	           .style("display", "inline-block");	
	    tooltip.html(`<h4>${d.date}</h4>` + `<img src="${d.img}"></img>` + "<br><br>" + d.description)
	    			 .style("left", "calc(15% + 16px)")
	    			 .style("top", `${this.state.scrollTop + 16}px`);
	    zoomController.style("opacity", "0");
		}

		const hideToolTip = (d) => {
    	tooltip.transition()		
      	     .duration(100)		
         	   .style("opacity", 0)
          	 .style("display", "none");
    	zoomController.style("opacity", "1");
		}

		tooltip.on("touchstart", hideToolTip);

		lifeEvents.append("circle")
							.attr("cx", "15%")
							.attr("r", "8")
							.attr("stroke", "orange")
							.attr("stroke-width", "4")
							.attr("fill", "white")
							.attr("class", styles.timeline_point)
							.on("mouseenter", showToolTip)					
			        .on("mouseout", hideToolTip)
			        .on("touchstart", showToolTip)
			        .on("touchcancel", hideToolTip);

	}

	zoomIn = () => {
		const prevNumIntervals = this.state.numIntervals;
		const nextNumIntervals = prevNumIntervals / this.state.zoomFactor;
		if (nextNumIntervals <= 1024) {
			this.setState({
				numIntervals: nextNumIntervals
			}, this.renderTimeline);
		}
	}

	zoomOut = () => {
		const prevNumIntervals = this.state.numIntervals;
		const nextNumIntervals = prevNumIntervals * this.state.zoomFactor;
		if (this.hasZoomOut(nextNumIntervals, this.state.minIntervalHeight)) {
			this.setState({
				numIntervals: nextNumIntervals
			}, this.renderTimeline);
		}
	}

	handleScroll = (elem) => {
		const scrollTop = elem.target.scrollTop;
		this.state.zoomController.style.top = `${scrollTop}px`;
		this.state.scrollTop = scrollTop;
	}

	componentDidMount() {
		if (this.state.isFetchingLifeEvents) {
			fetchLifeEvents().then(val => {
				this.setState({
					isFetchingLifeEvents: false,
					lifeEvents: Object.values(val),
				}, this.renderTimeline);
			});
		}
	}

	hasZoomOut(numIntervals, minIntervalHeight) {
		const proposedHeight = numIntervals * minIntervalHeight;
		const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		const minHeight = Math.min(viewportHeight, 600);
		return proposedHeight >= minHeight;
	}

	calculateSvgHeight = (numIntervals, minIntervalHeight, timelineMargin) => {
		const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		const minHeight = Math.min(viewportHeight, 600);
		const proposedHeight = this.state.numIntervals * this.state.minIntervalHeight;
		const height = proposedHeight <= minHeight ? minHeight : proposedHeight;
		return height + 2 * timelineMargin;
	}

	render() {
		// Listen for orientation changes
		window.addEventListener("resize", () => {
		// Announce the new orientation number
			this.updateDateTexts();
		}, false);

		const height = this.calculateSvgHeight(this.state.numIntervals, this.state.minIntervalHeight, this.state.timelineMargin);		
		return (
			<div className={styles.timeline_container}>
				<div ref={this.captureTimelineDiv} onScroll={this.handleScroll} className={styles.timeline}>
					<svg ref={this.captureSvg} className={styles.chart} width="100%" height={height + 2 * this.state.timelineMargin}>
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