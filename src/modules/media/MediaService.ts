import crypto from 'crypto'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import { inject, injectable } from 'inversify'
import * as musicMetadata from 'music-metadata'
import path from 'path'

import { MediaType } from '@enums/MediaType'

import TYPES from '@src/ioc/types'

import MediaRepository from './MediaRepository'

@injectable()
class MediaService {
  static FILES_PATH = path.join(__dirname, '..', '..', '..', '..', 'files')

  private mediaRepository: MediaRepository

  constructor(@inject(TYPES.MediaRepository) mediaRepository: MediaRepository) {
    this.mediaRepository = mediaRepository
  }

  async saveFile(playlistId: number, file: UploadedFile) {
    const hash = crypto
      .createHash('sha1')
      .update(`${file.name}-${new Date().getTime()}`)
      .digest('hex')
    const extension = path.extname(file.name)
    const fileName = `${hash}${extension}`
    const filePath = path.join(MediaService.FILES_PATH, fileName)
    const type = file.mimetype.includes('mp4') ? MediaType.VIDEO : MediaType.MUSIC
    const metadata = await musicMetadata.parseBuffer(file.data)

    fs.writeFileSync(filePath, file)

    return this.mediaRepository.create({ name: file.name, path: fileName, playlistId, type })
  }
}

export default MediaService
