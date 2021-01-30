import { useState } from 'react'
import styles from '../styles/interval.module.scss'

const TODAY = 'Today'
const WEEK = 'Week'
const MONTH = 'Month'
const YEAR = 'Year'
const ALL_TIME = 'All Time'

function CurrentInterval({ text, onClick, isActive }) {
  return (
    <div onClick={onClick} className={`has-text-weight-bold ${isActive ? `${styles.active} has-background-primary` : `has-text-grey-light`}`}>{text}</div>
  )

}



export default function Interval({intervals, currentInterval, updateInterval}) {
  return (
    <div className={styles.interval}>
      <ul>
        {intervals.map(interval => <li><CurrentInterval text={interval} onClick={() => updateInterval(interval)} isActive={currentInterval === interval} /></li>)}
      </ul>
    </div>
  )
}
