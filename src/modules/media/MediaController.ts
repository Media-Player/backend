import { ClassOptions, Controller, Middleware, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { ParamsDictionary } from 'express-serve-static-core'
import { OK } from 'http-status-codes'
import { injectable, inject } from 'inversify'

import TYPES from '@src/ioc/types'

import MediaService from './MediaService'
import { uploadMediaValidator, uploadParamsValidator } from './validators/upload'

interface DefaultParams extends ParamsDictionary {
  playlistId: string
}

@injectable()
@Controller('playlist/:playlistId')
@ClassOptions({ mergeParams: true })
class MediaController {
  private mediaService: MediaService

  constructor(@inject(TYPES.MediaService) playlistService: MediaService) {
    this.mediaService = playlistService
  }

  @Post('media')
  @Middleware([uploadParamsValidator, uploadMediaValidator])
  async upload(req: Request<DefaultParams>, resp: Response) {
    const media = await this.mediaService.saveFile(parseInt(req.params.playlistId, 0), req.files.media as UploadedFile)
    resp.status(OK).send(media)
  }
}

export default MediaController
