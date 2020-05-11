import { Container } from 'inversify'
import 'reflect-metadata'

import Database from '@database/Database'

import PlaylistController from '@modules/playlist/PlaylistController'
import PlaylistRepository from '@modules/playlist/PlaylistRepository'
import PlaylistResolver from '@modules/playlist/PlaylistResolver'
import PlaylistService from '@modules/playlist/PlaylistService'

import MediaController from '@modules/media/MediaController'
import MediaRepository from '@modules/media/MediaRepository'
import MediaService from '@modules/media/MediaService'

import EmitService from '@modules/socket/EmitService'
import ListenerService from '@modules/socket/ListennerService'

import TYPES from './types'

const container = new Container()

setupDatabase()
setupEmitService()

setupPlaylistRepository()
setupPlaylistService()
setupPlaylistResolver()
setupPlaylistController()

setupMediaRepository()
setupMediaService()
setupMediaController()

setupListenerService()

function setupDatabase() {
  const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env
  const database = new Database(DB_HOST, parseInt(DB_PORT, 0), DB_USER, DB_PASSWORD, DB_DATABASE)

  container.bind<Database>(TYPES.Database).toConstantValue(database)
}

function setupEmitService() {
  const emitService = new EmitService()
  container.bind<EmitService>(TYPES.EmitService).toConstantValue(emitService)
}

function setupPlaylistRepository() {
  const database = container.get<Database>(TYPES.Database)
  const repository = new PlaylistRepository(database)

  container.bind<PlaylistRepository>(TYPES.PlaylistRepository).toConstantValue(repository)
}

function setupPlaylistResolver() {
  container.bind<PlaylistResolver>(PlaylistResolver).toSelf()
}

function setupPlaylistService() {
  const repository = container.get<PlaylistRepository>(TYPES.PlaylistRepository)
  const emitService = container.get<EmitService>(TYPES.EmitService)
  const service = new PlaylistService(repository, emitService)

  container.bind<PlaylistService>(TYPES.PlaylistService).toConstantValue(service)
}

function setupPlaylistController() {
  container.bind<PlaylistController>(TYPES.PlaylistController).to(PlaylistController)
}

function setupMediaRepository() {
  const database = container.get<Database>(TYPES.Database)
  const repository = new MediaRepository(database)

  container.bind<MediaRepository>(TYPES.MediaRepository).toConstantValue(repository)
}

function setupMediaService() {
  const repository = container.get<MediaRepository>(TYPES.MediaRepository)
  const emitService = container.get<EmitService>(TYPES.EmitService)
  const mediaService = new MediaService(repository, emitService)

  container.bind<MediaService>(TYPES.MediaService).toConstantValue(mediaService)
}

function setupMediaController() {
  container.bind<MediaController>(TYPES.MediaController).to(MediaController)
}

function setupListenerService() {
  const playlistService = container.get<PlaylistService>(TYPES.PlaylistService)
  const mediaService = container.get<MediaService>(TYPES.MediaService)
  const emitService = container.get<EmitService>(TYPES.EmitService)
  const listenerService = new ListenerService(mediaService, playlistService, emitService)

  container.bind<ListenerService>(TYPES.ListenerService).toConstantValue(listenerService)
}

export default container
