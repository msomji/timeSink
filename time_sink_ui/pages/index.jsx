import { useState } from 'react'
import { forceBubleChart, drawChart } from '../chartFunctions/sampleChart';
import FlashCard from '../components/FlashCard'
import Interval, { INTERVALS, TODAY } from '../components/Interval'
import Loading from '../components/Loading';
import SnapShot from '../components/SnapShot'
import { useAppContext } from '../context/state';

import styles from '../styles/index.module.scss'

export default function Index() {
  const [currentInterval, setCurrentInterval] = useState(TODAY)
  const globalContext = useAppContext()

  if (globalContext.isLoading) {
    return (<Loading/>)
  }

  return (<div id="main" className={`${styles.main}`}>

      <Interval intervals={INTERVALS} currentInterval={currentInterval} updateInterval={setCurrentInterval} />

      <div className={`${styles.container}`}>
        <div className="group">
          <FlashCard />
          <FlashCard />
        </div>
        <div className="group">
          <FlashCard />
          <FlashCard />
        </div>
      </div>
      <div className={`${styles.container}`}>
        <div className="group">
          <SnapShot currentInterval={currentInterval} drawChart={forceBubleChart} linkTo="/sitesVisited" value="Sites Visited" />
          <SnapShot currentInterval={currentInterval} drawChart={drawChart} linkTo="/" value="Avtivity Heat Map" />
        </div>
        <div className="group">
          <SnapShot currentInterval={currentInterval} drawChart={drawChart} linkTo="/" value="This is values" />
          <SnapShot currentInterval={currentInterval} drawChart={drawChart} linkTo="/" value="This is values" />
        </div>
    </div>
  </div>)

}
