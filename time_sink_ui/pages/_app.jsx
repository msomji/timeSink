import '../styles/globals.scss'
import { AppWrapper } from '../context/state'
import SideBar from '../components/sideBar/SideBar'
import Logo from '../components/logo/Logo'


export default function MyApp({ Component, pageProps }) {
  console.log('pageProps', pageProps)
  return (
    <AppWrapper>
      <Logo/>
    <div id="head">this is the head</div>
      <SideBar />
      <Component {...pageProps} />
      <div id="block" className="has-background-link"></div>
      <footer>this is the footer</footer>
    </AppWrapper>
  )
}
