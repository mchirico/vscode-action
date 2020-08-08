const duration = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([a-zµμ]*)/gi
enum parse {
  ms = 1,
  s = 1000,
  sec = 1000,
  second = 1000,
  seconds = 1000,
  m = 1000 * 60,
  min = 1000 * 60,
  minutes = 1000 * 60,
  h = 1000 * 60 * 60,
  hr = 1000 * 60 * 60,
  hour = 1000 * 60 * 60,
  hours = 1000 * 60 * 60,
}
export const parsetime = (str: string, format: string = 'ms') => {
  str = str.replace(/(\d),(\d)/g, '$1$2')

  const result = str.replace(duration, (_, n, units) => {
    units = parse[units] || parse[units.toLowerCase().replace(/s$/, '')]
    return `${parseFloat(n) * units}`
  })

  return parseInt(result)
}
