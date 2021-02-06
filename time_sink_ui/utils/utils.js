export const TODAY = 'Last 24 hours'
export const WEEK = 'Last 7 Days'
export const MONTH = 'Last 30 Days'
export const LAST_60_DAYS = 'Last 60 Days'
export const LAST_90_DAYS = 'Last 90 days'
export const INTERVALS = [TODAY, WEEK, MONTH, LAST_60_DAYS, LAST_90_DAYS]

//move to utils
const filterToHours = filter => {
  switch (filter) {
    case TODAY:
      return 24
      break;
    case WEEK:
      return (24 * 7)
      break;
    case MONTH:
      return (24 * 30)
      break;
    case LAST_60_DAYS:
      return (24 * 60)
      break;
    default:
      return (24 * 90)
      break;
  }
}

export const filterDateByinterval = (data, interval) => 
  data.filter(d =>
    (new Date().getTime() - new Date(d.visitTime).getTime()) / (1000 * 3600) < filterToHours(interval))