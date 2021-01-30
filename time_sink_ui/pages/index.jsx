import { Fragment, useEffect, useRef } from 'react'
import * as d3 from 'd3';

import { useAppContext } from '../context/state';
import Link from 'next/link'
import Home from './home';

export default function Index() {

  return (<Fragment>
    <div id="main" className={` `}>
      <Link href='/home'>
        <a>GoToHome</a>
      </Link>
    </div>
  </Fragment>)

}
