import { inject, injectable } from 'inversify'
import { Socket } from 'socket.io'

import { Event } from '@enums/Event'

import Create from '@general/crud/Create'
import Find from '@general/crud/Find'
import { OnlyProperties } from '@general/ModelStructure'

import TYPES from '@src/ioc/types'

import Playlist from './models/Playlist'
import PlaylistRepository from './PlaylistRepository'

@injectable()
class PlaylistService implements Create<Playlist>, Find<Playlist> {
  private playlistRepository: PlaylistRepository
  private socket: Socket

  constructor(@inject(TYPES.PlaylistRepository) playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository
  }

  async create(data: OnlyProperties<Playlist>) {
    const playlist = await this.playlistRepository.create(data)
    this.socket.emit(Event.PLAYLIST_CREATE, playlist)

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

  setSocket(socket: Socket) {
    this.socket = socket
  }
}

export default PlaylistService
