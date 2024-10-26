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
        bottom: 80,
        left: 40,
        right: 20,
    };

    const graphWidth = svgWidth - margin.left - margin.right;
    const graphHeight = svgHeight - margin.top - margin.bottom;
    const rectWidth = Math.floor(graphWidth / barData.length);

    const scaleY = d3.scaleLinear([0, 100], [0, graphHeight]);

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
                return graphHeight - scaleY(d.age) + margin.top;
            })
            .attr('height', (d) => {
                return scaleY(d.age);
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

        //create x-axis labels (name)
        svg.selectAll('.name-label')
            .data(barData)
            .enter()
            .append('text')
            .text((d) => d.name)
            .attr('class', 'name-label')
            .attr('x', (d, i) => i * rectWidth + margin.left + 10)
            .attr('y', graphHeight + margin.top)
            .attr(
                'transform',
                (d, i) =>
                    `rotate(45 ${i * rectWidth + margin.left} ${graphHeight + margin.top + 20})`,
            )
            .attr('fill', 'gray');

        //create y-axis labels (age)
        svg.selectAll('.age-label')
            .data(barData)
            .enter()
            .append('text')
            .text((d) => d.age)
            .attr('class', 'age-label')
            .attr('x', (d, i) => i * rectWidth + margin.left + rectWidth / 2)
            .attr('y', (d) => margin.top + graphHeight - scaleY(d.age) - 5)
            .attr('fill', '#1F77B4')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold');

        //create y-axis labels - 10 value apart
        const yAxisLabelData = d3.range(0, 100, 10);

        svg.selectAll('.y-axis-label')
            .data(yAxisLabelData)
            .enter()
            .append('text')
            .text((d) => d)
            .attr('x', margin.left - 5)
            .attr('y', (d) => margin.top + graphHeight - scaleY(d))
            .attr('fill', 'gray')
            .attr('text-anchor', 'end')
            .attr('alignment-baseline', 'middle');
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
