import { useEffect, useState, createContext, useContext } from 'react'

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [chromeHistoryData, setChromeHistoryData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let awaitDataCollection = async () => {
      while ((typeof visitHistory) === "undefined") {
        console.log('waiting for data...')
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setChromeHistoryData(visitHistory)
      setIsLoading(false)
    }
    awaitDataCollection()
  }, [chromeHistoryData])

  return (
    <AppContext.Provider value={{ isLoading, chromeHistoryData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () =>  useContext(AppContext);
