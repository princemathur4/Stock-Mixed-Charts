import React, { Component } from 'react';
import './App.css';
import data from './static/JsonData'
import 'semantic-ui-css/semantic.min.css';
import { Container, Dropdown } from 'semantic-ui-react';
import MainComponent from './components/MainComponent'

class App extends Component {
    state = {
        isModalOpen: true,
        volumeData: [],
        priceData: [],
        startDate: "",
        endDate: "",
        date: {},
        stocks: [],
        selectedStock: ""
    }
    componentWillMount() {
        let stocks = new Set();
        data.forEach(obj => {
            stocks.add(obj.stock)
        }
        )
        let stockList = Array.from(stocks);
        let stockOptions = []
        stockList.forEach((name) => {
            var dict = {
                "text": name,
                "value": name
            }
            stockOptions.push(dict)
        })
        this.setState({
            stocks: stockOptions,
        })
        console.log("stocks: ", stockOptions);
    }


    handleChangeSelect = (e, selectValue) => {
        console.log("selectValue: ", selectValue);
        this.setState({
            selectedStock: selectValue.value,
            isModalOpen: false
        });
    }
    goBack = () => {
        this.setState({
            isModalOpen: true
        })
    }
    render() {
        console.log("startdate: ", this.state.startDate);
        console.log("enddate: ", this.state.endDate);
        return (
            <div className="App">
                {this.state.isModalOpen &&
                    <div>
                        <header className="App-header">
                            <Container>
                                <h1>Select Stocks from the options available below</h1>
                                <Dropdown
                                    placeholder={"Stocks"}
                                    fluid search selection
                                    options={this.state.stocks}
                                    value={this.state.selectedStock}
                                    onChange={this.handleChangeSelect.bind(this)}
                                />
                            </Container>
                        </header>
                    </div>
                }
                {!this.state.isModalOpen &&
                    <div>
                        <MainComponent
                            goBack={this.goBack}
                            selectedStock={this.state.selectedStock}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default App;
