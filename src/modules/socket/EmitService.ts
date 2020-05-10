import { injectable } from 'inversify'
import { Socket as IOSocket } from 'socket.io'

import Media from '@modules/media/models/Media'
import Playlist from '@modules/playlist/models/Playlist'

import { Event } from '@enums/Event'

@injectable()
class EmitService {
  private socket: IOSocket

  setSocket(socket: IOSocket) {
    this.socket = socket
  }

  newPlaylist(playlist: Playlist) {
    this.socket.emit(Event.PLAYLIST_CREATE, playlist)
  }

  newMedia(playlistId: number, media: Media) {
    this.socket.emit(Event.MEDIA_CREATE, media)
  }

  listPlaylist(playlists: Playlist[]) {
    this.socket.emit(Event.PLAYLIST_LIST, playlists)
  }
}

export default EmitService
