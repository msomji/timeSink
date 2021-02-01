import { useEffect, } from 'react'

import { useAppContext } from '../context/state';
import { forceBubleChart } from '../chartFunctions/sampleChart';
import Chart from '../components/Chart';
import Loading from '../components/Loading';


export default function SitesVisited() {
  const globalContext = useAppContext()
  useEffect(() => {
  }, [])

  if (globalContext.isLoading) {
    return (<Loading/>)
  } else {
    return (
      <div className="has-background-primary">
        <Chart drawChart={forceBubleChart} />
      </div>
    )
  }
}
