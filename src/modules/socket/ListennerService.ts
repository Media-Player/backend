import { inject, injectable } from 'inversify'
import { Socket as IOSocket } from 'socket.io'

import MediaService from '@modules/media/MediaService'
import PlaylistService from '@modules/playlist/PlaylistService'

import { Event } from '@enums/Event'

import TYPES from '@src/ioc/types'

import EmitService from './EmitService'

@injectable()
class ListenerService {
  private emitService: EmitService
  private mediaService: MediaService
  private playlistService: PlaylistService

  constructor(
    @inject(TYPES.MediaRepository) mediaService: MediaService,
    @inject(TYPES.PlaylistService) plalistService: PlaylistService,
    @inject(TYPES.EmitService) emitService: EmitService
  ) {
    this.emitService = emitService
    this.mediaService = mediaService
    this.playlistService = plalistService
  }

  add(socket: IOSocket) {
    this.setPlaylistListenner(socket)
    this.setMediaListListenner(socket)
    this.setDisconnectListenner(socket)
  }

  private setPlaylistListenner(socket: IOSocket) {
    socket.on(Event.PLAYLIST_LIST, async () => {
      const list = await this.playlistService.find()
      socket.emit(Event.PLAYLIST_LIST, list)
    })
  }

  private setMediaListListenner(socket: IOSocket) {
    socket.on(Event.MEDIA_LIST, async () => {
      const list = await this.mediaService.find()
      socket.emit(Event.MEDIA_LIST, list)
    })
  }

  private setDisconnectListenner(socket: IOSocket) {
    socket.on(Event.DISCONNECT, () => this.emitService.disconnect(socket))
  }
}

export default ListenerService
