import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub,  faTwitter} from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/footer.module.scss'


export default function Footer() {
  return (
    <footer id="footer" className={`${styles.footer} pt-3 has-text-info has-text-centered has-background-primary`}>
      <a className="m-2 " href="https://github.com/msomji" target="_blank"><FontAwesomeIcon icon={faGithub}/></a>
      <a className="m-2" href="https://twitter.com/Somji_" target="_blank"><FontAwesomeIcon icon={faTwitter}/></a>
      <h3 className="has-text-danger-dark ">Privacy Notice: None of your data will ever be sent over the network for any reason</h3>
    </footer>
  )
}
