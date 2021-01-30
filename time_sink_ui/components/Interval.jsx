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



export default function Interval() {
  const [currentInterval, setCurrentInterval] = useState(TODAY)
  return (
    <div className={styles.interval}>
      <ul>
        <li><CurrentInterval text={TODAY} onClick={() => setCurrentInterval(TODAY)} isActive={currentInterval === TODAY} /></li>
        <li><CurrentInterval text={WEEK} onClick={() => setCurrentInterval(WEEK)} isActive={currentInterval === WEEK} /></li>
        <li><CurrentInterval text={MONTH} onClick={() => setCurrentInterval(MONTH)} isActive={currentInterval === MONTH} /></li>
        <li><CurrentInterval text={YEAR} onClick={() => setCurrentInterval(YEAR)} isActive={currentInterval === YEAR} /></li>
        <li><CurrentInterval text={ALL_TIME} onClick={() => setCurrentInterval(ALL_TIME)} isActive={currentInterval === ALL_TIME} /></li>

      </ul>
    </div>
  )
}
