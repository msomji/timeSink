import styles from '../styles/chart.module.scss'
import Link from 'next/link'
import { useRef, useEffect, useState, Fragment } from 'react'
import Interval, { filterToHours, INTERVALS, TODAY } from './Interval'
import { useAppContext } from '../context/state'
import { clearRef } from '../chartFunctions/sampleChart'



export default function Chart({ value, drawChart }) {
  const [currentInterval, setCurrentInterval] = useState(TODAY)
  const { isLoading, chromeHistoryData } = useAppContext()

  const ref = useRef(null)
  useEffect(() => {
    if (!isLoading) {
      clearRef(ref)
      let filterdData = chromeHistoryData.filter(d =>
         (new Date().getTime() - new Date(d.lastVisitTime).getTime()) / (1000 * 3600) < filterToHours(currentInterval))
      drawChart(filterdData)(ref)
    }
  }, [isLoading, chromeHistoryData, drawChart, currentInterval])
  return (
    <Fragment>
      <Interval intervals={INTERVALS} currentInterval={currentInterval} updateInterval={setCurrentInterval} />
      <div className={styles.snapShot}>
        <svg ref={ref} className={styles.container}>
        </svg>
        <h4 className={`has-text-weight-bold is-size-4 has-text-info`}>{value}</h4>
      </div>
    </Fragment>
  )
}
