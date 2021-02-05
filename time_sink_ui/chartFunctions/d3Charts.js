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

export const heatMapChart = chromeData => (ref) => {
  let mapped = chromeData.reduce((acc, current) => {
    let fullDate = new Date(current.visitTime)
    fullDate.setMinutes(0)
    fullDate.setSeconds(0)
    if (fullDate in acc) {
      acc[fullDate]['count'] = acc[fullDate]['count'] + 1
      acc[fullDate]['pages'] = [...acc[fullDate]['pages'], current]
    } else {
      acc[fullDate] = {
        count: 1,
        pages: [current]
      }
      acc[fullDate]['count'] = 1
      acc[fullDate]['pages'] = [current]
    }
    return acc
  }, {})

  let maxDate = new Date()
  let minDate = new Date()
  minDate.setDate(minDate.getDate() - 31)
  let numberofDays = Math.round((maxDate - minDate) / (1000 * 60 * 60 * 24))
  let buildArrayOfDayObjects = (minDate, numberOFDays, acc = []) => {
    if (numberOFDays <= 0) {
      return acc
    }
    let newMinDate = new Date(minDate.setDate(minDate.getDate() + 1))
    return buildArrayOfDayObjects(newMinDate, numberOFDays - 1, [...acc, minDate])
  }

  let formatDateToString = date => `${date.getMonth() + 1}/${date.getDate()}`

  let margin = { top: 50, right: 0, bottom: 100, left: 30 }
  let width = ref.current.clientWidth - margin.left - margin.right
  let height = ref.current.clientHeight - margin.top - margin.bottom
  let svg = d3.select(ref.current)
    .attr("width", width)
    .attr("height", height)
    .style("background-color", '#9BC5D1')
    .append("g")

  let numberToHour = time => {
    if (time == 0) {
      return 12 + "am"
    }
    if (time < 12) {
      return time + "am"
    }
    if (time == 12) {
      return time + "pm"
    }
    if (time > 12) {
      return time - 12 + "pm"
    }
  }
  let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(s => numberToHour(s))
  let x = d3
    .scaleBand()
    .range([20, width - 10])
    .domain(hours)
  svg
    .attr("transform", `translate(10,${50})`)
    .call(d3.axisTop(x))


  let y = d3.scaleBand()
    .range([height, 0])
    .domain(buildArrayOfDayObjects(minDate, numberofDays).map(d => formatDateToString(d)))
  svg.append("g")
    .attr("transform", `translate(${19},${0})`)
    .call(d3.axisLeft(y));
  svg.selectAll('.tick')

  let colors = [
    '#779C81',
    '#679273',
    '#578765',
    '#477C56',
    '#377248',
    '#29683B',
    '#195E2C',
    '#0D4D1F',
    '#0A3E19',
    '#093A17',
    '#05220D',
  ]

  let tooltip = d3.select(ref.current.parentElement)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("position", "absolute")
    .style("padding", "5px")

  var mouseover = function (d) {
    tooltip.style("opacity", 1)
  }
  var mousemove = function (d) {
    let date = new Date(d.target.id)
    let count = mapped[d.target.id].count
    let [x, y] = d3.pointer(d)

    tooltip
      .html(`${count} sites were visited on ${date.toDateString()} at ${numberToHour(date.getHours())}`)
      .style("left", (x + 270) + "px")
      .style("top", (y + 220) + "px")
  }
  var mouseleave = function (d) {
    tooltip.style("opacity", 0)
  }

  let counts = Object.values(mapped).map(d => d.count)
  let minCount = Math.min(...counts)
  let maxCount = Math.max(...counts)
  let range = maxCount - minCount
  let intervalSize = Math.ceil(range / colors.length)

  let countToColor = count => {
    for (let i = 0; i <= colors.length; i++) {
      let minBound = minCount + (intervalSize * i)
      let maxBound = minCount + (intervalSize * (1 + i))
      if (count >= minBound && count <= maxBound) {
        return colors[i]
      }
    }
  }

  svg.selectAll()
    .data(Object.keys(mapped).map(d => ({ date: d, value: mapped[d].count })))
    .enter()
    .append("rect")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .attr("x", function (d) {
      return x(numberToHour(new Date(d.date).getHours()))
    })
    .attr("y", function (d) { return y(formatDateToString(new Date(d.date))) })
    .attr("id", function (d) { return d.date })
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) { return countToColor(d.value) })

  let legend = d3.select(ref.current.parentElement)
    .append("div")
    .attr("class", "legend")
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("padding", "5px")
    .selectAll("legend-box")
    .data(colors)
    .enter()
    .append("div")
    .style("margin", '5px')
    .style("width", '60px')
    .style("height", '60px')
    .style("display", 'flex')
    .style("background-color", d => d)
    .append('div')
    .style("margin", 'auto')
    .style("color", '#9BC5D1')
    .text(d => {
      let index = colors.indexOf(d)
      return `<= ${minCount + (intervalSize * (1 + index))}`
    })

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
