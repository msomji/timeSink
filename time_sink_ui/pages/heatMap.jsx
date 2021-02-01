import { Fragment, useEffect } from 'react'

import { useAppContext } from '../context/state';
import { heatMapChart } from '../chartFunctions/sampleChart';
import Chart from '../components/Chart';


export default function HeatMap() {
  const globalContext = useAppContext()
  useEffect(() => {
  }, [])

  if (globalContext.isLoading) {
    return (<Fragment>
      <div>globalContext is loading...</div>
    </Fragment>)
  } else {
    return (
      <div className="has-background-primary">
        <Chart drawChart={heatMapChart} />
      </div>
    )
  }
}
