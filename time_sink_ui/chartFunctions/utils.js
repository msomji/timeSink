import { getDomain } from "./sampleChart"

export const SOCIAL_MEDIA_SITES = ['twitter.com',
  'facebook.com',
  'instagram.com',
  'pinterest.com',
  'tumblr.com',
  'reddit.com',
  'news.ycombinator.com',
  'twitch.tv',
  'tiktok.com/foryou?lang=e',
  'telegram.org',
  'discord.com',
]

export const totalNumnberOfSitesVisited = data => data.length
export const totalSocialMediaVisits = data => data.filter(d => {
  for (let s of SOCIAL_MEDIA_SITES) {
    if (d.url.includes(s) === true) {
      return true
    }
  }
  return false
}).length

export const formatDate = date => new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
export const mostActiveDay = data => {
  let numberOfSitesVisitedByDay = data.reduce((acc, current) => {
    let formattedDateKey = formatDate(new Date(current.visitTime))
    if (formattedDateKey in acc) {
      acc[formattedDateKey] = acc[formattedDateKey] + 1
    } else {
      acc[formattedDateKey] = 1
    }
    return acc
  }, {})
  let dayWithMostactivity = Object.keys(numberOfSitesVisitedByDay).reduce((acc, key) => {
    if (numberOfSitesVisitedByDay[acc] === undefined) { return key }
    return numberOfSitesVisitedByDay[key] > numberOfSitesVisitedByDay[acc] ? key : acc
  }, undefined)
  return new Date(dayWithMostactivity).toLocaleDateString()
}

export const mostPopularDomain = data => {
  let domainByFrequency = data.
    reduce((acc, current) => {
      let currentDomain = getDomain(current.url)
      if (currentDomain in acc) {
        acc[currentDomain] = acc[currentDomain] + 1
      } else {
        acc[currentDomain] = 1
      }
      return acc
    }, {})

  return Object.keys(domainByFrequency).reduce((acc, key) => {
    if (domainByFrequency[acc] === undefined) { return key }
    return domainByFrequency[key] > domainByFrequency[acc] ? key : acc
  }, undefined)
}
