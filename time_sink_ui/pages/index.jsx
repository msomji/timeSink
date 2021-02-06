import { useEffect, useState } from 'react'
import { forceBubleChart } from '../chartFunctions/d3Charts';
import FlashCard from '../components/FlashCard'
import Interval from '../components/Interval'
import Loading from '../components/Loading';
import SnapShot from '../components/SnapShot'
import { useAppContext } from '../context/state';
import {
  totalNumnberOfSitesVisited,
  totalSocialMediaVisits,
  mostActiveDay, mostPopularDomain
} from '../chartFunctions/utils'
import styles from '../styles/index.module.scss'
import { filterDateByinterval, INTERVALS, MONTH } from '../utils/utils';


export default function Index() {
  const [currentInterval, setCurrentInterval] = useState(MONTH)
  const [filteredData, setFilteredData] = useState([])
  const { isLoading, chromeHistoryData } = useAppContext()

  useEffect(() => {
    if (chromeHistoryData) {
      setFilteredData(filterDateByinterval(chromeHistoryData, currentInterval))
    }

  }, [chromeHistoryData, isLoading, currentInterval])
  if (isLoading) {
    return (<Loading />)
  }

  return (
    <div id="main" className={`${styles.main}`}>
      <Interval intervals={INTERVALS} currentInterval={currentInterval} updateInterval={setCurrentInterval} />
      <div className={`${styles.container}`}>
        <FlashCard value={totalNumnberOfSitesVisited(filteredData)} description="Websites visited" />
        <FlashCard value={totalSocialMediaVisits(filteredData)} description="Social Media visits" />
        <FlashCard value={mostActiveDay(filteredData)} description="Most Active Day" />
        <FlashCard value={mostPopularDomain(filteredData)} description="Most Popular Domain" />
      </div>
      <SnapShot currentInterval={currentInterval} drawChart={forceBubleChart} value={`Web Sites Visited in the ${currentInterval}`} />
    </div>
  )

}
