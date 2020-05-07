import { injectable } from 'inversify'
import { Connection, createConnection } from 'typeorm'

import Media from './entities/Media'
import Playlist from './entities/Playlist'

@injectable()
class Database {
  private _connection: Connection

  private db: string
  private host: string
  private password: string
  private port: number
  private username: string

  get connection() {
    return this._connection
  }

  get media() {
    return this.connection.getRepository(Media)
  }

  get playlist() {
    return this.connection.getRepository(Playlist)
  }

  constructor(host: string, port: number, username: string, password: string, db: string) {
    this.host = host
    this.port = port
    this.username = username
    this.password = password
    this.db = db
  }

  async init() {
    const { NODE_ENV } = process.env

    if (this._connection) return

    this._connection = await createConnection({
      database: this.db,
      entities: [Media, Playlist],
      host: this.host,
      logging: NODE_ENV === 'development',
      password: this.password,
      port: this.port,
      synchronize: false,
      type: 'mysql',
      username: this.username,
    })
  }
}

export default Database
