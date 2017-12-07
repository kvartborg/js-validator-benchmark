/* eslint-env jest */
import validators from '../src/validators'
import simpleData from './data/simple-data'

const testRuns = 1000000

test('Benchmark avarage operation time in ns', () => {
  const result = {}

  const run = (validator, data) => {
    const NS_PER_SEC = 1e9
    let start, time
    start = process.hrtime()
    validator(data)
    time = process.hrtime(start)
    return time[0] * NS_PER_SEC + time[1]
  }

  for (const key in validators) {
    const data = []

    for (let i = 0; i < testRuns; i++) {
      data.push(run(validators[key], simpleData))
    }

    result[key] = Math.round(data.reduce((a, b) => a + b, 0) / data.length)
  }

  console.log(
    'Avarage operation time:',
    Object.keys(result).reduce(
      (acc, key) => acc + `\n  ${key}: ${result[key]} ns`,
      ''
    )
  )
})
