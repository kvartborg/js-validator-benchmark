import Validator, { transform } from '@specla/validator'

const schema = transform({
  string: String,
  number: Number,
  boolean: Boolean,
  array: [String],
  object: {
    key: String
  },
  func: Function
})

export default data => new Validator(data, schema, { transform: false })
