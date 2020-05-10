import { inject, injectable } from 'inversify'
import { Socket as IOSocket } from 'socket.io'

import MediaService from '@modules/media/MediaService'
import PlaylistService from '@modules/playlist/PlaylistService'

import { Event } from '@enums/Event'

import TYPES from '@src/ioc/types'

@injectable()
class ListennerService {
  private mediaService: MediaService
  private playlistService: PlaylistService
  private socket: IOSocket

  constructor(
    @inject(TYPES.MediaRepository) mediaService: MediaService,
    @inject(TYPES.PlaylistService) plalistService: PlaylistService
  ) {
    this.mediaService = mediaService
    this.playlistService = plalistService
  }

  startListenners() {
    this.setMediaListListenner()
    this.setPlaylistListenner()
  }

  setSocket(socket: IOSocket) {
    this.socket = socket
  }

  private setPlaylistListenner() {
    this.socket.on(Event.PLAYLIST_LIST, async () => {
      const list = await this.playlistService.find()
      this.socket.emit(Event.PLAYLIST_LIST, list)
    })
  }

  private setMediaListListenner() {
    this.socket.on(Event.MEDIA_LIST, async () => {
      const list = await this.mediaService.find()
      this.socket.emit(Event.MEDIA_LIST, list)
    })
  }
}

export default ListennerService
