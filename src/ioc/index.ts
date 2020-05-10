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

import Socket from '@src/Socket'

import TYPES from './types'

const container = new Container()

setupDatabase()

setupPlaylistRepository()
setupPlaylistService()
setupPlaylistResolver()
setupPlaylistController()

setupMediaRepository()
setupMediaService()
setupMediaController()

setupSocket()

function setupDatabase() {
  const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env
  const database = new Database(DB_HOST, parseInt(DB_PORT, 0), DB_USER, DB_PASSWORD, DB_DATABASE)

  container.bind<Database>(TYPES.Database).toConstantValue(database)
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
  const service = new PlaylistService(repository)

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
  const playlistService = container.get<PlaylistService>(TYPES.PlaylistService)
  const mediaService = new MediaService(repository, playlistService)

  container.bind<MediaService>(TYPES.MediaService).toConstantValue(mediaService)
}

function setupMediaController() {
  container.bind<MediaController>(TYPES.MediaController).to(MediaController)
}

function setupSocket() {
  const playlistService = container.get<PlaylistService>(TYPES.PlaylistService)
  const mediaService = container.get<MediaService>(TYPES.MediaService)
  const socket = new Socket(mediaService, playlistService)

  container.bind<Socket>(TYPES.Socket).toConstantValue(socket)
}

export default container
