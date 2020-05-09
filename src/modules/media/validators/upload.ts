import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

import validator from '@validators/validator'

export const uploadParamsValidator = (req: Request, res: Response, next: NextFunction) => {
  const data = { playlistId: Joi.string().required() }
  return validator(data, 'params', req, res, next)
}

export const uploadMediaValidator = (req: Request, res: Response, next: NextFunction) => {
  const data = {
    media: Joi.object({
      mimetype: Joi.equal('audio/mpeg', 'video/mp4').required(),
    }).unknown(),
  }
  return validator(data, 'files', req, res, next)
}
