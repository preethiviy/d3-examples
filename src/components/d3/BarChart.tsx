import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const svgWidth = 500;
const svgHeight = 400;

const BarChart = () => {
    const myElementRef = useRef(null);

    const [barData, setBarData] = useState([
        {
            name: 'John Doe',
            age: 30,
        },
        {
            name: 'Jane Doe',
            age: 20,
        },
        {
            name: 'Will Smith',
            age: 50,
        },
        {
            name: 'Mary Jane',
            age: 40,
        },
        {
            name: 'Nana',
            age: 60,
        },
    ]);

    const margin = {
        top: 20,
        bottom: 40,
        left: 40,
        right: 20,
    };

    const maxAge = d3.max(barData, (d) => d.age) || 0;
    const graphWidth = svgWidth - margin.left - margin.right;
    const graphHeight = svgHeight - margin.top - margin.bottom;
    const rectWidth = Math.floor(graphWidth / barData.length);

    useEffect(() => {
        const svg = d3.select(myElementRef.current);

        // const allRectData = svg.selectAll('rect').data(barData);

        const allRectData = svg
            .selectAll('rect')
            .data(barData)
            .enter()
            .append('rect');

        allRectData
            .attr('width', rectWidth)
            .attr('stroke-width', 2)
            // .attr('stroke-dasharray', '2 2')
            .attr('stroke', '#38bcb2')
            .attr('fill', '#97e3d5')
            .attr('x', (d, i) => {
                return i * rectWidth + margin.left;
            })
            .attr('y', (d) => {
                return graphHeight - d.age + margin.top;
            })
            .attr('height', (d) => {
                return d.age;
            });

        //draw x-axis line
        svg.append('line')
            .attr('x1', margin.left)
            .attr('y1', margin.top + graphHeight)
            .attr('x2', graphWidth + margin.left)
            .attr('y2', margin.top + graphHeight)
            .attr('stroke', 'black')
            .attr('stroke-width', 2);

        //draw y-axis line
        svg.append('line')
            .attr('x1', margin.left)
            .attr('y1', margin.top)
            .attr('x2', margin.left)
            .attr('y2', margin.top + graphHeight)
            .attr('stroke', 'black')
            .attr('stroke-width', 2);
    });

    return (
        <div>
            <svg
                ref={myElementRef}
                width={svgWidth}
                height={svgHeight}
                style={{ border: '1px dashed' }}
            ></svg>
        </div>
    );
};

export default BarChart;
