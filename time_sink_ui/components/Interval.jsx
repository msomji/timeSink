import { useState } from 'react'
import styles from '../styles/interval.module.scss'
export const TODAY = 'Last 24 hours'
export const WEEK = 'Last 7 Days'
export const MONTH = 'Last 30 Days'
export const LAST_60_DAYS = 'Last 60 Days'
export const LAST_90_DAYS = 'Last 90 days'
export const INTERVALS = [TODAY, WEEK, MONTH, LAST_60_DAYS, LAST_90_DAYS]

//move to utils
export const filterToHours = filter => {
  switch (filter) {
    case TODAY:
      return 24
      break;
    case WEEK:
      return (24 * 7)
      break;
    case MONTH:
      return (24 * 30)
      break;
    case LAST_60_DAYS:
      return (24 * 60)
      break;
      default:
      return (24 * 90)
      break;
  }
}
//move to utils
export const filterDataByCurrentInterval = interval => dataElement => (new Date().getTime() - new Date(dataElement.lastVisitTime).getTime()) / (1000 * 3600) < filterToHours(interval)



function CurrentInterval({ text, onClick, isActive }) {
  return (
    <div onClick={onClick} className={`has-text-weight-bold ${isActive ? `${styles.active} has-background-primary` : `has-text-grey-light`}`}>{text}</div>
  )

}



export default function Interval({intervals, currentInterval, updateInterval}) {
  return (
    <div className={styles.interval}>
      <ul>
        {intervals.map((interval, index) => <li key={index}><CurrentInterval text={interval} onClick={() => updateInterval(interval)} isActive={currentInterval === interval} /></li>)}
      </ul>
    </div>
  )
}
