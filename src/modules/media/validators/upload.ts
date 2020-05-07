import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

import validator from '@validators/validator'

export default (req: Request, res: Response, next: NextFunction) => {
  const data = { playlistId: Joi.string().required() }
  return validator(data, 'params', req, res, next)
}
