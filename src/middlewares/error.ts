import { Request, Response, NextFunction } from 'express'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(INTERNAL_SERVER_ERROR).send({ message: error.message })
  next(error)
}
