import { injectable, inject } from 'inversify'

import Database from '@database/Database'

import Create from '@general/crud/Create'
import Find from '@general/crud/Find'
import FindOne from '@general/crud/FindOne'
import { OnlyProperties } from '@general/ModelStructure'

import TYPES from '@src/ioc/types'

import Playlist from './models/Playlist'

@injectable()
class PlaylistRepository implements Create<Playlist>, Find<Playlist>, FindOne<Playlist> {
  private database: Database

  constructor(@inject(TYPES.Database) database: Database) {
    this.database = database
  }

  async create(data: OnlyProperties<Playlist> = {}) {
    const playlist = await this.database.playlist.save(data)
    return new Playlist(playlist)
  }

  async find() {
    const playlist = await this.database.playlist.find()
    return playlist.map(playlist => new Playlist(playlist))
  }

  async findOne(id: number) {
    const playlist = await this.database.playlist.findOne(id)
    return new Playlist(playlist)
  }

  async findByDate(date: string) {
    const playlist = await this.database.playlist.findOne({ where: { date } })
    return new Playlist(playlist)
  }
}

export default PlaylistRepository
