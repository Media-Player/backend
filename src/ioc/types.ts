const CONTROLLER_TYPES = {
  PlaylistController: Symbol.for('PlaylistController'),
}

const DATABASE_TYPES = {
  Database: Symbol.for('Database'),
}

const REPOSITORY_TYPES = {
  PlaylistRepository: Symbol.for('PlaylistRepository'),
}

const RESOLVERS_TYPE = {
  PlaylistResolver: Symbol.for('PlaylistResolver'),
}

const SERVICE_TYPES = {
  PlaylistService: Symbol.for('PlaylistService'),
}

export default {
  ...CONTROLLER_TYPES,
  ...DATABASE_TYPES,
  ...REPOSITORY_TYPES,
  ...RESOLVERS_TYPE,
  ...SERVICE_TYPES,
}
