import styles from '../../styles/sideBar.module.scss'
import { useRouter } from 'next/router'
import NavButton from '../navButton/NavButton'
import { faChartLine, faLink, faSearch, faTh } from '@fortawesome/free-solid-svg-icons'



export default function SideBar() {
  const router = useRouter()
  return (
    <aside className={`${styles.aside} has-background-link`}>
      <ul>
        <li><NavButton icon={faChartLine} active={router.asPath == '/'} content="Dashboard" linkTo="/" /></li>
        <li><NavButton icon={faLink} active={router.asPath == '/sitesVisited'} content="SitesVisited" linkTo="/home" /></li>
        <li><NavButton icon={faTh} active={router.asPath == '/heatmap'} content="Activity Heat Map" linkTo="/heatmap" /></li>
        <li><NavButton icon={faSearch} active={router.asPath == '/serachedTerms'} content="Frequently Searched Terms" linkTo="/serachedTerms" isLast={true} /></li>
      </ul>
    </aside>
  )
}
