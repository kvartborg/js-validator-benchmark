const Joi = require('joi')

const schema = Joi.object().keys({
  string: Joi.string(),
  number: Joi.number(),
  boolean: Joi.boolean(),
  array: [Joi.string()],
  object: Joi.object().keys({
    key: Joi.string()
  }),
  func: Joi.func()
})

export default data => Joi.validate(data, schema)
