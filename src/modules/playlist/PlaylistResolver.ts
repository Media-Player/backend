import { inject, injectable } from 'inversify'
import { Arg, Query, Resolver } from 'type-graphql'
import { Field, ObjectType } from 'type-graphql'

import TYPES from '@src/ioc/types'

import PlaylistService from './PlaylistService'
import Playlist from './models/Playlist'

@Resolver(Playlist)
@injectable()
class PlaylistResolver {
  private playlistService: PlaylistService

  constructor(@inject(TYPES.PlaylistService) cityService: PlaylistService) {
    this.playlistService = cityService
  }
}

export default PlaylistResolver
