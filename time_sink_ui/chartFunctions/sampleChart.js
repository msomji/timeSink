import * as d3 from 'd3';
import * as cloud from 'd3-cloud'
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
  let mapped = chromeData.reduce((acc, current) => {
    let fullDate = new Date(current.visitTime)
    let hour = fullDate.getHours()
    let doubleDigitMonth = ("" + (fullDate.getMonth() + 1)).padStart(2, '0')
    let doubleDigitDate = ("" + (fullDate.getDate())).padStart(2, '0')
    let doublDigitHour = ("" + fullDate.getHours()).padStart(2, '0')
    let dateTopOfHour = new Date(`${fullDate.getFullYear()}-${doubleDigitMonth}-${doubleDigitDate}T${doublDigitHour}:00:00-0500`)
    if (dateTopOfHour in acc) {
      acc[dateTopOfHour]['count'] = acc[dateTopOfHour]['count'] + 1
      acc[dateTopOfHour]['pages'] = [...acc[dateTopOfHour]['pages'], current]
    } else {
      acc[dateTopOfHour] = {
        count: 0,
        pages: []
      }
      acc[dateTopOfHour]['count'] = 1
      acc[dateTopOfHour]['pages'] = [current]
    }
    return acc
  }, {})
  console.log(mapped)

}
export const wordCloudChart = chromeData => (ref) => {
  let rawData = chromeData
    .map(d => d.url).filter(u => !!u.match(/\/search\?q=(.*)&/g))
    .map(d => d.split(/\/search\?q=/)[1])
    .map(d => d.split(/\&/)[0])
    .map(s => s.split('+')
      .map(f => decodeURI(f))
      .map(s => s.split(' ')))
    .flat(Infinity)
    .reduce((acc, current) => {
      if (current in acc) {
        acc[current] = acc[current] + 1
      } else {
        acc[current] = 1
      }
      return acc
    }, {})
  let data = Object.entries(rawData)
    .map(([text, size]) => ({ text, size }))
    .filter(({ _text, size }) => size > 4) // adding filter to reduce time to load

  let maxFrequency = data.reduce((acc, { _, size }) => acc > size ? acc : size, 0)
  let width = ref.current.clientWidth
  let height = ref.current.clientHeight
  console.log(width)
  console.log(height)
  let color = d3.scaleOrdinal(data.map(d => d.size), d3.schemeCategory10)

  let svg = d3.select(ref.current)
    .attr("width", width)
    .attr("height", height)
    .append("g")

  let draw = (words) => {
    svg
      .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", d => d.size)
      .style("fill", d => color(d.size))
      .attr("text-anchor", "middle")
      .style("font-family", "Impact")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text(d => d.text);
  }
  let numberScale = d3.scaleLinear()
    .domain([4, maxFrequency])
    .range([12, 160]);
  let layout = cloud()
    .size([width, height])
    .words(data)
    .padding(5)        //addspace between words
    .rotate(() => ~~(Math.random() * 2) * 90)
    .fontSize(d => numberScale(d.size))
    .on("end", draw)
  layout.start();
}
