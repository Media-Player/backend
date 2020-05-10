import { inject, injectable } from 'inversify'

import Create from '@general/crud/Create'
import Find from '@general/crud/Find'
import { OnlyProperties } from '@general/ModelStructure'

import EmitService from '@modules/socket/EmitService'

import TYPES from '@src/ioc/types'

import Playlist from './models/Playlist'
import PlaylistRepository from './PlaylistRepository'

@injectable()
class PlaylistService implements Create<Playlist>, Find<Playlist> {
  private playlistRepository: PlaylistRepository
  private emitService: EmitService

  constructor(
    @inject(TYPES.PlaylistRepository) playlistRepository: PlaylistRepository,
    @inject(TYPES.EmitService) emitService: EmitService
  ) {
    this.playlistRepository = playlistRepository
    this.emitService = emitService
  }

  async create(data: OnlyProperties<Playlist>) {
    const playlist = await this.playlistRepository.create(data)
    this.emitService.newPlaylist(playlist)

    return playlist
  }

  find() {
    return this.playlistRepository.find()
  }

  findByDate(date: string) {
    return this.playlistRepository.findByDate(date)
  }

  async findOrCreateByDate(date: string) {
    let playlist = await this.findByDate(date)
    if (!playlist) playlist = await this.create({ date })

    return playlist
  }
}

export default PlaylistService
