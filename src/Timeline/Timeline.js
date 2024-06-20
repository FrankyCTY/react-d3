import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const events = [
  { date: new Date(2000, 0, 1, 5), description: 'Event 1' },
  { date: new Date(2000, 0, 1, 16), description: 'Event 2' },
  { date: new Date(2001, 0, 2, 9), description: 'Event 3' },
];

function Timeline() {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const timeScale = d3
      .scaleTime()
      .domain(d3.extent(events, (d) => d.date))
      .range([0, width]);

    const tooltip = d3.select('#tooltip');

    // Add axis
    const xAxis = d3.axisBottom(timeScale).ticks(10);
    const xAxisGroup = svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height / 2})`)
      .call(xAxis);

    svg
      .selectAll('circle')
      .data(events)
      .enter()
      .append('circle')
      .attr('cx', (d) => timeScale(d.date))
      .attr('cy', 50) // Fixed vertical position for simplicity
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 1);
        tooltip
          .html(d.description)
          .style('left', event.pageX + 5 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition().duration(200).style('opacity', 0);
      })
      .on('click', () => {
        alert('clicked');
      });

    const handleResize = () => {
      const newWidth = window.innerWidth - margin.left - margin.right;
      timeScale.range([0, newWidth]);

      d3.select(ref.current).attr(
        'width',
        newWidth + margin.left + margin.right
      );

      xAxisGroup.call(xAxis.scale(timeScale));

      svg.selectAll('circle').attr('cx', (d) => timeScale(d.date));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [events]);

  return (
    <div>
      <svg ref={ref}></svg>
      <div id="tooltip" className="tooltip"></div>
    </div>
  );
}

export { Timeline };
