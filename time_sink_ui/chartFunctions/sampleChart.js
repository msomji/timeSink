import * as d3 from 'd3';
const urlRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/

export const getDomain = (url) => {
  return url.match(urlRegex)[0]
}
export const clearRef = ref => d3.select(ref.current).html("")

export const forceBubleChart = chromeData => ref => {
  let data = Object.entries(chromeData.reduce((acc, data) => {
    let domain = getDomain(data.url)
    if (domain in acc) {
      acc[domain] = acc[domain] + 1
    } else {
      acc[domain] = 1
    }
    return acc
  }, {})).map(([name, value]) => ({ name, value }))
  let width = ref.current.clientWidth
  let height = ref.current.clientHeight
  let color = d3.scaleOrdinal(data.map(d => d.value), d3.schemeCategory10)

  var radiusScale = d3.scaleSqrt()
    .domain([1, Math.max(...data.map(d => d.value))])
    .range([1, 100])
  let svg = d3.select(ref.current)
    .attr("viewBox", [0, 0, width, height])
    .append('g')
    .attr("transform", `translate(${width / 2}, ${height / 2})`)


  let circles = svg.selectAll('.domain')
    .data(data)
    .enter()
    .insert('g')
    .attr('class', 'bubble-group')
    .append('circle')
    .attr('id', d => `domain-${d.name}`)
    .attr('r', d => radiusScale(d.value))
    .attr('fill', d => color(d.value))

  let clipPaths = svg.selectAll('.bubble-group')
    .data(data)
    .append('clipPath')
    .attr('id', d => `clip-${d.name}`)
    .append('use')
    .attr('xlink:href', d => `#domain-${d.name}`)

  let text = svg.selectAll('.bubble-group')
    .data(data)
    .append('text')
    .attr('clip-path', d => `url(#clip-${d.name})`)
    .append('tspan')
    .style('text-anchor', 'middle')
    .style('font-size', d => (radiusScale(d.value) * 0.1) + 0.2)
    .text(d => d.name)

  let title = svg.selectAll('.bubble-group')
    .data(data)
    .append('title')
    .text(d => `Domain: ${d.name} \n Visits: ${d.value}`)

  let ticked = () => {
    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    text
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  }

  let simulation = d3.forceSimulation()
    .nodes(data)
    .on('tick', ticked)
    .force('x', d3.forceX().strength(0.002))
    .force('y', d3.forceY().strength(0.002))
    .force('collide', d3.forceCollide(d => radiusScale(d.value) + 5))

  var zoom = d3.zoom()
    .scaleExtent([1, 100])
    .on('zoom', function (event) {
      console.log(event)
      svg.selectAll('.bubble-group')
        .attr('transform', event.transform);
    });

  svg.call(zoom);
}

export const drawChart = chromeData => (ref) => { }

export const heatMapChart = chromeData => (ref) => {

}
