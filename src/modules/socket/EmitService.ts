import { injectable } from 'inversify'
import { Socket as IOSocket } from 'socket.io'

import Media from '@modules/media/models/Media'
import Playlist from '@modules/playlist/models/Playlist'

import { Event } from '@enums/Event'

@injectable()
class EmitService {
  private sockets: IOSocket[]

  constructor() {
    this.sockets = []
  }

  addSocket(socket: IOSocket) {
    this.sockets.push(socket)
  }

  newPlaylist(playlist: Playlist) {
    this.emit(Event.PLAYLIST_CREATE, playlist)
  }

  newMedia(playlistId: number, media: Media) {
    this.emit(Event.MEDIA_CREATE, media)
  }

  listPlaylist(playlists: Playlist[]) {
    this.emit(Event.PLAYLIST_LIST, playlists)
  }

  disconnect(socket: IOSocket) {
    const index = this.sockets.findIndex(s => s.id === socket.id)
    if (index !== -1) this.sockets.splice(index, 1)
  }

  private emit<T>(event: Event, data: T) {
    this.sockets.forEach(socket => socket.emit(event, data))
  }
}

export default EmitService
