const CONTROLLER_TYPES = {
  MediaController: Symbol.for('MediaController'),
  PlaylistController: Symbol.for('PlaylistController'),
}

const DATABASE_TYPES = {
  Database: Symbol.for('Database'),
}

const REPOSITORY_TYPES = {
  MediaRepository: Symbol.for('MediaRepository'),
  PlaylistRepository: Symbol.for('PlaylistRepository'),
}

const RESOLVERS_TYPE = {
  PlaylistResolver: Symbol.for('PlaylistResolver'),
}

const SERVICE_TYPES = {
  EmitService: Symbol.for('EmitService'),
  ListenerService: Symbol.for('ListenerService'),
  MediaService: Symbol.for('MediaService'),
  PlaylistService: Symbol.for('PlaylistService'),
}

export default {
  ...CONTROLLER_TYPES,
  ...DATABASE_TYPES,
  ...REPOSITORY_TYPES,
  ...RESOLVERS_TYPE,
  ...SERVICE_TYPES,
}
