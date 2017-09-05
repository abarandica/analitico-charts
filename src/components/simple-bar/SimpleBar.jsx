
import React, { Component } from 'react'
import {Bar, BarChart, Brush, CartesianGrid, Cell, Label, Tooltip, XAxis, YAxis} from "recharts";

const COLORS = ['#7D93F7', '#A6DECF'];

const formatter = (value) => `Org ${value}`;

class SimpleBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey : "uv"
        }
    }

    render() {
        let barData = this.props.data;
        return (
            <BarChart
                width={this.props.width / 1.57 }
                height={this.props.height / 3}
                data={barData} >
                <XAxis tickFormatter={formatter} dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Brush dataKey='name' height={30} stroke="#8884d8"/>
                <Bar dataKey={this.state.dataKey} fill="#7583FF">
                    {
                        barData.map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                    }
                </Bar>
            </BarChart>
        );
    }
}

export default SimpleBar