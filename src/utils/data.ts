export const formatNowDate = (): string => {
  const nowDate = new Date()
  const nowDateFormated = new Date(nowDate.valueOf() - nowDate.getTimezoneOffset() * 60000)
  return nowDateFormated.toISOString().replace(/\.\d{3}Z$/, '')
}
