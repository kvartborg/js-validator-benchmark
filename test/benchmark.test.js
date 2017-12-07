/* eslint-env jest */
import validators from '../src/validators'
import speclaValidator from '../src/validators/specla-validator'
import superstruct from '../src/validators/superstruct'
import joi from '../src/validators/joi'
import simpleData from './data/simple-data'

const testRuns = 500000

const run = (testFn, data, times = testRuns) => {
  for (let i = 0; i < times; i++) testFn(data)
}

test('Benchmark test superstruct', () => {
  run(superstruct, simpleData)
})

test('Benchmark test @specla/validator', () => {
  run(speclaValidator, simpleData)
})

test('Benchmark test joi', () => {
  run(joi, simpleData)
})

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
