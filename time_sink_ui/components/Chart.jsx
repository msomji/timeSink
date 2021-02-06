import styles from '../styles/chart.module.scss'
import { useRef, useEffect, useState, Fragment } from 'react'
import Interval from './Interval'
import { useAppContext } from '../context/state'
import { clearRef } from '../chartFunctions/d3Charts'
import { useRouter } from 'next/router'
import { filterDateByinterval, INTERVALS, MONTH } from '../utils/utils'

const pathToTitle = path => {
  if (path.includes('heatMap')) {
    return "Activity Heat Map"
  } else if (path.includes('sitesVisited')) {
    return 'Sites Visited Bubble Chart'
  } else if (path.includes('searchedTerms')) {
    return 'Frequently Searched Terms Cloud Map'
  }
}

export default function Chart({ value, drawChart }) {
  const [currentInterval, setCurrentInterval] = useState(MONTH)
  const { isLoading, chromeHistoryData } = useAppContext()
  const router = useRouter()
  const ref = useRef(null)

  useEffect(() => {
    if (!isLoading) {
      clearRef(ref)
      let filterdData = filterDateByinterval(chromeHistoryData, currentInterval)
      drawChart(filterdData)(ref)
    }
  }, [isLoading, chromeHistoryData, drawChart, currentInterval])
  return (
    <Fragment>
      <div className="wrapper is-flex is-justify-content-center">
        <h4 className={`has-text-weight-bold is-size-3 has-text-grey-light`}>{pathToTitle(router.pathname)}</h4>
      </div>
      { !router.pathname.includes('heatMap') && <Interval intervals={INTERVALS} currentInterval={currentInterval} updateInterval={setCurrentInterval} />}
      <div className={styles.snapShot}>
        <svg ref={ref} className={styles.container}>
        </svg>
        <h4 className={`has-text-weight-bold is-size-4 has-text-info`}>{value}</h4>
      </div>
    </Fragment>
  )
}
