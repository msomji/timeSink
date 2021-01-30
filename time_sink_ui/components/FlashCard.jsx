import styles from '../styles/flashCard.module.scss'
import Link from 'next/link'


export default function FlashCard({value, description}) {

  return (
    <div className={styles.card}>
      <h2 className={`has-text-weight-bold is-size-3 has-text-info`}>{value}google.com</h2>
      <h3 className={`has-text-weight-semibold is-size-6 has-text-grey-light`}>{description}this is the fweawdfsafafsasdsafadsadsasd</h3>
    </div>
  )
}
