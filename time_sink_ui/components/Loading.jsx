import Image from 'next/image'

export default function Loading() {
  return (
    <div className={`has-background-primary has-text-centered pt-6 pl-4 pr-4`}>
      <h1 className="has-text-info is-size-2 has-text-weight-bold">Filling Time Sink</h1>
      <h2 className="has-text-info has-text-info-light is-size-4 pt-6">Please wait while we process your browsing data</h2>
      <div className="pb-6"><Image src='/logo-GifDark.gif' width="311px" height="400px" /></div>
      <h3 className="has-text-grey is-size-4 pt-6 has-text-weight-bold">This application depends on the Chrome Extention</h3>
      <h4 className="has-text-grey is-size-4 has-text-weight-bold">Download it via the button on the top right</h4>

    </div>)
} 