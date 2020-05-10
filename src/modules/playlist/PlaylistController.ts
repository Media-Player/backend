import { Controller, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { OK } from 'http-status-codes'
import moment from 'moment'
import { injectable, inject } from 'inversify'

import TYPES from '@src/ioc/types'

import PlaylistService from './PlaylistService'

@injectable()
@Controller('playlist')
class PlaylistController {
  private playlistService: PlaylistService

  constructor(@inject(TYPES.PlaylistService) playlistService: PlaylistService) {
    this.playlistService = playlistService
  }

  @Post('')
  async create(req: Request, resp: Response) {
    const now = moment().format('YYYY-MM-DD')
    const playlist = await this.playlistService.findOrCreateByDate(now)

    resp.status(OK).send(playlist)
  }
}

export default PlaylistController
