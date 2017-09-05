import React, { Component } from 'react';
import {Bar, BarChart, Brush, CartesianGrid, Label, Tooltip, XAxis, YAxis} from "recharts";



class SimpleHorizontalBar extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <BarChart layout="vertical"
                width={this.props.width / 3}
                height={this.props.height / 2}
                data={this.props.data} >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#A6DECF"/>
                        <stop offset="95%" stopColor="#7D93F7" />
                    </linearGradient>
                </defs>
                <Brush dataKey='name' height={30} stroke="#8884d8"/>

                <XAxis type="number"/>
                <YAxis type="category" dataKey="name" />
                <CartesianGrid />
                <Tooltip />
                <Bar dataKey="pv" fill="url(#colorPv)"/>
            </BarChart>
        )
    }

}

export default SimpleHorizontalBar