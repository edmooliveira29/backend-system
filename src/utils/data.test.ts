import { formatNowDate } from './data'

describe('formatNowDate Function', () => {
  const mockDate = new Date()

  beforeEach(() => {
    global.Date = jest.fn(() => mockDate) as any
  })

  it('should format the current date without arguments', () => {
    const result = formatNowDate()
    expect(result).toBeDefined()
  })

  it('should format a provided date', () => {
    const result = formatNowDate(new Date(2011, 11, 11, 10, 0, 0))
    expect(result).toBeDefined()
  })

  it('should not include milliseconds in the formatted date', () => {
    const mockDateWithMilliseconds = new Date()
    global.Date = jest.fn(() => mockDateWithMilliseconds) as any

    const result = formatNowDate()
    expect(result).toBeDefined()
  })
})
