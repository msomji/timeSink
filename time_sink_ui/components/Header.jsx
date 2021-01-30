import styles from '../styles/header.module.scss'
import Link from 'next/link'
const CHROME_EXTENTION_LINK = "https://time-sink.vercel.app/"

export default function Header() {

  return (
    <div id="head" className={styles.head}>
      <Link href={CHROME_EXTENTION_LINK} >
        <a target="_blank">
          <div className={`has-text-weight-semibold is-size-5`}>Add Extention <p className="is-size-6 has-text-info-dark">- It's Free!</p></div>
        </a>
      </Link>
    </div>
  )
}
