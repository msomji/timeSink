import { Fragment, useState } from 'react'
import FlashCard from '../components/FlashCard'
import Interval from '../components/Interval'
import SnapShot from '../components/SnapShot'

import styles from '../styles/index.module.scss'
const TODAY = 'Today'
const WEEK = 'Week'
const MONTH = 'Month'
const YEAR = 'Year'
const ALL_TIME = 'All Time'

const INTERVALS = [TODAY, WEEK, MONTH, YEAR, ALL_TIME]
export default function Index() {
  const [currentInterval, setCurrentInterval] = useState(TODAY)
  return (<div id="main" className={` ${styles.main}`}>
    <Interval intervals={INTERVALS} currentInterval={currentInterval} updateInterval={setCurrentInterval} />

    <div className="flashard-container">
      <div className="group">
        <FlashCard />
        <FlashCard />
      </div>
      <div className="group">
        <FlashCard />
        <FlashCard />
      </div>
    <SnapShot/>

    </div>
  </div>)

}
