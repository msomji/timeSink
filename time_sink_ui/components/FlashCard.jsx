import styles from '../styles/flashCards.module.scss'

export default function FlashCard({value, description}) {

  return (
    <div className={`${styles.card} has-background-link`}>
      <h2 className={`has-text-weight-bold is-size-4 has-text-info`}>{value}google.com</h2>
      <h3 className={` has-text-grey-light`}>{description}this</h3>
    </div>
  )
}
