import React, { Component } from 'react'
import {Cell, Pie, PieChart, Tooltip, Legend} from "recharts";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    let x  = cx + (radius) * Math.cos(-midAngle * RADIAN);
    const y = cy  + (radius) * Math.sin(-midAngle * RADIAN);
    console.log(radius, cx, cy, midAngle, innerRadius, outerRadius, percent, index)
    if (percent < 0.1) {
        x = x + 5;
    }
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} scaleToFit={true} style={ { fontSize: 16 }} dominantBaseline="central">
            {percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}
        </text>
    );
};


class TwoLevelPie extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <PieChart width={this.props.width / 3} height={this.props.height / 2}>
                <Tooltip />
                <svg>
                    <circle onClick={this.props.resetFilters} cx={this.props.width/6} cy={this.props.height/4} r="80" fill="#FFFFFF"/>
                </svg>
                <Pie labelLine={false} data={this.props.subparts} outerRadius={148} innerRadius={88} fill="url(#colorPv)" label={renderCustomizedLabel}>
                    {
                        this.props.subparts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
                <Pie onClick={this.props.pieClick} labelLine={false} data={this.props.parts} innerRadius={150} outerRadius="100%" fill="url(#colorPv)" label={renderCustomizedLabel}>
                    {
                        this.props.parts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
            </PieChart>
        )
    }
}

export default TwoLevelPie