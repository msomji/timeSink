import { useEffect } from 'react'

import { useAppContext } from '../context/state';
import { heatMapChart, wordCloudChart } from '../chartFunctions/sampleChart';
import Chart from '../components/Chart';
import Loading from '../components/Loading';


export default function serachedTerms() {
  const globalContext = useAppContext()
  useEffect(() => {
  }, [])

  if (globalContext.isLoading) {
    return (<Loading />)
  } else {
    return (
      <div className="has-background-primary">
        <Chart drawChart={wordCloudChart} />
      </div>
    )
  }
}
