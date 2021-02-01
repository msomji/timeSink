import { useState } from 'react'
import styles from '../styles/interval.module.scss'
export const TODAY = 'Last 24 hours'
export const WEEK = 'Last 7 Days'
export const MONTH = 'Last 30 Days'
export const YEAR = 'Last Year'
export const ALL_TIME = 'All Time'
export const INTERVALS = [TODAY, WEEK, MONTH, YEAR, ALL_TIME]

export const filterToHours = filter => {
  switch (filter) {
    case TODAY:
      return 24
      break;
    case WEEK:
      return (24 * 7)
      break;
    case MONTH:
      return (24 * 31)
      break;
    case YEAR:
      return (24 * 365)
      break;
    default:
      return Number.MAX_SAFE_INTEGER
      break;
  }
}

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
