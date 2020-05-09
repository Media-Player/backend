import { inject, injectable } from 'inversify'

import Find from '@general/crud/Find'

import TYPES from '@src/ioc/types'

import Playlist from './models/Playlist'
import PlaylistRepository from './PlaylistRepository'

@injectable()
class PlaylistService implements Find<Playlist> {
  private playlistRepository: PlaylistRepository

  constructor(@inject(TYPES.PlaylistRepository) playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository
  }

  find() {
    return this.playlistRepository.find()
  }
}

export default PlaylistService
