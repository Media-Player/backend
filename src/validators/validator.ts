import Joi, { SchemaMap } from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST } from 'http-status-codes'

type dataType = 'body' | 'params' | 'query' | 'files'

export default (schemaMap: SchemaMap, type: dataType, req: Request, res: Response, next: NextFunction) => {
  const data = req[type]
  const schema = Joi.object(schemaMap)
  const { error } = schema.validate(data)

  if (error) return res.status(BAD_REQUEST).send({ message: error.message, scope: type })
  return next()
}
