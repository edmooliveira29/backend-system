export const formatNowDate = (date?: any): string => {
  const nowDate = date ? new Date(date) : new Date()
  const nowDateFormated = new Date(nowDate.valueOf() - nowDate.getTimezoneOffset() * 60000)
  console.log(nowDateFormated.toISOString().replace(/\.\d{3}Z$/, ''))
  return nowDateFormated.toISOString().replace(/\.\d{3}Z$/, '')
}
