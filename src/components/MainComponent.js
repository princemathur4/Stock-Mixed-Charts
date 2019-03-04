import React, { Component } from 'react';
import data from '../static/JsonData'
import 'semantic-ui-css/semantic.min.css';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Grid } from 'semantic-ui-react';
import DateFilter from './DateFilter'
import moment from 'moment';
import StocksChart from './StocksChart'

class MainComponent extends Component {
    state = {
        volumeData: [],
        priceData: [],
        startDate: "",
        endDate: "",
    }
    componentWillMount() {
        // if (!this.state.startDate && !this.state.endDate) { // to be removed later
            let volumeData = [];
            let priceData = [];
            data.forEach(obj => {
                if (this.props.selectedStock && obj.stock === this.props.selectedStock) {
                    volumeData.push({
                        x: new Date(obj.date),
                        y: obj.volume
                    })
                    priceData.push({
                        x: new Date(obj.date),
                        y: obj.price
                    })
                }
            })
            this.setState({
                volumeData: volumeData,
                priceData: priceData
            })
        // }
    }

    handleDate = (e, n) => {
        this.setState({
            [e]: n.target.value
        })
    }

    getFilteredData = () => {
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let volumeData = [];
        let priceData = [];
        if ((startDate !== "" && !moment(startDate, 'YYYY-MM-DD', true).isValid()) || (endDate !== "" && !moment(endDate, 'YYYY-MM-DD', true).isValid())) {
            return
        }
        let push;
        data.forEach(obj => {
            push = true;
            if (!moment(obj.date).isValid()) {
                return;
            }
            if (startDate) {
                if (!(moment(startDate).isSameOrBefore(obj.date))) {
                    push = false;
                }
            }
            if (endDate) {
                if (!(moment(endDate).isSameOrAfter(obj.date))) {
                    push = false;
                }
            }
            if (push && obj.stock === this.props.selectedStock) {
                volumeData.push({
                    x: new Date(obj.date),
                    y: obj.volume
                })
                priceData.push({
                    x: new Date(obj.date),
                    y: obj.price
                })
            }
        }
        )
        this.setState({
            volumeData: volumeData,
            priceData: priceData
        });
    }
    resetState = () => {
        this.setState({
            startDate: "",
            endDate: ""
        });
    }

    render() {
        console.log("startdate: ", this.state.startDate);
        console.log("enddate: ", this.state.endDate);
        return (
            <div className="App">
                <StocksChart
                    chartVolumeData={this.state.volumeData}
                    chartPriceData={this.state.priceData}
                    selectedStock={this.props.selectedStock}
                />
                <Grid columns={2} style={{ 'marginLeft': '20%' }}>
                    <Grid.Row className="content">
                        <Grid.Column width={7} >
                            <DateFilter
                                style={{ 'marginLeft': '-40%' }}
                                name={"startDate"}
                                value={this.state.startDate}
                                handleDate={this.handleDate.bind(this, "startDate")}
                                label={"From Date"}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <DateFilter
                                style={{ 'marginRight': '20%' }}
                                name={"endDate"}
                                value={this.state.endDate}
                                handleDate={this.handleDate.bind(this, "endDate")}
                                label={"To Date"}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Button
                    className="ui green button"
                    onClick={this.getFilteredData.bind(this)}>
                    Apply Filters
                            </Button>

                <Button
                    className="ui orange button"
                    onClick={this.resetState}>
                    Reset Filters
                            </Button>

                <Grid.Row className="content" style={{ margin: "2%" }}>
                    <Button
                        className="ui grey button"
                        onClick={this.props.goBack}>
                        Go Back to Stock Selection
                        </Button>
                </Grid.Row>

            </div>
        );
    }
}

export default MainComponent;
