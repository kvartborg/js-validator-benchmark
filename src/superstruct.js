import { struct } from 'superstruct'

const schema = struct({
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  array: ['string'],
  object: {
    key: 'string'
  },
  func: 'function'
})

export default data => schema(data)
