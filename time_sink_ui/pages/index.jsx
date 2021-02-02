import { useEffect, useState } from 'react'
import { forceBubleChart, drawChart } from '../chartFunctions/sampleChart';
import FlashCard from '../components/FlashCard'
import Interval, { INTERVALS, TODAY } from '../components/Interval'
import Loading from '../components/Loading';
import SnapShot from '../components/SnapShot'
import { useAppContext } from '../context/state';
import { filterDataByCurrentInterval } from '../components/Interval'
import { getDomain } from '../chartFunctions/sampleChart'

import styles from '../styles/index.module.scss'



const SOCIAL_MEDIA_SITES = ['twitter.com',
  'facebook.com',
  'instagram.com',
  'pinterest.com',
  'tumblr.com',
  'reddit.com',
  'news.ycombinator.com',
  'twitch.tv',
  'tiktok.com/foryou?lang=e',
  'telegram.org',
  'discord.com',
]

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const totalNumnberOfSitesVisited = data => data.length
const totalSocialMediaVisits = data => data.filter(d => {
  for (let s of SOCIAL_MEDIA_SITES) {
    if (d.url.includes(s) === true) {
      return true
    }
  }
  return false
}).length

const formatDate = date => new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
const mostActiveDay = data => {
  let numberOfSitesVisitedByDay = data.reduce((acc, current) => {
    let formattedDateKey = formatDate(new Date(current.visitTime))
    if (formattedDateKey in acc) {
      acc[formattedDateKey] = acc[formattedDateKey] + 1
    } else {
      acc[formattedDateKey] = 1
    }
    return acc
  }, {})
  let dayWithMostactivity = Object.keys(numberOfSitesVisitedByDay).reduce((acc, key) => {
    if (numberOfSitesVisitedByDay[acc] === undefined) { return key }
    return numberOfSitesVisitedByDay[key] > numberOfSitesVisitedByDay[acc] ? key : acc
  }, undefined)
  return new Date(dayWithMostactivity).toLocaleDateString()
}

const mostPopularDomain = data => {
  let domainByFrequency= data.
    reduce((acc, current) => {
      let currentDomain = getDomain(current.url)
      if(currentDomain in acc) {
        acc[currentDomain] = acc[currentDomain] + 1
      } else {
        acc[currentDomain] = 1
      }
      return acc
    }, {})

    return Object.keys(domainByFrequency).reduce((acc, key) => {
      if (domainByFrequency[acc] === undefined) { return key }
      return domainByFrequency[key] > domainByFrequency[acc] ? key : acc
    }, undefined)
}


export default function Index() {
  const [currentInterval, setCurrentInterval] = useState(TODAY)
  const [filteredData, setFilteredData] = useState([])
  const { isLoading, chromeHistoryData } = useAppContext()

  useEffect(() => {
    if (chromeHistoryData) {
      setFilteredData(chromeHistoryData.filter(filterDataByCurrentInterval(currentInterval)))
    }

  }, [chromeHistoryData, isLoading, currentInterval])
  if (isLoading) {
    return (<Loading />)
  }
  return (<div id="main" className={`${styles.main}`}>

    <Interval intervals={INTERVALS} currentInterval={currentInterval} updateInterval={setCurrentInterval} />

    <div className={`${styles.container}`}>
      <div className="group">
        <FlashCard value={totalNumnberOfSitesVisited(filteredData)} description="Websites visited" />
        <FlashCard value={totalSocialMediaVisits(filteredData)} description="Social Media visits" />
      </div>
      <div className="group">
        <FlashCard value={mostActiveDay(filteredData)} description="Most Active Day" />
        <FlashCard value={mostPopularDomain(filteredData)} description="Most Popular Domain" />
      </div>
    </div>
    <div className={`${styles.container}`}>
      <div className="group">
        <SnapShot currentInterval={currentInterval} drawChart={forceBubleChart} linkTo="/sitesVisited" value="Sites Visited" />
        <SnapShot currentInterval={currentInterval} drawChart={drawChart} linkTo="/" value="Avtivity Heat Map" />
      </div>
      <div className="group">
        <SnapShot currentInterval={currentInterval} drawChart={drawChart} linkTo="/" value="Frequently Searched Terms" />
        <SnapShot currentInterval={currentInterval} drawChart={drawChart} linkTo="/" value="This is values" />
      </div>
    </div>
  </div>)

}
