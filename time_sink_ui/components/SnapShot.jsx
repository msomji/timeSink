import styles from '../styles/snapShot.module.scss'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { useAppContext } from '../context/state'
import { clearRef } from '../chartFunctions/sampleChart'
import { filterDataByCurrentInterval } from './Interval'



export default function SnapShot({currentInterval, value, drawChart, linkTo }) {
  const ref = useRef(null)
  const { isLoading, chromeHistoryData } = useAppContext()
  useEffect(() => {
    if (!isLoading) {
      clearRef(ref)
      let filterdData = chromeHistoryData.filter(filterDataByCurrentInterval(currentInterval))
      drawChart(filterdData)(ref)
    }

  }, [isLoading, chromeHistoryData, currentInterval])
  return (
    <Link href={linkTo}>
      <a>
        <div className={styles.snapShot}>
          <svg ref={ref} className={styles.container}>
          </svg>
          <h4 className={`has-text-weight-bold is-size-4 has-text-info`}>{value}</h4>
        </div>
      </a>
    </Link>
  )
}
