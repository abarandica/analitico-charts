import React, { Component } from 'react'
import {Cell, Pie, PieChart, Tooltip} from "recharts";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {percent > 0.1 ? `${(percent * 100).toFixed(0)}%` : ''}
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
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7D93F7" />
                        <stop offset="95%" stopColor="#A6DECF" />
                    </linearGradient>
                </defs>
                <Tooltip />
                <Pie labelLine={false} data={this.props.subparts} cx={this.props.width/6} outerRadius={148} innerRadius={88} fill="url(#colorPv)" label={renderCustomizedLabel}>
                    {
                        this.props.subparts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
                <Pie onClick={this.props.pieClick} labelLine={false} data={this.props.parts} cx={this.props.width/6} innerRadius={150} outerRadius="100%" fill="url(#colorPv)" label={renderCustomizedLabel}>
                    {
                        this.props.parts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
            </PieChart>
        )
    }
}

export default TwoLevelPie