import { Controller, Get, Middleware } from '@overnightjs/core'
// import { Request, Response } from 'express'
// import { OK } from 'http-status-codes'
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
}

export default PlaylistController
