import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleScatter from "./components/simple-scatter/SimpleScatter";
import SimpleBar from "./components/simple-bar/SimpleBar";
import TwoLevelPie from "./components/two-level-pie/TwoLevelPie";
import SimpleHorizontalBar from "./components/simple-horizontal-bar/SimpleHorizontalBar";

const data = [
    { name: 'A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'G', uv: 3490, pv: 4300, amt: 2100 }
];
const partsArray = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'D', value: 200 }
];
const subpartsArray = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 }
];

const duplicate = (arr) => JSON.parse(JSON.stringify(arr));


class App extends Component {

    constructor(props) {
        super(props);

        this.onResize = this.onResize.bind(this);
        this.onPieClick = this.onPieClick.bind(this);
        this.resetFilters = this.resetFilters.bind(this);


        this.state = {
            screenWidth: 1000,
            screenHeight: 500,
            index: null,
            data: [],
            parts: [],
            subparts: []
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
        this.setState({
            data: data,
            parts: duplicate(partsArray),
            subparts: duplicate(subpartsArray)
        })
    }

    onResize() {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 70 })
    }

    /**
     * On pie section click, filter subparts by part name and set value to 0
     * remove other sections values from chart
     * @param {*} data the data selected
     * @param {*} index the datas index selected
     */
    onPieClick(data, index) {
        let partLetter = partsArray[index].name
        let subparts = duplicate(subpartsArray);
        subparts.map(subpart => {
            if (!subpart.name.startsWith(partLetter)) {
                subpart.value = 0;
            }
        });

        let a = duplicate(partsArray)
        a.map((part, i) => {
            if (i != index) {
                part.value = 0
            }
        })
        this.setState({
            parts: a,
            subparts: subparts
        })
    }

    /**
     * Reset charts to initial state
     */
    resetFilters() {
        this.setState({
            parts: duplicate(partsArray),
            subparts: duplicate(subpartsArray)
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Dashboard</h2>
                </div>
                <div className="container">
                    <p onClick={this.resetFilters}>Reset</p>
                    <TwoLevelPie 
                        pieClick={this.onPieClick}
                        parts={this.state.parts} 
                        subparts={this.state.subparts}
                        height={this.state.screenHeight} 
                        width={this.state.screenWidth} />
                    <SimpleHorizontalBar data={this.state.data} height={this.state.screenHeight} width={this.state.screenWidth} />
                    <SimpleBar data={this.state.data} height={this.state.screenHeight} width={this.state.screenWidth} />
                    <SimpleScatter height={this.state.screenHeight} width={this.state.screenWidth} />
                </div>
            </div>
        );
    }
}

export default App;
