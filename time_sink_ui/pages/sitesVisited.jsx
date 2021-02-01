import { Fragment, useEffect, } from 'react'

import { useAppContext } from '../context/state';
import { forceBubleChart } from '../chartFunctions/sampleChart';
import Chart from '../components/Chart';


export default function SitesVisited() {
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
        <Chart drawChart={forceBubleChart} />
      </div>
    )
  }
}
