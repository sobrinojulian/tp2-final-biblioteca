import Joi from 'joi'

const validar = libro => {
  const libroSchema = Joi.object({
    codigo: Joi.string().required(),
    titulo: Joi.string().required(),
    autor: Joi.string().required()
  })
  const { error } = libroSchema.validate(libro)
  return error
}

export default validar
