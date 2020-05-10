import crypto from 'crypto'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import { inject, injectable } from 'inversify'
import path from 'path'

import { MediaType } from '@enums/MediaType'

import Find from '@general/crud/Find'

import EmitService from '@modules/socket/EmitService'

import TYPES from '@src/ioc/types'

import MediaRepository from './MediaRepository'
import Media from './models/Media'

@injectable()
class MediaService implements Find<Media> {
  static FILES_PATH = path.join(__dirname, '..', '..', '..', '..', 'files')

  private mediaRepository: MediaRepository
  private emitService: EmitService

  constructor(
    @inject(TYPES.MediaRepository) mediaRepository: MediaRepository,
    @inject(TYPES.EmitService) emitService: EmitService
  ) {
    this.mediaRepository = mediaRepository
    this.emitService = emitService
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

    try {
      fs.writeFileSync(filePath, file)

      const media = await this.mediaRepository.create({ name: file.name, path: fileName, playlistId, type })

      this.emitService.newMedia(playlistId, media)

      return media
    } catch (e) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
      throw e
    }
  }

  find() {
    return this.mediaRepository.find()
  }
}

export default MediaService
