const APP_URL = "https://time-sink.vercel.app/"

chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({ url: APP_URL }));

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  if (request.type == "getData") {
    let visitHistory = []
    chrome.history.search({
      'text': '',
      'maxResults': 0,
      'startTime': 0
    }, history => {
      history.forEach(historyItem => {
        chrome.history.getVisits({ url: historyItem.url }, visits => {
          visits.forEach(visit => {
            visitHistory.push({
              historyId: parseInt(historyItem.id),
              url: historyItem.url,
              title: historyItem.title,
              typedCount: historyItem.typedCount,
              lastVisitTime: historyItem.lastVisitTime,
              visitCount: historyItem.visitCount,
              // id: visit.id,
              visitId: parseInt(visit.visitId),
              referringVisitId: parseInt(visit.referringVisitId),
              visitTime: visit.visitTime,
              transitionType: visit.transition
            })
          })
        })
      })
    })

    let previousLength = undefined
    let awaitDataCollection = async () => {
      while (visitHistory.length !== previousLength) {
        previousLength = visitHistory.length
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      console.log('data collection done.');
            
      //unique by historyId to filter out duplicates
      let uniqueHistory = [...visitHistory.reduce((acc, visit) => {
        acc.set(visit.visitTime, visit)
        return acc;
      }, new Map()).values()]

      sendResponse({ visitHistory: uniqueHistory })
    }
    awaitDataCollection()
  }
  return true
});