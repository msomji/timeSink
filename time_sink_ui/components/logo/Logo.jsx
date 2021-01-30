import styles from '../../styles/logo.module.scss'


import Image from 'next/image'


export default function Logo() {
  return (<div className={`${styles.logo} logo has-background-primary`}>
    <div><Image src='/timeSink.png' width="60px" height="60px" /></div>
    <h1 className="has-text-info is-size-4 has-text-weight-bold">
      <span>Time</span>
      <span>Sink</span>
    </h1>
  </div>)
}