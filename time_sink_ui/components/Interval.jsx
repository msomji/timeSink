import styles from '../styles/interval.module.scss'

function CurrentInterval({ text, onClick, isActive }) {
  return (
    <div onClick={onClick} className={`has-text-weight-bold ${isActive ? `${styles.active} has-background-primary` : `has-text-grey-light`}`}>{text}</div>
  )
}

export default function Interval({ intervals, currentInterval, updateInterval }) {
  return (
    <div className={styles.interval}>
      <ul>
        {intervals.map((interval, index) =>
          <li key={index}>
            <CurrentInterval text={interval} onClick={() => updateInterval(interval)} isActive={currentInterval === interval} />
          </li>)
        }
      </ul>
    </div>
  )
}
