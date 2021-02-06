import '../styles/globals.scss'
import { AppWrapper } from '../context/state'
import SideBar from '../components/SideBar'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Logo />
      <Header />
      <SideBar />
      <Component {...pageProps} />
      <Footer/>
    </AppWrapper>
  )
}
