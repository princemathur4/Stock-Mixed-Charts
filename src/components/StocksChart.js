import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class StocksChart extends Component {	
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
			theme: "dark2",
			animationEnabled: true,
			title:{
				text: "Stock Pricing and Volume Data for " + this.props.selectedStock
			},
			axisX: {
				title: "Date-Time"
			},
			axisY: {
				title: "Volume",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD",
				includeZero: false
			},
			axisY2: {
				title: "Price",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "column",
				name: "Volume",
				showInLegend: true,
				xValueFormatString: "DD MMM YYYY",
				yValueFormatString: "#,##0 Shares",
				dataPoints: this.props.chartVolumeData
			},
			{
				type: "line",
				name: "Price",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "DD MMM YYYY",
				yValueFormatString: "#,##0.# Rupees",
				dataPoints: this.props.chartPriceData
			}]
		}
		
	return (
		<div className="MultipleAxisChart">
			<CanvasJSChart options = {options} 
					onRef={ref => this.chart = ref}
			/>
			{/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
		</div>
	);
	}
}

export default StocksChart;