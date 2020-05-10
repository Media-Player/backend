import { injectable, inject } from 'inversify'

import Database from '@database/Database'

import Create from '@general/crud/Create'
import Find from '@general/crud/Find'
import { OnlyProperties } from '@general/ModelStructure'

import TYPES from '@src/ioc/types'

import Media from './models/Media'

@injectable()
class MediaRepository implements Create<Media>, Find<Media> {
  private database: Database

  constructor(@inject(TYPES.Database) database: Database) {
    this.database = database
  }

  async create(data: OnlyProperties<Media> = {}) {
    const media = await this.database.media.save(data)
    return new Media(media)
  }

  async find() {
    const medias = await this.database.media.find()
    return medias.map(playlist => new Media(playlist))
  }
}

export default MediaRepository
