import Image from 'next/image'

export default function Loading() {
  return (
    <div className={`has-background-primary has-text-centered pt-6 pl-4 pr-4`}>
      <h1 className="has-text-info is-size-2 has-text-weight-bold">Filling Time Sink</h1>
      <div><Image src='/logo-GifDark.gif' width="311px" height="400px" /></div>
      <h2 className="has-text-info has-text-info-light is-size-4 pt-6">I liked the loading gif so much I decided to create a page for it!</h2>
    </div>)
} 