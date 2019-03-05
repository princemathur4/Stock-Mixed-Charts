import React, { Component } from 'react';
import data from '../static/JsonData'
import 'semantic-ui-css/semantic.min.css';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Grid } from 'semantic-ui-react';
import DateFilter from './DateFilter'
import moment from 'moment';
import StocksChart from './StocksChart'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';


class MainComponent extends Component {
    state = {
        volumeData: [],
        priceData: [],
        startDate: "",
        endDate: "",
    }

    defaultVolumeData = []
    defaultPriceData = []
    minDate = ""
    maxDate = ""

    componentWillMount() {
        let volumeData = [];
        let priceData = [];
        let timeArray = [];
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
                timeArray.push(moment(obj.date))
            }
        })

        this.defaultVolumeData = volumeData;
        this.defaultPriceData = priceData;
        this.minDate = moment.min(timeArray)._i;
        this.maxDate = moment.max(timeArray)._i;

        this.setState({
            volumeData: volumeData,
            priceData: priceData
        })
    }

    createToast(message, type) {
        let typeIcon = {
            'warning': 'info',
            'error': 'exclamation'
        }
        setTimeout(() => {
            toast({
                title: message,
                type: type,
                icon: typeIcon[type],
                animation: 'bounce',
            });
        }, 1);
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
        if (!startDate && !endDate) {
            this.createToast("Select a date to filter", "warning");
            return;
        }
        if ((startDate !== "" && !moment(startDate, 'YYYY-MM-DD', true).isValid()) || (endDate !== "" && !moment(endDate, 'YYYY-MM-DD', true).isValid())) {
            this.createToast("Please Enter a Valid Date!", "error");
            return;
        }
        if (startDate && moment(startDate).isSameOrBefore(this.minDate) && endDate && moment(endDate).isSameOrAfter(this.maxDate)) {
            this.setState({
                volumeData: this.defaultVolumeData,
                priceData: this.defaultPriceData
            });
            return;
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
            endDate: "",
            volumeData: this.defaultVolumeData,
            priceData: this.defaultPriceData
        });
    }

    render() {
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
                                style={{ 'marginRight': '14%' }}
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

                <Grid.Row className="content" style={{ margin: "1%" }}>
                    <Button
                        className="ui grey button"
                        onClick={this.props.goBack}>
                        Go Back to Stock Selection
                    </Button>
                </Grid.Row>
                <SemanticToastContainer position="bottom-center" />
            </div>
        );
    }
}

export default MainComponent;
