import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub,  faTwitter} from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/footer.module.scss'


export default function Footer() {
  return (
    <footer id="footer" className={`${styles.footer} pt-3 has-text-info has-text-centered has-background-primary`}>
      <h3 className="has-text-info-light ">Note: None of your data will ever be stored on our servers</h3>
      <a className="m-2 " href="" target="_blank"><FontAwesomeIcon icon={faGithub}/></a>
      <a className="m-2" href="" target="_blank"><FontAwesomeIcon icon={faTwitter}/></a>
    </footer>
  )
}
