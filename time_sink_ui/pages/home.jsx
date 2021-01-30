import { Fragment, useEffect, useRef } from 'react'
import * as d3 from 'd3';

import { useAppContext } from '../context/state';


export default function Home() {
  const globalContext = useAppContext()
  const svgRef = useRef(null)
  const dataset = [100, 200, 300, 400, 500];
  useEffect(() => {
    d3.select(svgRef.current)
      .append(`p`)
      .text(`Hello from D3`);

    let size = 500;
    let svg = d3.select(svgRef.current)
      .append('svg')
      .attr('width', size)
      .attr('height', size);
    let rect_width = 95;
    svg.selectAll(`rect`)
      .data(dataset)
      .enter()
      .append(`rect`)
      .attr('x', (d, i) => 5 + i * (rect_width + 5))
      .attr('y', d => size - d)
      .attr(`width`, rect_width)
      .attr(`height`, d => d)
      .attr('fill', `teal`);

  }, [globalContext.isLoading])

  if (globalContext.isLoading) {
    return (<Fragment>
      <div>globalContext is loading...</div>
    </Fragment>)
  } else {
    return (
      <div className="has-background-primary">
        <h1>history is loaded successfully!</h1>
        <div ref={svgRef}></div>
      </div>
    )
  }
}
