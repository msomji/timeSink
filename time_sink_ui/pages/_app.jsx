import '../styles/globals.scss'
import { AppWrapper } from '../context/state'
import SideBar from '../components/SideBar'
import Logo from '../components/Logo'
import Header from '../components/Header'


export default function MyApp({ Component, pageProps }) {
  console.log('pageProps', pageProps)
  return (
    <AppWrapper>
      <Logo />
      <Header />
      
      <SideBar />
      <Component {...pageProps} />
      <div id="block" className="has-background-link"></div>
      <footer>this is the footer</footer>
    </AppWrapper>
  )
}
