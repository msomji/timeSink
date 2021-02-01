import { useEffect } from 'react'

import { useAppContext } from '../context/state';
import { heatMapChart } from '../chartFunctions/sampleChart';
import Chart from '../components/Chart';
import Loading from '../components/Loading';


export default function HeatMap() {
  const globalContext = useAppContext()
  useEffect(() => {
  }, [])

  if (globalContext.isLoading) {
    return (<Loading />)
  } else {
    return (
      <div className="has-background-primary">
        <Chart drawChart={heatMapChart} />
      </div>
    )
  }
}
