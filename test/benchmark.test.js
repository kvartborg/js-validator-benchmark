/* eslint-env jest */
import speclaValidator from '../src/specla-validator'
import superstruct from '../src/superstruct'
import joi from '../src/joi'
import simpleData from './data/simple-data'

const run = (testFn, data, times = 500000) => {
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
