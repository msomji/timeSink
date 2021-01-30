import styles from '../../styles/navButton.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function NavButton({ icon, active, content, linkTo, isLast }) {
  return (
    <Link href={linkTo}>
      <div className={`${styles.content} has-text-info has-text-weight-bold ${active && styles.activeContent} ${isLast && styles.lastButton}`}>
        <FontAwesomeIcon icon={icon} size="2x" />
        <span className={`is-hidden-mobile pl-2`}>{content}</span>
      </div>
    </Link>
  )
}
