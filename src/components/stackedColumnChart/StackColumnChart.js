import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
 
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StackedColumnChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "",
				fontFamily: "Arial"
			},
			axisY: {
				title: "assignment numbers",
				includeZero: true,
				prefix: "",
				suffix: ""
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
			{
				type: "stackedColumn",
				name: "Complete",
				showInLegend: true,
				yValueFormatString: "#,### assignments",
				dataPoints: [
					{ label: "Jul", y: 14 },
					{ label: "Aug", y: 14 },
					{ label: "Sept", y: 13 },
					{ label: "Oct", y: 14 },
					{ label: "Nov", y: 14 },
					{ label: "Dec", y: 14 },
					{ label: "Jan", y: 14 },
					{ label: "Feb", y: 12 },
					{ label: "Mar", y: 14 },
					{ label: "Apr", y: 13 },
					{ label: "May", y: 13 },
					{ label: "Jun", y: 13 },
				],
				color: 'green'
			},
			{
				type: "stackedColumn",
				name: "Overdues",
				showInLegend: true,
				yValueFormatString: "#,### assignments",
				dataPoints: [
					{ label: "Jul", y: 0 },
					{ label: "Aug", y: 5 },
					{ label: "Sept", y: 1 },
					{ label: "Oct", y: 2 },
					{ label: "Nov", y: 0 },
					{ label: "Dec", y: 1 },
					{ label: "Jan", y: 2 },
					{ label: "Feb", y: 1 },
					{ label: "Mar", y: 3 },
					{ label: "Apr", y: 0 },
					{ label: "May", y: 2 },
					{ label: "Jun", y: 1 },
				],
				color: '#b80404'
			},
			]
		}
		return (
		<div style={{width: '650px'}}>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
				 style={{height: '300px'}}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default StackedColumnChart;
